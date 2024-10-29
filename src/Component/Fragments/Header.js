import React, { useEffect, useState } from 'react';
import '../../css/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo1.png';

const Header = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    // useEffect(() => {
    //     const storedUsername = localStorage.getItem('username');
    //     if (storedUsername) {
    //         setUsername(storedUsername);
    //     } 
    // }, []);


    //Chỗ này em chưa xử lý được việc đổi thanh navbar khi đăng nhập thành công
    //Nên chỗ này em kiểm tra sự thay đổi tên người dùng lưu trong localStorage trong từng giây đêr cập nhật
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }

        const interval = setInterval(() => {
            const updatedUsername = localStorage.getItem('username');
            if (updatedUsername !== username) {
                setUsername(updatedUsername);
            }
        }, 1000); 

        return () => clearInterval(interval); 
    }, [username]);


    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername(''); 
        navigate('/');
    };

    return (
        <header className="header">
            <div className="logo">
                 <img src={logo} alt="Logo"/>KAJ<span>Sự gắn bó bền chặt</span>
            </div>
            <nav className="nav-links">
                <Link to="/" className="nav-link">Trang chủ</Link>
                <Link to="/product" className="nav-link">Sản phẩm</Link>
                <div className="auth-links">
                    {username ? (
                        <>
                            <span className="nav-link">{username}</span> 
                            <Link to="/cart" className="nav-link"><i class="fa-solid fa-cart-shopping"></i></Link> | 
                            <button className="nav-link" onClick={handleLogout}>Đăng xuất</button>
                        </>
                    ) : (
                        <>
                            <Link to="/register" className="nav-link">Đăng ký</Link> | 
                            <Link to="/login" className="nav-link">Đăng nhập</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
