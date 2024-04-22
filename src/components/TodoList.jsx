import { useState } from 'react';
import styles from '../app.module.css';

export const TodoList = ({
  isLoading,
  todos,
  setTodos,
  handleDeleteTodo,
  handleUpdateTodo,
}) => {
  const [updatingId, setUpdatingId] = useState('');
  //handleUpdateTodo(todo.id, todo.text)

  const handleUpdate = (id, text) => {
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

  return (
    <div>
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
                    onBlur={() => {handleUpdate(todo.id, todo.text); console.log('blur')}}
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
                <button onClick={() => handleUpdate(todo.id, todo.text)}>📝</button>
                <button onClick={() => handleDeleteTodo(todo.id)}>X</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
