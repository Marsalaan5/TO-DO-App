import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
    const [todo, setTodo] = useState("");
    const { addTodo } = useTodo();

    const handleAdd = (e) => {
        e.preventDefault();

        if (!todo.trim()) return; // Check if the input is not empty

        addTodo({
            todo: todo.trim(),
            completed: false
        });
        setTodo(""); // Clear the input field after adding the todo
    };

    return (
        <form onSubmit={handleAdd} className="flex items-center space-x-2 max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
            <input
                type="text"
                placeholder="Enter your task..."
                className="flex-grow border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition duration-300"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button
                type="submit"
                className="bg-green-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-green-700 transition duration-300"
            >
                Add
            </button>
        </form>
    );
}

export default TodoForm;



