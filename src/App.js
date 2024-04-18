import { useState } from 'react';
import { useEffect } from 'react';
import styles from './app.module.css';
import { TodoList } from './components/TodoList';
import { TodoAdd } from './components/TodoAdd';

function App() {
  const [todos, setTodos] = useState([]);

  // JSON Placeholder
  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/todos')
  //     .then(response => response.json())
  //     .then(json => setTodos([...json].slice(0, 10)))
  //     .finally();
  // }, [todos]);

  useEffect(() => {
    fetch('http://localhost:3005/todos')
      .then((response) => response.json())
      .then((json) => setTodos([...json].slice(0, 10)))
      .finally();
  }, []);

  return (
    <div className={styles.app}>
      <div>
        <h1>Todo list</h1>
        <TodoAdd />
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default App;
