import { useState } from 'react';

export const useRequestAdd = (refreshTodos) => {
  const [isCreating, setIsCreating] = useState(false);

  const requestAdd = (text) => {
    setIsCreating(true);

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
        refreshTodos();
        console.log(response);
      })
      .finally(() => setIsCreating(false));
  };

  return {
    isCreating,
    requestAdd,
  };
};
