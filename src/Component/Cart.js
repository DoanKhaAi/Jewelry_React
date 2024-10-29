import React, { useEffect, useState } from 'react';
import '../css/Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(null);

  //Em Lấy thông tin người dùng từ loaclStorage để gọi API lấy thông tin giỏ hàng
  useEffect(() => {
    const username = localStorage.getItem('username');
    fetch(`/api/cart/${username}`)
      .then(response => response.json())
      .then(data => setCart(data))
      .catch(error => console.error('Error fetching cart data:', error));
  }, []);

  //Giảm số lượng sản phẩm trong giỏ hàng (Nhấn vào dấu trừ trong cột số lượng)-----------------------------------------------------------------------------------------------------
  const handleRemoveProduct = (productId) => {
    const username = localStorage.getItem('username');
    const itemToUpdate = cart.items.find(item => item.product.productID === productId);
  
    if (!itemToUpdate) return; 
  
    if (itemToUpdate.quantity === 1) {
      const confirmDelete = window.confirm("Sản phẩm này sẽ bị loại khỏi giỏ hàng. Bạn có chắc chắn không?");
      if (!confirmDelete) {
        return; 
      } 
    }
  
    fetch(`/api/cart/remove/${username}/${productId}`, {
      method: 'POST'
    })
      .then(response => {
        if (response.ok) {
          const updatedItems = cart.items
            .map(item => {
                if (item.product.productID === productId) {
                return { ...item, quantity: item.quantity - 1 };
              }
              return item;
            })
            .filter(item => item.quantity > 0); 
  
          setCart(prevCart => ({
            ...prevCart,
            items: updatedItems
          }));
        } else {
          console.error('Error removing product from cart');
        }
      })
      .catch(error => console.error('Error removing product from cart:', error));
  };
  
  //Thêm sản phẩm vào giỏ hàng------------------------------------------------------------------------------------------------------

  const handleAddToCart = (productId) => {
    const username = localStorage.getItem('username');
  
    fetch(`/api/cart/add/${username}/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        }
    })
    .then (()=>{
        setCart((prevCart) => {
            const updatedItems = prevCart.items.map((item) => {
              if (item.product.productID === productId) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            });
            return { ...prevCart, items: updatedItems };
          });
    })
    .catch((error) => alert("Số lượng sản phẩm vượt quá số lượng trong kho"));
  };
  

  //Loại bỏ mặt hàng này trong giỏ hàng--------------------------------------------------------------------------------------------------------
  const handleDeleteFromCart = (productId) => {
    const username = localStorage.getItem('username');

    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?");
    if (!confirmDelete) return;

    fetch(`/api/cart/delete/${username}/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        }
    })
      .then(response => {
        if (response.ok) {
          const updatedItems = cart.items.filter(item => item.product.productID !== productId); 
          setCart(prevCart => ({
            ...prevCart,
            items: updatedItems
          }));
        } else {
          console.error('Error deleting product from cart');
        }
      })
      .catch(error => console.error('Error deleting product from cart:', error));
  };
  
  //-------------------------------------------------------------------------------------------------------
  if (!cart) {
    return <div>Loading...</div>;
  }

  const totalPrice = cart.items.reduce((total, item) => {
    return total + item.quantity * item.product.productPrice;
  }, 0);

  return (
    <div className="cart">
      <p>{cart.user.fullname}</p>
      <table className="cart-table">
        <thead>
          <tr>
            <th className="cart-img">Hình ảnh</th>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng cộng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item) => (
            <tr key={item.id}>
              <td>
                <img 
                  src={`http://localhost:8080/img/product/${item.product.productImage}`}
                  alt={item.product.productName}
                />
              </td>
              <td className="item-name">{item.product.productName} (SL còn: {item.product.productQuantity})</td>
              <td>{item.product.productPrice.toLocaleString()} VND</td>
              <td>
                    <i class="fa-solid fa-square-minus icon"
                         onClick={() => handleRemoveProduct(item.product.productID)}></i>
                    {item.quantity}
                    <i class="fa-solid fa-square-plus icon"
                         onClick={() => handleAddToCart(item.product.productID)}></i>
              </td>
              <td>{(item.quantity * item.product.productPrice).toLocaleString()} VND</td>
              <td><i class="fa-solid fa-square-xmark"
                    onClick={() => handleDeleteFromCart(item.product.productID)}></i></td>
            </tr>
          ))}

          <tr>
            <td colSpan="6" className="cart-total">
                Tổng thanh toán: {totalPrice.toLocaleString()} VND 
                <button className="cart-button">Mua</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
