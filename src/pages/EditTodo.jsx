import React, { useEffect } from 'react';
import { useTodo } from '../context/TodoContext';
import TodoForm from '../components/TodoForm';
import { useNavigate, useParams } from 'react-router-dom';

const EditTodo = () => {
    const { id } = useParams();
    const { getTodo, updateTodo } = useTodo();
    const navigate = useNavigate();
    const todo = getTodo(id);

    useEffect(() => {
        if (!todo) {
            navigate('/');
        }
    }, [todo, navigate]);

    const handleSubmit = (data) => {
        updateTodo(id, data);
        navigate('/');
    };

    if (!todo) return null;

    return (
        <div className="container-sm">
            <TodoForm title="Edit Task" initialData={todo} onSubmit={handleSubmit} />
        </div>
    );
};

export default EditTodo;
