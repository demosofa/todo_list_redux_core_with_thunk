import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { deleteTodo, postTodo, putTodo } from "./redux/actions/todo";

function App() {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState();
  const lstTodo = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const handleSelect = (id) => {
    setSelected(selected === id ? null : id);
    const target = lstTodo.find((item) => item.id === id);
    setInput(target.title);
  };

  /**@type {import("react").KeyboardEventHandler} */
  const handleEnter = (e) => {
    if (e.key.toLowerCase() == "enter") {
      if (input) {
        if (selected)
          dispatch(
            putTodo({
              id: selected,
              title: input,
            })
          );
        else {
          dispatch(
            postTodo({
              title: input,
            })
          );
        }
      } else setSelected(null);
    }
  };

  const handleComplete = (e, id) => {
    e.stopPropagation();
    const target = lstTodo.find((item) => item.id === id);
    dispatch(putTodo({ id, completed: !target.completed }));
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={handleEnter}
      />
      <ul>
        {lstTodo.map((todo) => (
          <li
            key={todo.id}
            className={selected === todo.id ? "selected" : ""}
            onClick={() => handleSelect(todo.id)}
          >
            {todo.title}
            <button onClick={(e) => handleComplete(e, todo.id)}>
              {todo.completed ? "Complete" : "Incomplete"}
            </button>
            <button onClick={(e) => handleDelete(e, todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
