import { useState, useEffect } from 'react';
import styles from './app.module.css';
import { TodoList } from './components/TodoList';
import { TodoAdd } from './components/TodoAddItem';
import {
  useRequestAdd,
  useRequestUpdate,
  useRequestDelete,
  useRequestGet,
} from './hooks';
import { AppContext } from './context';
import { useDispatch } from 'react-redux';
import { addTodo, deleteTodo, updateTodo, getTodos } from './actions';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodos);
  },[]);
  const [refreshTodosFlag, setRefreshTodosFlag] = useState(true);

  const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

  const isLoading = false; //, todos, setTodos } = useRequestGet(refreshTodosFlag);
  const isCreating = false; //, requestAdd } = useRequestAdd(refreshTodos);
  const isUpdating = false; //, requestUpdate } = useRequestUpdate(refreshTodos);
  const isDeleting = false; //, requestDelete } = useRequestDelete(refreshTodos);

  const handleAddTodo = (event) => {
    event.preventDefault();
    //requestAdd(event.target[1].value);
    dispatch(addTodo(event.target[1].value));
    event.target[1].value = '';
  };

  const handleUpdateTodo = (id, data) => {
    dispatch(updateTodo(id, data));
    //requestUpdate(id, data);
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
    //requestDelete(id);
  };

  return (
    <div className={styles.app}>
      <div>
        <h1>Todo list</h1>
        <AppContext.Provider
          value={{
            //todos,
            //setTodos,
            isCreating,
            isDeleting,
            isLoading,
            isUpdating,
            handleAddTodo,
            handleDeleteTodo,
            handleUpdateTodo,
            refreshTodos,
          }}
        >
          <TodoAdd />

          <TodoList />
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
