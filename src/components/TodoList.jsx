import styles from '../app.module.css';

export const TodoList = ({ isLoading, todos, handleDeleteTodo, handleUpdateTodo }) => {
  return (
    <div>
      <ul className={styles.list}>
        {isLoading ? (
          <div className={styles.loader}></div>
        ) : (
          todos.map((todo) => (
            <li key={todo.id}>
              <div>
                <input
                  type="checkbox"
                  id={todo.id}
                  defaultChecked={todo.completed}
                ></input>
                <label htmlFor={todo.id}>{todo.text}</label>
              </div>
              <div>
                <button onClick={() => handleUpdateTodo(todo.id, todo.text)}>📝</button>
                <button onClick={() => handleDeleteTodo(todo.id)}>X</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
