import { setIsLoading } from "./set-isloading";

export const addTodo = (text) => (dispatch) => {
  dispatch(setIsLoading(true));
  fetch('http://localhost:3005/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({
      text: text[0].toUpperCase() + text.slice(1),
      completed: false,
    }),
  })
    .then((rawResponse) => rawResponse.json())
    .then((response) => {
      dispatch({
        type: 'ADD_TODOS',
        payload: response,
      })
    })
    .finally(() => { dispatch(setIsLoading(false)); });
}
