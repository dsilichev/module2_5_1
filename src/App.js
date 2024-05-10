import { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Outlet, useParams, useMatch, useNavigate } from 'react-router-dom';
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

  const TaskPage = () => {
    const params = useParams();
    return (
      <div>
        {params.id}
      </div>
    )
  }

  const NotFound = () => {
    const navigate = useNavigate();
    useEffect(() => {
      navigate('/404', { replace: true });
    }, [navigate])

  }

  const Page404 = () => <div>
    <h1>404</h1>
    <div>Такая страница не сущетсвует</div>
  </div>

  return (
    <div className={styles.app}>

      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/task/:id' element={<TaskPage />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/404' element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
