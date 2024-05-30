import { useEffect } from 'react';
import styles from './app.module.css';
import { TodoList } from './components/TodoList';
import { TodoAdd } from './components/TodoAddItem';
import { AppContext } from './context';
import { useDispatch } from 'react-redux';
import { addTodo, deleteTodo, updateTodo, getTodos } from './actions';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getTodos);
  },[]);

  const handleAddTodo = (event) => {
    event.preventDefault();
    dispatch(addTodo(event.target[1].value));
    event.target[1].value = '';
  };

  const handleUpdateTodo = (id, data) => {
    dispatch(updateTodo(id, data));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className={styles.app}>
      <div>
        <h1>Todo list</h1>
        <AppContext.Provider
          value={{
            handleAddTodo,
            handleDeleteTodo,
            handleUpdateTodo,
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
