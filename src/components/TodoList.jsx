import styles from '../app.module.css';

export const TodoList = ({ todos }) => {
  return (
    <div>
      
      <ul className={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" id={todo.id} defaultChecked={todo.completed}></input>
            <label htmlFor={todo.id}>{todo.text}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};
