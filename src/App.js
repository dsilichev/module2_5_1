import { useState, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate, Navigate } from 'react-router-dom';
import styles from './app.module.css';
import { TodoList } from './components/TodoList';
import { TodoAdd } from './components/TodoAddItem';
import { TaskPage } from './components/TaskPage';
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


  const handleAddTodo = (event) => {
    event.preventDefault();
    requestAdd(event.target[1].value);
    event.target[1].value = '';
  };

  const handleUpdateTodo = (id, data) => {
    requestUpdate(id, data);
  };

  const handleDeleteTodo = (id) => {
    requestDelete(id);
  };

  const MainPage = () => {
    return (
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
    )
  }

  const Page404 = () => <div>
    <h1>404</h1>
    <div>Такая страница не сущетсвует</div>
  </div>

  return (
    <div className={styles.app}>

      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/task/:id' element={<TaskPage
          handleDeleteTodo={handleDeleteTodo}
          handleUpdateTodo={handleUpdateTodo} />} />
        <Route path='*' element={<Navigate to='/404' />} />
        <Route path='/404' element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
