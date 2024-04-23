import { useState } from 'react';
import styles from '../app.module.css';
import _ from 'lodash';

export const TodoList = ({
  isLoading,
  todos,
  setTodos,
  handleDeleteTodo,
  handleUpdateTodo,
  refreshTodos,
}) => {
  const [updatingId, setUpdatingId] = useState('');
  const [sortSign, setSortSign] = useState('asc');
  const [sortBy, setSortBy] = useState({ path: 'text', order: 'asc' });
  const [isActiveSearchField, setIsActiveSearcField] = useState(false);
  const [inputSearchValue, setInputSearchValue] = useState('');

  const handleUpdateField = (id, text) => {
    if (id === updatingId) {
      handleUpdateTodo(id, text);
      setUpdatingId('');
    } else {
      setUpdatingId(id);
    }
  };

  const handleInputChange = (index, id, completed, text) => {
    const newTodos = [...todos];
    newTodos[index] = { id: id, text: text, completed: completed };
    setTodos([...newTodos]);
    console.log(text);
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

  const searchTodo = () => {
    if (inputSearchValue) {
      setTimeout(() => {
        const newTodos = _.filter(todos, (todo) =>
          todo.text.toLowerCase().includes(inputSearchValue.toLowerCase()),
        );
        setTodos([...newTodos]);
      }, 300);
    }
  };

  const searchInputChange = (value) => {
    setInputSearchValue(value);
  };

  const searchTodoEnter = () => {
    searchTodo();
  };

  const resetSearchInput = () => {
    setInputSearchValue('');
    refreshTodos();
  }

  return (
    <div>
      <button onClick={searchTodo}>🔍</button>
      <input
        value={inputSearchValue}
        placeholder="Введите дело"
        onChange={({ target }) => searchInputChange(target.value)}
        onKeyDown={searchTodoEnter}
      ></input>
      <button className={styles.btn} onClick={resetSearchInput}>
        ❌
      </button>
      <div>
        <button className={styles.sortBtn} onClick={sortTodos}>
          sort
        </button>
      </div>

      <ul className={styles.list}>
        {isLoading ? (
          <div className={styles.loader}></div>
        ) : (
          todos.map((todo, index) => (
            <li key={todo.id}>
              {todo.id === updatingId ? (
                <div>
                  <input
                    value={todo.text}
                    onChange={({ target }) =>
                      handleInputChange(index, todo.id, todo.completed, target.value)
                    }
                    onBlur={() => handleUpdateField(todo.id, todo.text)}
                  ></input>
                </div>
              ) : (
                <div>
                  <input
                    type="checkbox"
                    id={todo.id}
                    defaultChecked={todo.completed}
                  ></input>
                  <label htmlFor={todo.id}>{todo.text}</label>
                </div>
              )}

              <div>
                <button
                  className={styles.btn}
                  onClick={() => handleUpdateField(todo.id, todo.text)}
                >
                  📝
                </button>
                <button className={styles.btn} onClick={() => handleDeleteTodo(todo.id)}>
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
