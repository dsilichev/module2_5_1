import styles from '../app.module.css';
import { useDispatch } from 'react-redux';
import { addTodo } from '../actions';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../selectors';

export const TodoAdd = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleAddTodo = (event) => {
    event.preventDefault();
    dispatch(addTodo(event.target[1].value));
    event.target[1].value = '';
  };

  return (
    <div className={styles.formMargin}>
      <form onSubmit={handleAddTodo}>
        <button className={styles.btn} disabled={isLoading}>+</button>
        <input placeholder='Добавить дело'/>
      </form>
    </div>
  );
};
