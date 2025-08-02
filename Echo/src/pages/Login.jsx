import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../context/userContext';

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogin = async () => {
    setMessage('');
    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to login');
      
      localStorage.setItem('token', data.token);
      setUser(data.user);
      navigate('/');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleRegister = async () => {
    setMessage('');
    try {
      const response = await fetch(`${apiUrl}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to register');
      
      setMessage(`Success! User "${data.user.username}" created. Please log in.`);
      setIsLoginMode(true);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  if (user) {
    return (
      <div className='flex flex-col items-center justify-center h-full w-full bg-[var(--primary)] text-white p-4 text-center'>
        <h1 className='text-3xl font-bold mb-4'>Welcome back, {user.username}!</h1>
        <div className="flex gap-4">
          <Link to="/" className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>
            Go to Home
          </Link>
          <button onClick={handleLogout} className='bg-red-500 text-white p-2 rounded hover:bg-red-600'>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center h-full w-full bg-[var(--primary)] text-white p-4'>
      <h1 className='text-3xl font-bold mb-4'>{isLoginMode ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full max-w-sm'>
        <input
          type='text'
          placeholder='Username'
          className='p-2 rounded bg-gray-200 text-black'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          className='p-2 rounded bg-gray-200 text-black'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit' className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>
          {isLoginMode ? 'Login' : 'Register'}
        </button>
        {message && <p className="mt-4 text-center text-red-300">{message}</p>}
      </form>
      <button 
        type="button" 
        onClick={() => setIsLoginMode(!isLoginMode)} 
        className="w-full mt-4 text-center text-sm text-gray-300 hover:underline"
      >
        {isLoginMode ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
    </div>
  );
}