import { useState, useEffect } from 'react';
import styles from './app.module.css';
import { TodoList } from './components/TodoList';
import { TodoAdd } from './components/TodoAdd';
import {
  useRequestAdd,
  useRequestUpdate,
  useRequestDelete,
  useRequestGet,
} from './hooks';

function App() {
  const [refreshTodosFlag, setRefreshTodosFlag] = useState(true);

  const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

  const {isLoading, todos} = useRequestGet(refreshTodosFlag);
  const {isCreating, requestAdd} = useRequestAdd(refreshTodos);

  // JSON Placeholder
  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/todos')
  //     .then(response => response.json())
  //     .then(json => setTodos([...json].slice(0, 10)))
  //     .finally();
  // }, [todos]);

  // useEffect(() => {
  //   fetch('http://localhost:3005/todos')
  //     .then((response) => response.json())
  //     .then((json) => setTodos([...json].slice(0, 10)))
  //     .finally();
  // }, []);

  const handleAddTodo = (event) => {
    event.preventDefault();
    console.log(event);
    requestAdd(event.target[1].value);
    event.target[1].value = '';
  }

  return (
    <div className={styles.app}>
      <div>
        <h1>Todo list</h1>
        <TodoAdd handleAddTodo={handleAddTodo} />
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default App;
