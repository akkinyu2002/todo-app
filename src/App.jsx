import { useState, useEffect } from 'react';
import './App.css';
import { FaPlus, FaPencilAlt, FaTrash } from 'react-icons/fa';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    console.log('Loading todos from localStorage:', savedTodos);
    if (savedTodos) {
      try {
        const parsed = JSON.parse(savedTodos);
        console.log('Parsed todos:', parsed);
        setTodos(parsed);
      } catch (error) {
        console.error('Failed to load todos from localStorage:', error);
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    console.log('Saving todos to localStorage:', todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const setEdit = (index) => {
    setInput(todos[index].todo);
    setEditIndex(index);
  };

  const addTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, { id: Date.now(), todo: input }]);
      setInput('');
    }
  };

  const updateTodo = () => {
    if (input.trim() !== '' && editIndex !== -1) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex].todo = input;
      setTodos(updatedTodos);
      setEditIndex(-1);
      setInput('');
    }
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(-1);
      setInput('');
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-custom-background bg-center bg-cover">
      <div className="bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4">
        <h1 className="text-3xl font-bold text-center mb-4"> Todo App</h1>
        <div className="flex">
          <input
            type="text"
            placeholder="Add a Todo"
            className="py-2 px-2 border rounded w-full focus:outline-none mr-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                editIndex === -1 ? addTodo() : updateTodo();
              }
            }}
          />
          <button
            onClick={editIndex === -1 ? addTodo : updateTodo}
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded hover:from-blue-500 hover:to-blue-700"
          >
            {editIndex === -1 ? <FaPlus /> : <FaPencilAlt />}
          </button>
        </div>
      </div>
      {todos.length > 0 && (
        <div className="bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4">
          <ul>
            {todos.map((todo, index) => (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-white p-3 rounded shadow-md mb-3"
              >
                <span className="text-lg">{todo.todo}</span>
                <div>
                  <button
                    onClick={() => setEdit(index)}
                    className="mr-2 p-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded hover:from-gray-500 hover:to-gray-700 "
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    onClick={() => removeTodo(index)}
                    className="p-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded hover:from-red-500 hover:to-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
