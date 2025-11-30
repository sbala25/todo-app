import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, Plus, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Layout = ({ children }) => {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const isAddPage = location.pathname === '/add';

    return (
        <div className="layout">
            <header className="header">
                <div className="container header-content">
                    <Link to="/" className="logo">
                        <CheckSquare size={28} color="var(--primary)" />
                        <span>TaskMaster</span>
                    </Link>
                    <div className="header-actions">
                        <button onClick={toggleTheme} className="btn-icon" title="Toggle Theme">
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        {!isAddPage && (
                            <Link to="/add" className="btn btn-primary">
                                <Plus size={18} />
                                Add Task
                            </Link>
                        )}
                    </div>
                </div>
            </header>
            <main className="container main-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
