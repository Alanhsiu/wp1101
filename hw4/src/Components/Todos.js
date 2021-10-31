import Todo from "./Todo";

const Todos = ({ todos, onDelete, onToggle, filterType }) => {
  const Filter = (filterType) => {
    switch (filterType) {
      case 1:
        return todos.filter((todo) => todo.reminder !== true);
      case 2:
        return todos.filter((todo) => todo.reminder === true);
      default:
        return todos
    }
  };
  return (
    <>
      {Filter(filterType).map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </>
  );
};

export default Todos;
