import styles from '../app.module.css';

export const TodoAdd = ({ handleAddTodo, isCreating }) => {
  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <button disabled={isCreating}>+</button>
        <input placeholder='add new task'></input>
      </form>
    </div>
  );
};
