import styles from '../app.module.css';

export const TodoAdd = ({ handleAddNewTodo }) => {
  return (
    <div>
      <form onSubmit={handleAddNewTodo}>
        <button>+</button>
        <input placeholder='add new task'></input>
      </form>
    </div>
  );
};
