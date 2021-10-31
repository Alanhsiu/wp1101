import Img from "./img/x.png";
const Todo = ({ todo, onDelete, onToggle }) => {
  return (
    <li className="todo-app__item">
      <div className="todo-app__checkbox">
        <input type="checkbox" id={todo.id} onClick={() => onToggle(todo.id)}  checked={todo.reminder}/>
        <label htmlFor={todo.id} />
      </div>
      <h1
        className="todo-app__item-detail"
        style={
          todo.reminder
            ? { textDecorationLine: "line-through", opacity: "0.5" }
            : {}
        }
      >
        {todo.text}
      </h1>
      <img
        className="todo-app__item-x"
        src={Img}
        onClick={() => onDelete(todo.id)}
        alt=""
      />
    </li>
  );
};

export default Todo;
