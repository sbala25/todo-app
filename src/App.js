import './App.scss';
import Layout from './components/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import TodoDetails from './pages/TodoDetails';
import { TodoProvider } from './context/TodoContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddTodo />} />
              <Route path="/edit/:id" element={<EditTodo />} />
              <Route path="/todo/:id" element={<TodoDetails />} />
            </Routes>
          </Layout>
        </Router>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
