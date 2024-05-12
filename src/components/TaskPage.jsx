import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styles from '../app.module.css';

export const TaskPage = ({ handleUpdateTodo, handleDeleteTodo }) => {
  const params = useParams();
  const [todo, setTodo] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3005/todos/${params.id}`)
      .then((response) => {
        if (!response.ok) {
          navigate('/404');
        } else {
          return response.json()
        }
      })
      .then((json) => setTodo({ ...json }));
  }, [params.id, navigate])

  const handleGoBack = () => {
    navigate(-1);
  }

  const handleUpdate = (id, text) => {
    handleUpdateTodo(id, { text: text });
    setIsUpdating(false);
  }

  const handleDelete = (id) => {
    handleDeleteTodo(id);
    navigate('/');
  }

  const handleChangeTodo = (value) => {
    setTodo({ ...todo, text: value })
  }

  return (
    <div>
      <button onClick={handleGoBack}>Back</button>
      {isUpdating ?
        <div>
          <div>
            <button
              className={styles.btn}
              onClick={() => handleUpdate(todo.id, todo.text)}
            >
              ✔️
            </button>
            <button
              className={styles.btn}
              onClick={() => setIsUpdating(false)}
            >
              ❌
            </button>
          </div>
          <input
            value={todo.text}
            onChange={({ target }) => handleChangeTodo(target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleUpdate(todo.id, todo.text)
              }
            }}></input>
        </div> :
        <div>
          <div>
            <button
              className={styles.btn}
              onClick={() => setIsUpdating(true)}
              disabled={isUpdating}
            >
              📝
            </button>
            <button
              className={styles.btn}
              onClick={() => handleDelete(todo.id)}
            >
              ❌
            </button>
          </div>
          <label>{todo.text}</label>
        </div>}


    </div>
  )
}
