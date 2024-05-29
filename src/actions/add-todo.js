export const addTodo = (text) => (dispatch) =>
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
        type: 'ADD_TODO',
        payload: response,
      })
    })
    .finally(() => setIsCreating(false));
