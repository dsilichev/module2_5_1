import { setIsLoading } from "./set-isloading";

export const getTodos = (dispatch) => {
  dispatch(setIsLoading(true));
  fetch('http://localhost:3005/todos')
    .then((response) => response.json())
    .then((json) => {
      dispatch({
        type: 'GET_TODOS',
        payload: [...json],
      })

    })
    .finally(() => { dispatch(setIsLoading(false)) });
}
