import React from 'react';
import '../../css/Footer.css';
import logo from '../../images/logo.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
               <div className="footer-column">
                     <img src={logo} alt="Logo" />  
                </div>
               
                <div className="footer-column">
                    <h4 className="footer-header">Liên Hệ</h4>
                    <p>Email: KhaAi@gmail.com</p>
                    <p>Điện thoại: +84 123 456 789</p>
                </div>
                <div className="footer-column">
                    <h4 className="footer-header">Thông tin Công Ty</h4>
                    <p>Chuyên bán các loại trang sức cao cấp</p>
                    <p>Địa chỉ: Đường 3/2, Xuân Khánh, Ninh Kiều, TP. Cần Thơ</p>
                </div>
                <div className="footer-social">
                    <h4 className="footer-header">Kết Nối Với Chúng Tôi</h4>
                    <div className="social-icons">
                        <i className="fab fa-facebook social-icon"></i>
                        <i className="fab fa-instagram social-icon"></i>
                        <i className="fab fa-tiktok social-icon"></i>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Đoàn Khả Ái</p>
            </div>
        </footer>
    );
};

export default Footer;
