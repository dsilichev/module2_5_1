import { useEffect } from 'react';
import styles from './app.module.css';
import { TodoList } from './components/TodoList';
import { TodoAdd } from './components/TodoAddItem';
import { useDispatch } from 'react-redux';
import { getTodos } from './actions';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getTodos);
  },[]);

  return (
    <div className={styles.app}>
      <div>
        <h1>Todo list</h1>
          <TodoAdd />
          <TodoList />
      </div>
    </div>
  );
}

export default App;
