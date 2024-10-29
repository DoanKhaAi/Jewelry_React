import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import '../css/ProductList.css';

import image0 from '../images/type/all.jpg';
import image1 from '../images/type/daychuyen.jpg';
import image2 from '../images/type/nhan.jpg';
import image3 from '../images/type/vong.jpg';
import image4 from '../images/type/bongtai.jpg';

const ProductList = () => {
    const [products, setProducts] = useState([]); 
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const [isPopupOpen, setIsPopupOpen] = useState(false); 
    const [error, setError] = useState(null); 
    const [currentPage, setCurrentPage] = useState(0); 
    const [totalPages, setTotalPages] = useState(0); 
    const [productTypeID, setProductTypeID] = useState(0)
    const username = localStorage.getItem('username'); 
    const navigate = useNavigate(); 

    const fetchProducts = (page, size) => {
        fetch(`/api/product?page=${page}&size=${size}&productTypeID=${productTypeID}`, {
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
        .then(data => {
            setProducts(data.content || []);
            setTotalPages(data.totalPages); 
        })
        .catch(error => {
            setError(error.message);
            console.error('Error fetching products:', error);
        });
    };

    useEffect(() => {
        fetchProducts(currentPage, 12); 
    }, [currentPage, productTypeID]);


    const openPopup = (product) => {
        setSelectedProduct(product);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedProduct(null);
    };

    const handleFilter0 = () => {
        setProductTypeID(0); 
        setCurrentPage(0); 
    };

    const handleFilter1 = () => {
        setProductTypeID(1); 
        setCurrentPage(0); 
    };

    const handleFilter2 = () => {
        setProductTypeID(2); 
        setCurrentPage(0); 
    };

    const handleFilter3 = () => {
        setProductTypeID(3); 
        setCurrentPage(0); 
    };

    const handleFilter4 = () => {
        setProductTypeID(4); 
        setCurrentPage(0); 
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
                        } else {
                            alert('Sản phẩm đã được thêm vào giỏ hàng.');
                        }
                    })
                    .catch(() => {
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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="product-list-container">
            <h3 className="text-center mb-4 fw-bold title-h3">SẢN PHẨM</h3>
            <div className="type-container">
                <div className="type" onClick={handleFilter0}><img src={image0} alt="Tất cả"/><p>Tất cả</p></div>
                <div className="type" onClick={handleFilter1}><img src={image1} alt="Dây chuyền"/><p>Dây chuyền</p></div>
                <div className="type" onClick={handleFilter2}><img src={image2} alt="Nhẫn"/><p>Nhẫn</p></div>
                <div className="type" onClick={handleFilter3}><img src={image3} alt="Vòng tay"/><p>Vòng tay</p></div>
                <div className="type" onClick={handleFilter4}><img src={image4} alt="Bông tai"/><p>Bông tai</p></div>
            </div>
           
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="row">
                {products.length > 0 ? (
                    products.map(product => (
                        <div className="col-md-3" key={product.productID}>
                            <div className="card product-card">
                                <img 
                                    src={`http://localhost:8080/img/product/${product.productImage}`} 
                                    className="card-img-top" 
                                    alt={product.productName} 
                                />
                                <div className="card-body text-center">
                                    <h5 className="name">{product.productName}</h5>
                                    <p className="price">
                                        {new Intl.NumberFormat('vi-VN').format(product.productPrice)} VND
                                    </p>
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
                    ))
                ) : (
                    <p>Không có sản phẩm nào để hiển thị.</p> 
                )}
            </div>

            {isPopupOpen && selectedProduct && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="btn btn-close" onClick={closePopup}></button>
                        <h5 className="popup-title">{selectedProduct.productName}</h5>
                        <p className="popup-description">{selectedProduct.productDescription}</p>
                        <p className="popup-price">
                            {new Intl.NumberFormat('vi-VN').format(selectedProduct.productPrice)} VND
                        </p>
                    </div>
                </div>
            )}
            {/* Phân trang */}
            <div className="pagination">
                <button 
                    onClick={() => handlePageChange(0)} 
                    disabled={currentPage === 0} 
                    className="page-button page-icon"
                >
                    {'<<'}
                </button>

                {Array.from({ length: totalPages }).map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => handlePageChange(index)} 
                        className={`page-button ${currentPage === index ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button 
                    onClick={() => handlePageChange(totalPages - 1)} 
                    disabled={currentPage === totalPages - 1} 
                    className="page-button page-icon"
                >
                    {'>>'}
                </button>
            </div>
        </div>
    );
};

export default ProductList;
