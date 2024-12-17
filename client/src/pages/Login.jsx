import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Mock login validation
        if (username === 'user' && password === 'password') {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/notes'); // Redirect to notes page
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Login</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="card p-4">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                </div>
                <button className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}