import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import '../css/ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [error, setError] = useState(null);
    const username = localStorage.getItem('username');
    const navigate = useNavigate(); 

    useEffect(() => {
        fetch('/api/product', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Không thể lấy danh sách sản phẩm.');
            }
            return response.json();
        })
        .then(data => setProducts(data))
        .catch(error => {
            setError(error.message);
            console.error('Error fetching products:', error);
        });
    }, []);

    const openPopup = (product) => {
        setSelectedProduct(product);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedProduct(null);
    };

    const handleAddToCart = (productId) => {
        const token = localStorage.getItem('token'); 

        if (token) {
            try {
                const decoded = jwtDecode(token); 
                if (decoded.roles == 'ROLE_USER') { 
                    fetch(`/api/cart/add/${username}/${productId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    .then(response => {
                        if (!response.ok) {
                            console.error('Response status:', response.status);
                        } else alert('Sản phẩm đã được thêm vào giỏ hàng.');
                    })
                    .catch(() => {
                        //console.error('Error adding product to cart:', error);
                        alert("Số lượng sản phẩm vượt quá số lượng trong kho");
                    });
                } else {
                    alert('Bạn cần đăng nhập với vai trò người dùng mới có thể thêm sản phẩm vào giỏ hàng');
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                alert('Đã xảy ra lỗi khi kiểm tra quyền.');
            }
        } else {
            alert('Bạn vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng nhé!');
            navigate('/login');
        }
    };

    return (
        <div className="product-list-container">
            <h3 className="text-center mb-4 fw-bold title-h3">SẢN PHẨM</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="row">
                {products.map(product => (
                    <div className="col-md-3" key={product.productID}>
                        <div className="card product-card">
                            <img 
                                src={`http://localhost:8080/img/product/${product.productImage}`} 
                                className="card-img-top" 
                                alt={product.productName} 
                            />
                            <div className="card-body text-center">
                                <h5 className="name">{product.productName}</h5>
                                <p className="price">{product.productPrice} VND</p>
                                <div className="more">
                                    <p onClick={() => openPopup(product)}>Xem chi tiết
                                            <i className="fa-solid fa-angles-right"> </i>
                                    </p>
                                </div>
                                <button 
                                    className="btn add-to-cart-button" 
                                    onClick={() => handleAddToCart(product.productID)} 
                                >
                                    <i className="fas fa-shopping-cart"></i>
                                </button>
                                <button className="btn buy-button">Mua hàng</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {isPopupOpen && selectedProduct && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="btn btn-close" onClick={closePopup}></button>
                        <h5 className="popup-title">{selectedProduct.productName}</h5>
                        <p className="popup-description">{selectedProduct.productDescription}</p>
                        <p className="popup-price">{selectedProduct.productPrice} VND</p>   
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
