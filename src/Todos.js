import React, { useState } from 'react'
import "./App.css"

const Todos = ({ todos, deleteTodo, handleEditClick }) => {

    return (
        <div>
            {
                todos.map((todo) => (
                    <div key={todo.id} className="todo">
                        <text >{todo.text}</text>
                        <div className="buttonPanel">
                            <button className="btn" onClick={() => handleEditClick(todo)}>Edit</button>
                            <button className="btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default Todos
