export const initialTodoState = {todos:[]};

export const todosReducer = (state = initialTodoState, action) => {
  switch (action.type) {
    case 'GET_TODOS': {
      return {
        ...state,
        todos: action.payload,
      };
    }
    case 'ADD_TODOS': {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    }
    case 'UPDATE_TODOS': {
      console.log(action.payload);
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload.data } : todo,
        ),
      };
    }
    case 'DELETE_TODOS': {
      return {
        ...state,
        todos: state.todos.filter(({ id }) => id !== action.payload),
      };
    }
    case 'SET_TODOS': {
      return {
        ...state,
        todos: action.payload,
      }
    }
    default:
      return state;
  }
};
