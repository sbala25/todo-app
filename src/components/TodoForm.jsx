import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TodoForm = ({ initialData, onSubmit, title }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="card form-card">
            <div className="page-header">
                <h2 className="page-title">{title}</h2>
            </div>
            <form onSubmit={handleSubmit} className="todo-form">
                <div className="form-group">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="input"
                        placeholder="What needs to be done?"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="input textarea"
                        placeholder="Add some details..."
                        rows="4"
                    />
                </div>
                <div className="form-actions">
                    <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">
                        <X size={18} />
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        <Save size={18} />
                        Save Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TodoForm;
