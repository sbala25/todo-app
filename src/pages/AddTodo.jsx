import React from 'react';
import { useTodo } from '../context/TodoContext';
import TodoForm from '../components/TodoForm';
import { useNavigate } from 'react-router-dom';

const AddTodo = () => {
    const { addTodo } = useTodo();
    const navigate = useNavigate();

    const handleSubmit = (data) => {
        addTodo(data);
        navigate('/');
    };

    return (
        <div className="container-sm">
            <TodoForm title="Add New Task" onSubmit={handleSubmit} />
        </div>
    );
};

export default AddTodo;
