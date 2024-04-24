import { useEffect, useState } from "react"

export const useRequestGet = (refreshTodosFlag) => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    fetch('http://localhost:3005/todos')
      .then((response) => response.json())
      .then((json) => setTodos([...json]))
      .finally(() => setIsLoading(false));
  }, [refreshTodosFlag]);

  const storedTodos = todos.slice();
  return {
    isLoading,
    todos,
    setTodos,
    storedTodos,
  }
}
