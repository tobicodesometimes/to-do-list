// Our reducer with all our actions for our Todo list.
export function reducer(state, action) {
  switch (action.type) {
    case "SET_NEW_TEXT":
      return { ...state, newText: action.value };

    case "ADD_TODO": {
      const text = state.newText;
      if (!text) return state;
      const todo = {
        id: state.nextId,
        text,
        completed: false,
        isEditing: false,
        draft: ""
      };
      return {
        ...state,
        newText: "",
        nextId: state.nextId + 1,
        todos: [todo, ...state.todos] // add to TOP
      };
    }

    case "TOGGLE_COMPLETE":
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.id ? { ...t, completed: !t.completed } : t
        )
      };

    case "START_EDIT":
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.id ? { ...t, isEditing: true, draft: t.text } : t
        )
      };

    case "SET_DRAFT":
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.id ? { ...t, draft: action.value } : t
        )
      };

    case "SAVE_EDIT":
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.id
            ? {
                ...t,
                text: t.draft ? t.draft : t.text,
                isEditing: false,
                draft: ""
              }
            : t
        )
      };

    case "DELETE_TODO":
      return { ...state, todos: state.todos.filter(t => t.id !== action.id) };

    default:
      return state;
  }
}
