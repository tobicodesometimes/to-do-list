import { useReducer } from "react";
import { reducer } from "./reducer";
import { initialState } from "./data";
import "./App.css";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const submitNew = e => {
    e.preventDefault();
    dispatch({ type: "ADD_TODO" });
  };

  return (
    <div className="app">
      <h1>Create Todo List</h1>

      <form className="add-row" onSubmit={submitNew}>
        <input
          placeholder="Add task"
          value={state.newText}
          onChange={e => dispatch({ type: "SET_NEW_TEXT", value: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="list">
        {state.todos.map(todo => (
          <li key={todo.id} className={`item ${todo.completed ? "done" : ""}`}>
            <label className="left">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch({ type: "TOGGLE_COMPLETE", id: todo.id })}
              />
              {!todo.isEditing ? (
                <span>{todo.text}</span>
              ) : (
                <input
                  className="edit-input"
                  value={todo.draft}
                  onChange={e =>
                    dispatch({ type: "SET_DRAFT", id: todo.id, value: e.target.value })
                  }
                  autoFocus
                />
              )}
            </label>

            <div className="actions">
              {!todo.isEditing ? (
                <>
                  <button onClick={() => dispatch({ type: "START_EDIT", id: todo.id })}>
                    Edit
                  </button>
                  <button
                    disabled={!todo.completed}
                    onClick={() => dispatch({ type: "DELETE_TODO", id: todo.id })}
                    title={todo.completed ? "Delete" : "Complete it first to delete"}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button onClick={() => dispatch({ type: "SAVE_EDIT", id: todo.id })}>
                  Save
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
