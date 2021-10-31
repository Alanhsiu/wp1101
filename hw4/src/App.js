import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Todos from "./Components/Todos";
import Footer from "./Components/Footer";
import AddTodo from "./Components/AddTodo";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filterType, setFilterType] = useState(0);// 0:all 1:active 2:completed
  const [left, setLeft] = useState(0);

  useEffect(() => {
    setLeft(todos.filter((todo) => todo.reminder === false).length);
  });

  // useEffect(() => {
  //   filtered_todos;
  // });

  //Add Todo
  const addTodo = (todo) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTodo = { id, ...todo };
    setTodos([...todos, newTodo]);
    // setLeft(todos.filter((todo) => todo.reminder === false).length);
  };
  //Delete Todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    // setLeft(todos.filter((todo) => todo.reminder === false).length);
  };
  //Toggle Reminder
  const toggleReminder = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, reminder: !todo.reminder } : todo
      )
    );
    // setLeft(todos.filter((todo) => todo.reminder === false).length);
  };
  //ShowAll
  const showAll = () => {
    setFilterType(0)
  };
  //ShowActive
  const showActive = () => {
    setFilterType(1)
  };
  //ShowCompleted
  const showCompleted = () => {
    setFilterType(2)
  };
  //ClearCompleted
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => todo.reminder !== true));
  };
  return (
    <>
      <Header />
      <section className="todo-app__main">
        <AddTodo onAdd={addTodo} />
        <ul className="todo-app__list" id="todo-list">
          <Todos
            filterType={filterType}
            todos={todos}
            onDelete={deleteTodo}
            onToggle={toggleReminder}
          />
        </ul>
      </section>
      {todos.length > 0 ? (
        <Footer
          left={left}
          showAll={showAll}
          showActive={showActive}
          showCompleted={showCompleted}
          clearCompleted={clearCompleted}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default App;
