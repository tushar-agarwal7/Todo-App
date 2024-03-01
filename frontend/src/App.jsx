import React, { useState, useEffect } from 'react';
import './App.css';
import CreateTodo from './CreateTodo';
import Todo from './components/Todo';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/todos")
      .then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);
      });
  }, []); 

  return (
    <div>
      <h2>Todo App</h2>
      <CreateTodo setTodos={setTodos} />
      <Todo todos={todos} />
    </div>
  );
}

export default App;
