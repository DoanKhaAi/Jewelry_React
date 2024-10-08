import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Form.css'; 

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Đăng nhập không thành công');
            }

            const token = await response.text();
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            setUsername(username);
            navigate('/');
        } catch (error) {
            setError("Tên đăng nhập hoặc mật khẩu không đúng");
        }
    };

    return (
        <div className="form-container">
            <div className="login-regis-form-container">
                <h4>ĐĂNG NHẬP</h4>
                <div className="noti">{error && <p style={{ color: 'red' }}>{error}</p>}</div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tên đăng nhập</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Đăng Nhập</button>
                    <div className="register-link">
                         <p>Bạn chưa có tài khoản? <a href="/register">Đăng ký</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
