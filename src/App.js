import react, { useState, useEffect } from 'react';
import './App.css';
import uuid from 'react-uuid'
import Todos from './Todos';

function App() {

  //Collection of todos
  const [todos, setTodos] = useState(() => {
    const Todos = localStorage.getItem("todos")

    if (Todos) {
      return JSON.parse(Todos)
    }
    else {
      return []
    }
  });

  //Single Todo
  const [todo, setTodo] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});





  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo !== "" && todo.length < 20) {
      setTodos([...todos, { id: uuid(), text: todo }]);
    }
    else {
      alert("todo length must be less than 20")
    }

    setTodo("");
  }

  const deleteTodo = (id) => {
    const newTodo = todos.filter((todo) => {
      return todo.id !== id;
    });
    // removeItem returns a new array - so now we are setting the todos to the new array
    setTodos(newTodo);
  }

  const handleEditInput = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log("edit=============>>>>>>>>", currentTodo);
  }

  const handleEditClick = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }


  function handleUpdateTodo(id, updatedTodo) {
    console.log("update=============>>>>>>>",updatedTodo);

    if (updatedTodo.text.length < 30) {
      const updatedItem = todos.map((todo) => {
        return todo.id === id ? updatedTodo : todo;
      });

      setIsEditing(false);
      setTodos(updatedItem);
    }
    else {
      alert("todo length must be less than 30")
    }

  }

  function handleEditSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }



  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);



  return (
    <div className="App">

      <div className="todoForm">
        <h1>TODO APP</h1>
        {isEditing ?

          <form onSubmit={handleEditSubmit} className="todoInput">
            <input
              type="text"
              value={currentTodo.text}
              placeholder="Edit todo"
              onChange={handleEditInput}
            />
            <div>
              <button type="submit">Update</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
          :

          <form onSubmit={handleSubmit} className="todoInput">
            <input
              type="text"
              value={todo}
              placeholder="Create a new todo"
              onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit">Add Todo</button>
          </form>
        }

        <Todos todos={todos} deleteTodo={deleteTodo} handleEditClick={handleEditClick} />
      </div>

    </div>
  );
}

export default App;
