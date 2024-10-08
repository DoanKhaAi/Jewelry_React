import React, { useState } from 'react';
import axios from 'axios'; 
import '../css/Form.css'; 

const OtpForm = () => {
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [success, setSuccess] = useState('');

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setOtpError('');

        try {
            const response = await axios.post('/api/verify-otp', otp); 
            console.log(response);
            if (response.data=="OK") {
                setSuccess('Tài khoản đã được ghi thành công!. ');
            } else {
                setOtpError('Mã OTP không hợp lệ.');
            }
        } catch (error) {
            console.log("Lỗi OTP");
        }
    };

    return (
        <div className="form-container">
            <div className="login-regis-form-container">
                <h4>Nhập mã OTP</h4>
                <p style={{ color: 'blue', textAlign: 'center'}}>Mã OTP đã được gửi về email của bạn</p>
                {otpError && <div className="noti"><p style={{ color: 'red' }}>{otpError}</p></div>}
                {success && <div className="noti"><p style={{ color: 'green' }}>{success} <a href='/login'>Đăng nhập</a></p></div>}
                <form onSubmit={handleOtpSubmit}>
                    <div className="form-group">
                        <label>Mã OTP:</label>
                        <input
                            type="text"
                            placeholder="Nhập mã OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Xác thực OTP</button>
                </form>
            </div>
       
        </div>
    );
};

export default OtpForm;
