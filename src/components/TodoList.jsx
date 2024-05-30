import { useContext, useState } from 'react';
import styles from '../app.module.css';
import _ from 'lodash';
import { AppContext } from '../context';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, selectIsLoading, selectIsUpdating, selectIsDeleting } from '../selectors';
import { getTodos, updateLocalTodo, setTodos } from '../actions';

export const TodoList = () => {
  const {
    handleDeleteTodo,
    handleUpdateTodo,
  } = useContext(AppContext);

  const dispatch = useDispatch();

  const todos = useSelector(selectTodos);
  const isLoading = useSelector(selectIsLoading);
  const isUpdating = useSelector(selectIsUpdating);
  const isDeleting = useSelector(selectIsDeleting);

  const [updatingId, setUpdatingId] = useState('');
  const [sortBy, setSortBy] = useState({ path: 'text', order: 'asc' });
  const [inputSearchValue, setInputSearchValue] = useState('');

  function debounce(func, delay) {
    let timeoutId;

    return function execFunc(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  const handleUpdateField = (id, text, completed) => {
    if (id === updatingId) {
      handleUpdateTodo(id, { text: text, completed: completed });
      setUpdatingId('');
    } else {
      setUpdatingId(id);
    }
  };

  const handleInputChange = (id, completed, text) => {
    dispatch(updateLocalTodo(id, { text: text, completed: completed }));
  };

  const handleCheckboxChange = (id, checked, text) => {
    handleUpdateTodo(id, { text: text, completed: checked });
  };

  const sortTodos = () => {
    setSortBy((prevState) => {
      if (prevState.order === 'desc') {
        return { ...prevState, order: 'asc' };
      } else {
        return { ...prevState, order: 'desc' };
      }
    });
    const sortedTodos = _.orderBy(todos, [sortBy.path], [sortBy.order]);
    dispatch(setTodos(sortedTodos));
  };

  const searchTodo = (value) => {
    if (value) {
      const newTodos = _.filter(todos, (todo) =>
        todo.text.toLowerCase().includes(value.toLowerCase()),
      );
      dispatch(setTodos(newTodos));
    } else {
      dispatch(getTodos);
    }
  };
  const debouncedSearchTodo = debounce(searchTodo, 300);

  const searchInputChange = (value) => {
    setInputSearchValue(value);
    debouncedSearchTodo(value);
  };

  const searchTodoEnter = (e) => {
    e.preventDefault();
    searchTodo(inputSearchValue);
  };

  const resetSearchInput = () => {
    setInputSearchValue('');
    dispatch(getTodos);
  };

  return (
    <div>
      <form className={styles.formMargin} onSubmit={(e) => searchTodoEnter(e)}>
        <button className={styles.btn} onClick={searchTodo}>
          🔍
        </button>
        <input
          value={inputSearchValue}
          placeholder="Введите дело"
          onChange={({ target }) => searchInputChange(target.value)}
        ></input>
        <button className={styles.btn} onClick={resetSearchInput}>
          ❌
        </button>
      </form>

      <div>
        <button className={styles.sortBtn} onClick={sortTodos}></button>
      </div>

      <ul className={styles.list}>
        {isLoading ? (
          <div className={styles.loader}></div>
        ) : (
          todos.map((todo) => (
            <li key={todo.id}>
              {todo.id === updatingId ? (
                <>
                  <div>
                    <input
                      value={todo.text}
                      onChange={({ target }) =>
                        handleInputChange(todo.id, todo.completed, target.value)
                      }
                      onKeyDown={(e) => { if (e.code === 'Enter') { handleUpdateField(todo.id, todo.text, todo.completed) } }}
                    ></input>
                  </div>
                  <div>
                    <button
                      className={styles.btn}
                      onClick={() => handleUpdateField(todo.id, todo.text, todo.completed)}

                    >
                      ✔️
                    </button>
                    <button
                      className={styles.btn}
                      onClick={() => { setUpdatingId('') }}

                    >
                      🔙
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <input
                      type="checkbox"
                      id={todo.id}
                      defaultChecked={todo.completed}
                      onChange={({ target }) =>
                        handleCheckboxChange(todo.id, target.checked, todo.text)
                      }
                    ></input>
                    <label htmlFor={todo.id}>{todo.text}</label>
                  </div>
                  <div>
                    <button
                      className={styles.btn}
                      onClick={() => handleUpdateField(todo.id, todo.text)}
                      disabled={isUpdating}
                    >
                      📝
                    </button>
                    <button
                      className={styles.btn}
                      onClick={() => handleDeleteTodo(todo.id)}
                      disabled={isDeleting}
                    >
                      ❌
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
