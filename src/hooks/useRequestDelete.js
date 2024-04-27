import { useState } from 'react';
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDelete = (refreshTodos) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const requestDelete = (id) => {
    setIsDeleting(true);

    const todosItemDbRef = ref(db, `todos/${id}`);

    remove(todosItemDbRef)
      .then((response) => {
        console.log(response);
      })
      .finally(() => setIsDeleting(false));
  };

  return {
    isDeleting,
    requestDelete,
  };
};
