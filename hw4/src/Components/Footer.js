import { useState } from "react";

const Footer = ({left,showAll, showActive, showCompleted, clearCompleted}) => {
  return (
    <footer className="todo-app__footer" id="todo-footer">
      <div className="todo-app__total" >{left} left</div>
      <ul className="todo-app__view-buttons">
        <button onClick={showAll}>All</button>
        <button onClick={showActive}>Active</button>
        <button onClick={showCompleted}>Completed</button>
      </ul>
      <div className="todo-app__clean">
        <button onClick={clearCompleted}>Clear completed</button>
      </div>
    </footer>
  );
};

export default Footer;
