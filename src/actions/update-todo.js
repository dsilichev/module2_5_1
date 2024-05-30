export const updateTodo = (id, data) => (dispatch) => {
  fetch(`http://localhost:3005/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data),
  })
    .then((rawResponse) => rawResponse.json())
    .then((response) => {
      dispatch({
        type: 'UPDATE_TODOS',
        payload: { id, data },
      });
      console.log(response);
    })
    .finally(() => {});
};

export const updateLocalTodo = (id, data) => (dispatch) => {
  dispatch({
    type: 'UPDATE_TODOS',
    payload: { id, data },
  });
};
