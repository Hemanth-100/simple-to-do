<<<<<<< HEAD
import React, { useState,useEffect } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> detached-work
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

<<<<<<< HEAD
  useEffect(() => {
    fetch("/api/todos")   // Thanks to Vite proxy, no need to write full URL
=======
  // FETCH TODOS FROM DB
  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
>>>>>>> detached-work
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  function handleChange(event) {
<<<<<<< HEAD
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem() {
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });
    setInputText("");
  }

  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
=======
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
>>>>>>> detached-work
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
<<<<<<< HEAD
=======

>>>>>>> detached-work
      <InputArea
        HandleChange={handleChange}
        InputText={inputText}
        AddItem={addItem}
      />
<<<<<<< HEAD
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={todoItem}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
=======

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
>>>>>>> detached-work
    </div>
  );
}

export default App;
