import { useState } from "react";
const AddTodo = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [reminder, setReminder] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert("plz add a todo");
      return;
    }
    onAdd({ text,  reminder });
    setText("");
    setReminder(false);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        className="todo-app__input"
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};

export default AddTodo;
