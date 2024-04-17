import styles from '../app.module.css';

export const TodoList = ({ todos }) => {
  return (
    <div>
      <h1>Todo list</h1>
      <ul className={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" id={todo.id} defaultChecked={todo.completed}></input>
            <label htmlFor={todo.id}>{todo.title}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};
