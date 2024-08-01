import { useState, useEffect } from "react";
import "./App.css";
import { TodoProvider } from "./contexts/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompletedTodos = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  const recentActivities = todos.slice(0, 5).map((todo) => (
    <li
      key={todo.id}
      className={`text-sm ${todo.completed ? "line-through" : ""}`}
    >
      {todo.todo}
    </li>
  ));

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div
        className={`min-h-screen py-8 flex flex-col items-center justify-center transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
        }`}
      >
        <section className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 dark:text-gray-100 mb-8">
          <h1 className="text-4xl font-bold text-center mb-4 text-[#172842] dark:text-gray-200">
            Welcome to My To-do Manager
          </h1>
          <p className="text-center text-lg mb-4">
            Organize your tasks and boost your productivity with ease. Add,
            update, and track your tasks efficiently.
          </p>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="block mx-auto bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg px-4 py-2 transition-colors duration-300"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </section>

        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 dark:text-black">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#172842] dark:text-gray-100">
              Manage Your Todos
            </h2>
          </div>

          <div className="mb-6">
            <TodoForm />
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {totalTodos} Todo{totalTodos !== 1 ? "s" : ""}
              </span>
              <button
                onClick={clearCompletedTodos}
                className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 transition-colors duration-300"
              >
                Clear Completed
              </button>
            </div>
            <div className="space-y-4 py-4">
              {todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>

            <div className="flex flex-col space-y-4 mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h2 className="text-lg font-semibold">Statistics</h2>
              <p className="text-sm">Completed: {completedTodos}</p>
              <p className="text-sm">Pending: {pendingTodos}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Recent Activities</h2>
              <ul className="list-disc pl-5 space-y-2">
                {recentActivities.length > 0 ? (
                  recentActivities
                ) : (
                  <li>No recent activities</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <footer className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8 dark:bg-gray-800 dark:text-gray-100">
          <div className="text-center text-sm">
            <p>© 2024 Mohammad Rashid. All rights reserved.</p>
            <p>Built with ❤️ using ReactJs.</p>
          </div>
        </footer>
      </div>
    </TodoProvider>
  );
}

export default App;
