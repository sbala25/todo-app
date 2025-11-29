import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Edit, Eye, CheckCircle, Circle } from 'lucide-react';
import Modal from './Modal';
import { useTodo } from '../context/TodoContext';

import { motion } from 'framer-motion';

const TodoItem = ({ todo, onDelete }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { toggleComplete } = useTodo();

    const handleDelete = () => {
        onDelete(todo.id);
        setIsDeleteModalOpen(false);
    };

    return (
        <>
            <motion.div
                className={`card todo-item ${todo.completed ? 'completed' : ''}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
            >
                <motion.button
                    className={`btn-icon btn-check ${todo.completed ? 'checked' : ''}`}
                    onClick={() => toggleComplete(todo.id)}
                    title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                    whileTap={{ scale: 0.8 }}
                >
                    {todo.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
                </motion.button>
                <div className="todo-content">
                    <h3 className="todo-title">{todo.title}</h3>
                    <p className="todo-description">{todo.description}</p>
                    <span className="todo-date">
                        Created: {new Date(todo.createdAt).toLocaleDateString()}
                    </span>
                </div>
                <div className="todo-actions">
                    <Link to={`/todo/${todo.id}`} className="btn-icon" title="View Details">
                        <Eye size={20} />
                    </Link>
                    <Link to={`/edit/${todo.id}`} className="btn-icon" title="Edit">
                        <Edit size={20} />
                    </Link>
                    <motion.button
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="btn-icon btn-delete"
                        title="Delete"
                        whileHover={{ scale: 1.1, color: '#ef4444' }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Trash2 size={20} />
                    </motion.button>
                </div>
            </motion.div>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Task"
            >
                <p>Are you sure you want to delete "{todo.title}"? This action cannot be undone.</p>
                <div className="modal-actions">
                    <button onClick={() => setIsDeleteModalOpen(false)} className="btn btn-secondary">
                        Cancel
                    </button>
                    <button onClick={handleDelete} className="btn btn-danger">
                        Delete
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default TodoItem;
