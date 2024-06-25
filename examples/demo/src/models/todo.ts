import { useState } from 'react';

export default function () {
  const [todos, setTodos] = useState(['foo', 'bar']);
  const addTodos = (todo: string) => {
    setTodos([...todos, todo]);
  };
  return {
    todos,
    addTodos,
    setTodos,
  };
}
