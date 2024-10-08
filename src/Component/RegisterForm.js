import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Form.css'; 

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [errors, setErrors] = useState({}); 
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {}; 
        let valid = true;

        if (username.length < 3 || username.length > 20) {
            newErrors.username = 'Tên đăng nhập phải có từ 3 đến 20 ký tự';
            valid = false;
        }
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}$/;
        if (!passwordPattern.test(password)) { 
            newErrors.password = 'Mật khẩu từ 8->10 ký tự, bao gồm chữ cái, chữ số và ký tự đặc biệt';
            valid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            newErrors.email = 'Email không hợp lệ';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors('');
        setSuccess('');

        if (!validateForm()) {
            return; 
        }

        const userData = {
            username,
            password,
            fullname,
            email,
            gender,
            birthday
        };

        try {
            const response = await axios.post('/api/register', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setSuccess('Đăng ký thành công!');
            console.log(response);
            navigate('/otp');
        } catch (error) {
            const errorMessage = error.response.data; 
            setErrors({
                username: errorMessage.usernameError || '', 
                email: errorMessage.emailError || '' 
            });
            console.log(error);
        }
    };

    return (
        <div className="form-container container-regis-only">
            <div className="login-regis-form-container regis-only">
                <h4>ĐĂNG KÝ</h4>
                <div className="noti">{success && <p style={{ color: 'green' }}>{success}</p>}</div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tên đăng nhập</label>
                        <input
                            type="text"
                            placeholder="Tên đăng nhập"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <p className="p-error" >{errors.username}</p>
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu:</label>
                        <input 
                            type="password"
                            placeholder="Mật khẩu"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <p className="p-error" >{errors.password}</p>
                    </div>
                    <div className="form-group">
                        <label>Họ và tên</label>
                        <input
                            type="text"
                            placeholder="Họ và tên"
                            onChange={(e) => setFullname(e.target.value)}
                            required
                        />
                        <p className="p-error" ></p>

                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <p className="p-error">{errors.email}</p>
                    </div>
                    <div className="form-group">
                        <label>Giới tính</label>
                        <select
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </select>
                        <p className="p-error" ></p>
                    </div>
                    <div className="form-group">
                        <label>Ngày sinh</label>
                        <input
                            type="date"
                            onChange={(e) => setBirthday(e.target.value)}
                        />  
                    </div>
                    <button type="submit">Đăng Ký</button>
                    <div className="register-link">
                         <p>Bạn đã có tài khoản? <a href="/login">Đăng nhập</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
