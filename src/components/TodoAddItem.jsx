import styles from '../app.module.css';

export const TodoAdd = ({ handleAddTodo, isCreating }) => {
  return (
    <div className={styles.formMargin}>
      <form onSubmit={handleAddTodo}>
        <button className={styles.btn} disabled={isCreating}>+</button>
        <input placeholder='Добавить дело'></input>
      </form>
    </div>
  );
};
