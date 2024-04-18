import { useState } from 'react';

export const useRequestDelete = (refreshTodos) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const requestDelete = (id) => {
    setIsDeleting(true);

    fetch(`http://localhost:3005/todos/${id}`, {
      method: 'DELETE',
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        refreshTodos();
        console.log(response);
      })
      .finally(() => setIsDeleting(false));
  };

  return {
    isDeleting,
    requestDelete,
  };
};
