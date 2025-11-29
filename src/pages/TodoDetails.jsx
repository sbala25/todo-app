import React, { useEffect, useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Calendar, Clock, CheckCircle, Circle } from 'lucide-react';
import Modal from '../components/Modal';

const TodoDetails = () => {
    const { id } = useParams();
    const { getTodo, deleteTodo, toggleComplete } = useTodo();
    const navigate = useNavigate();
    const todo = getTodo(id);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        if (!todo) {
            navigate('/');
        }
    }, [todo, navigate]);

    if (!todo) return null;

    const handleDelete = () => {
        deleteTodo(id);
        navigate('/');
    };

    const createdDate = new Date(todo.createdAt);

    return (
        <div className="container-sm">
            <div className="page-header">
                <button onClick={() => navigate(-1)} className="btn btn-icon">
                    <ArrowLeft size={24} />
                </button>
                <div className="header-actions">
                    <button
                        onClick={() => toggleComplete(todo.id)}
                        className={`btn ${todo.completed ? 'btn-success' : 'btn-secondary'}`}
                        style={{ color: todo.completed ? 'var(--success)' : 'inherit', borderColor: todo.completed ? 'var(--success)' : 'var(--border)' }}
                    >
                        {todo.completed ? <CheckCircle size={18} /> : <Circle size={18} />}
                        {todo.completed ? 'Completed' : 'Mark Complete'}
                    </button>
                    <Link to={`/edit/${id}`} className="btn btn-primary">
                        <Edit size={18} />
                        Edit
                    </Link>
                    <button onClick={() => setIsDeleteModalOpen(true)} className="btn btn-danger">
                        <Trash2 size={18} />
                        Delete
                    </button>
                </div>
            </div>

            <div className="card details-card">
                <h1 className="details-title">{todo.title}</h1>

                <div className="details-meta">
                    <div className="meta-item">
                        <Calendar size={16} />
                        <span>{createdDate.toLocaleDateString()}</span>
                    </div>
                    <div className="meta-item">
                        <Clock size={16} />
                        <span>{createdDate.toLocaleTimeString()}</span>
                    </div>
                </div>

                <div className="details-body">
                    <p>{todo.description || 'No description provided.'}</p>
                </div>
            </div>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Task"
            >
                <p>Are you sure you want to delete this task? This action cannot be undone.</p>
                <div className="modal-actions">
                    <button onClick={() => setIsDeleteModalOpen(false)} className="btn btn-secondary">
                        Cancel
                    </button>
                    <button onClick={handleDelete} className="btn btn-danger">
                        Delete
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default TodoDetails;
