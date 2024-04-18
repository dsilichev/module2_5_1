import { useState } from 'react';

export const useRequestUpdate = (refreshTodos) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const requestUpdate = (id, text = 'Default text') => {
    setIsUpdating(true);

    fetch(`http://localhost:3005/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        text: text,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        refreshTodos();
        console.log(response);
      })
      .finally(() => setIsUpdating(false));
  };

  return {
    isUpdating,
    requestUpdate,
  };
};
