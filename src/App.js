import { useState } from 'react';
import { useEffect } from 'react';
import styles from './app.module.css';
import { TodoList } from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => setTodos([...json].slice(0, 10)))
      .finally();
  }, []);
  
  return (
    <div className={styles.app}>
      <TodoList todos={todos}/>
    </div>
  );
}

export default App;
