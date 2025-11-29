import React from 'react';
import { useTodo } from '../context/TodoContext';
import TodoItem from '../components/TodoItem';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
    const { todos, deleteTodo } = useTodo();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="page-header">
                <h1 className="page-title">My Tasks</h1>
                <Link to="/add" className="btn btn-primary">
                    <PlusCircle size={20} />
                    New Task
                </Link>
            </div>

            {todos.length === 0 ? (
                <motion.div
                    className="empty-state"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <p>No tasks yet. Add one to get started!</p>
                </motion.div>
            ) : (
                <motion.div className="todo-list" layout>
                    <AnimatePresence mode='popLayout'>
                        {todos.map((todo) => (
                            <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Home;
