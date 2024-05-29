export const getTodos = (dispatch) =>
  fetch('http://localhost:3005/todos')
    .then((response) => response.json())
    .then((json) => {
      dispatch({
        type: 'GET_TODOS',
        payload: [...json],
      })
    });
