export const deleteTodo = (id) => (dispatch) => {
  fetch(`http://localhost:3005/todos/${id}`, {
      method: 'DELETE',
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        //refreshTodos();
        dispatch({
          type: 'DELETE_TODOS',
          payload: id,
        })
        console.log(response);
      })
      .finally(() => {});
}
