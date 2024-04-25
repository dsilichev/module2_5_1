import { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export const useRequestUpdate = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const requestUpdate = (id, data) => {
    setIsUpdating(true);

    const todosItemDbRef = ref(db, `todos/${id}`);

    set(todosItemDbRef, data)
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
