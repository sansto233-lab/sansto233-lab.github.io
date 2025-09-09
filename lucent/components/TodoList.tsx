import React, { useState, useEffect, useCallback, memo } from 'react';
import type { Todo } from '../types';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';

const TodoItem: React.FC<{ todo: Todo; onToggle: () => void; onDelete: () => void; }> = memo(({ todo, onToggle, onDelete }) => {
    return (
        <li className="flex items-center justify-between py-3 border-b border-border-light dark:border-border-dark">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={onToggle}
                    className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                />
                <span className={`ml-3 text-text-primary-light dark:text-text-primary-dark ${todo.completed ? 'line-through text-text-secondary-light dark:text-text-secondary-dark' : ''}`}>
                    {todo.text}
                </span>
            </div>
            <button onClick={onDelete} className="text-text-secondary-light hover:text-red-500 dark:hover:text-red-400 transition-colors" aria-label="Delete task">
                <TrashIcon className="w-5 h-5" />
            </button>
        </li>
    );
});

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodoText, setNewTodoText] = useState('');

    useEffect(() => {
        try {
            const savedTodos = localStorage.getItem('todos');
            if (savedTodos) {
                setTodos(JSON.parse(savedTodos));
            }
        } catch (error) {
            console.error("Failed to load todos from localStorage", error);
            setTodos([]);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('todos', JSON.stringify(todos));
        } catch (error) {
            console.error("Failed to save todos to localStorage", error);
        }
    }, [todos]);

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodoText.trim()) {
            const newTodo: Todo = {
                id: Date.now(),
                text: newTodoText.trim(),
                completed: false,
            };
            setTodos(prev => [...prev, newTodo]);
            setNewTodoText('');
        }
    };
    
    const toggleTodo = useCallback((id: number) => {
        setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    }, []);
    
    const deleteTodo = useCallback((id: number) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }, []);

    return (
        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-soft">
            <h4 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">To-Do List</h4>
            <form onSubmit={handleAddTodo} className="mt-4 flex items-center space-x-2">
                <input
                    type="text"
                    value={newTodoText}
                    onChange={(e) => setNewTodoText(e.target.value)}
                    className="flex-grow px-3 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-md shadow-sm placeholder-text-secondary-light focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Add a new task..."
                />
                <button type="submit" className="p-2 bg-primary text-white rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-surface-dark disabled:opacity-50" disabled={!newTodoText.trim()} aria-label="Add task">
                    <PlusIcon className="w-6 h-6" />
                </button>
            </form>
            <ul className="mt-4 h-64 overflow-y-auto pr-2">
                {todos.length > 0 ? (
                    todos.map(todo => <TodoItem key={todo.id} todo={todo} onToggle={() => toggleTodo(todo.id)} onDelete={() => deleteTodo(todo.id)} />)
                ) : (
                    <p className="text-center text-text-secondary-light dark:text-text-secondary-dark py-8">No tasks yet. Add one above!</p>
                )}
            </ul>
        </div>
    );
};

export default TodoList;