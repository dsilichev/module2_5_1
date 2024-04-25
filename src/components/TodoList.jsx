import { useState } from 'react';
import styles from '../app.module.css';
import _ from 'lodash';

export const TodoList = ({
  isLoading,
  isUpdating,
  isDeleting,
  todos,
  setTodos,
  handleDeleteTodo,
  handleUpdateTodo,
  refreshTodos,
}) => {
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

  const handleInputChange = (index, id, completed, text) => {
    const newTodos = {...todos};
    newTodos[index] = { id: id, text: text, completed: completed };
    setTodos([...newTodos]);
  };

  

  const handleCheckboxChange = (index, id, checked, text) => {
    const newTodos = [...todos];
    newTodos[index] = { id: id, text: text, completed: checked };
    setTodos([...newTodos]);
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
    setTodos([...sortedTodos]);
  };

  const searchTodo = (value) => {

    console.log('Value', value);
    if (value) {
      
      const newTodos = _.filter(todos, (todo) =>
        todo.text.toLowerCase().includes(value.toLowerCase()),
      );
      setTodos([...newTodos]);
    } else {
      refreshTodos();
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
    refreshTodos();
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
          Object.entries(todos).map(([id, {completed, text}], index) => (
            <li key={id}>
              {id === updatingId ? (
                <div>
                  <input
                    value={text}
                    onChange={({ target }) =>
                      handleInputChange(index, id, completed, target.value)
                    }
                    onBlur={() => handleUpdateField(id, text, completed)}
                  ></input>
                </div>
              ) : (
                <div>
                  <input
                    type="checkbox"
                    id={id}
                    defaultChecked={completed}
                    onChange={({ target }) =>
                      handleCheckboxChange(index, id, target.checked, text)
                    }
                  ></input>
                  <label htmlFor={id}>{text}</label>
                </div>
              )}

              <div>
                <button
                  className={styles.btn}
                  onClick={() => handleUpdateField(id, text)}
                  disabled={isUpdating}
                >
                  📝
                </button>
                <button
                  className={styles.btn}
                  onClick={() => handleDeleteTodo(id)}
                  disabled={isDeleting}
                >
                  ❌
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
