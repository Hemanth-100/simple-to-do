import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  // FETCH TODOS FROM DB
  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  function handleChange(event) {
    setInputText(event.target.value);
  }

  // ADD TODO → DB
  async function addItem() {
    if (!inputText.trim()) return;

    const response = await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ list: inputText }),
    });

    const newTodo = await response.json();
    setItems(prev => [...prev, newTodo]);
    setInputText("");
  }

  // DELETE TODO → DB
  async function deleteItem(id) {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE",
    });

    setItems(prev => prev.filter(item => item.id !== id));
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>

      <InputArea
        HandleChange={handleChange}
        InputText={inputText}
        AddItem={addItem}
      />

      <ul>
        {items.map(todo => (
          <ToDoItem
            key={todo.id}
            id={todo.id}
            text={todo.list}
            onChecked={deleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
