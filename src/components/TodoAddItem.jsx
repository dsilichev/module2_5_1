import styles from '../app.module.css';

export const TodoAdd = ({ handleAddTodo }) => {
  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <button>+</button>
        <input placeholder='add new task'></input>
      </form>
    </div>
  );
};
