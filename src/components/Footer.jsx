import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>Bio-Renewal</h2>
            <p>融合科學與專業，為您帶來極致的肌膚呵護體驗。我們致力於研發最適合您的保養聖品。</p>
          </div>
          
          <div className="footer-links">
            <h3>產品系列</h3>
            <ul>
              <li><a href="#products">卸妝潔顏系列</a></li>
              <li><a href="#products">化妝水系列</a></li>
              <li><a href="#products">精華液/油系列</a></li>
              <li><a href="#products">德國高效安瓶</a></li>
              <li><a href="#products">法國植萃安瓶</a></li>
              <li><a href="#products">乳液系列</a></li>
              <li><a href="#products">乳霜系列</a></li>
              <li><a href="#products">術後修復系列</a></li>
              <li><a href="#products">面膜/凍膜系列</a></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h3>聯絡我們</h3>
            <p>週一至週六 10:00 - 20:00</p>
            <p>Email: service@bio-renewal.com</p>
            <p>歡迎追蹤我們獲取最新活動與保養資訊</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Bio-Renewal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
