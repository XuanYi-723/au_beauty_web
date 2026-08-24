import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import './Inquiry.css';

const Inquiry = () => {
  const { inquiryList, updateInquiryQuantity, removeFromInquiry, clearInquiry } = useStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (inquiryList.length === 0) {
      alert("請先加入想詢問的產品！");
      return;
    }

    // 格式化訂單內容
    let productText = inquiryList.map((item, idx) => 
      `${idx + 1}. ${item.product.name} x${item.quantity}`
    ).join('\n');

    const textMessage = `您好，我是 ${formData.name}，電話：${formData.phone}。\n\n我想詢問以下商品：\n${productText}\n\n希望預約諮詢日期：${formData.date || '無'}\n其他想詢問的事項：\n${formData.message || '無'}`;

    // 使用 LINE Share API 跳轉
    // https://line.me/R/msg/text/?{text}
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(textMessage)}`;
    window.open(lineUrl, '_blank');
  };

  return (
    <div className="inquiry-page container animate-fade-in">
      <div className="page-header text-center">
        <h1 className="text-gradient">詢問清單 & 預約諮詢</h1>
        <p>確認您感興趣的產品，並送出諮詢表單，我們的美容顧問將盡快與您聯繫</p>
      </div>

      <div className="inquiry-layout">
        <div className="inquiry-items glass-panel">
          <h3>選取的產品 ({inquiryList.length})</h3>
          
          {inquiryList.length === 0 ? (
            <div className="empty-cart text-center">
              <p>目前清單是空的</p>
              <button className="btn btn-outline" onClick={() => navigate('/products')}>去逛逛產品</button>
            </div>
          ) : (
            <div className="cart-list">
              {inquiryList.map(item => (
                <div key={item.product.id} className="cart-item">
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="item-details">
                    <h4>{item.product.name}</h4>
                    <span>{item.product.priceDisplay}</span>
                  </div>
                  <div className="item-actions">
                    <div className="qty-controls">
                      <button onClick={() => updateInquiryQuantity(item.product.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateInquiryQuantity(item.product.id, item.quantity + 1)}>+</button>
                    </div>
                    <button className="delete-btn" onClick={() => removeFromInquiry(item.product.id)}>刪除</button>
                  </div>
                </div>
              ))}
              <div className="cart-footer">
                <button className="text-muted" onClick={clearInquiry} style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>清空所有項目</button>
              </div>
            </div>
          )}
        </div>

        <div className="inquiry-form glass-panel">
          <h3>聯絡資訊</h3>
          <form onSubmit={handleCheckout}>
            <div className="form-group">
              <label>姓名 *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>聯絡電話 *</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>希望預約諮詢日期 (選填)</label>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>其他想了解的事項 (選填)</label>
              <textarea name="message" rows="4" value={formData.message} onChange={handleInputChange}></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary btn-full-width mt-2">
              透過 LINE 送出詢問
            </button>
            <p className="form-hint text-center">點擊後將自動為您開啟 LINE 填入對話</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
