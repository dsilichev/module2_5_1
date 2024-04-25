import { useState } from 'react';
import { ref, update } from 'firebase/database';
import { db } from '../firebase';

export const useRequestUpdate = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const requestUpdate = (id, data) => {
    setIsUpdating(true);

    const todosItemDbRef = ref(db, `todos/${id}`);

    update(todosItemDbRef, data)
      .then((response) => {
        
        console.log(response);
      })
      .finally(() => setIsUpdating(false));
  };

  return {
    isUpdating,
    requestUpdate,
  };
};
