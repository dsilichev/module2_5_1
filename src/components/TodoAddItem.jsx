import { useContext } from 'react';
import styles from '../app.module.css';
import { AppContext } from '../context';

export const TodoAdd = () => {
  const { handleAddTodo, isCreating } = useContext(AppContext);
  return (
    <div className={styles.formMargin}>
      <form onSubmit={handleAddTodo}>
        <button className={styles.btn} disabled={isCreating}>+</button>
        <input placeholder='Добавить дело'></input>
      </form>
    </div>
  );
};
