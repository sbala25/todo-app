import React, { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();

export const useTodo = () => {
    return useContext(TodoContext);
};

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (todo) => {
        setTodos((prev) => [
            { id: Date.now().toString(), createdAt: new Date().toISOString(), completed: false, ...todo },
            ...prev,
        ]);
    };

    const updateTodo = (id, updatedTodo) => {
        setTodos((prev) =>
            prev.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
        );
    };

    const toggleComplete = (id) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const getTodo = (id) => {
        return todos.find((todo) => todo.id === id);
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, getTodo, toggleComplete }}>
            {children}
        </TodoContext.Provider>
    );
};
