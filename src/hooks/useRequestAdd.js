import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAdd = () => {
  const [isCreating, setIsCreating] = useState(false);

  const requestAdd = (text) => {
    setIsCreating(true);

    const todosDbRef = ref(db, 'todos');

    push(todosDbRef, {
      text: text,
      completed: false,
    })
      .then((response) => {
        
        console.log('Добавлено:', response);
      })
      .finally(() => setIsCreating(false));
  };

  return {
    isCreating,
    requestAdd,
  };
};
