import { setIsDeleting } from "./set-isdeleting";

export const deleteTodo = (id) => (dispatch) => {
  dispatch(setIsDeleting(true));
  fetch(`http://localhost:3005/todos/${id}`, {
    method: 'DELETE',
  })
    .then((rawResponse) => rawResponse.json())
    .then((response) => {
      dispatch({
        type: 'DELETE_TODOS',
        payload: id,
      })
    })
    .finally(() => { dispatch(setIsDeleting(false)); });
}
