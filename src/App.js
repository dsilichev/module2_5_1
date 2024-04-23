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

function App() {
  const [refreshTodosFlag, setRefreshTodosFlag] = useState(true);

  const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

  const { isLoading, todos, setTodos } = useRequestGet(refreshTodosFlag);
  const { isCreating, requestAdd } = useRequestAdd(refreshTodos);
  const { isUpdating, requestUpdate } = useRequestUpdate(refreshTodos);
  const { isDeleting, requestDelete } = useRequestDelete(refreshTodos);

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
    requestAdd(event.target[1].value);
    event.target[1].value = '';
  };

  const handleUpdateTodo = (id, text) => {
    requestUpdate(id, text);
  };

  const handleDeleteTodo = (id) => {
    requestDelete(id);
  };

  return (
    <div className={styles.app}>
      <div>
        <h1>Todo list</h1>
        <TodoAdd handleAddTodo={handleAddTodo} isCreating={isCreating} />

        <TodoList
          isLoading={isLoading}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
          todos={todos}
          setTodos={setTodos}
          handleDeleteTodo={handleDeleteTodo}
          handleUpdateTodo={handleUpdateTodo}
          refreshTodos={refreshTodos}
        />
      </div>
    </div>
  );
}

export default App;
