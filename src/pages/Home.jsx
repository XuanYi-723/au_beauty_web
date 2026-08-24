import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import './Home.css';

const Home = () => {
  // 挑選幾個熱門產品 (可以抓前4個作為示範)
  const popularProducts = productsData.slice(0, 4);

  return (
    <div className="home-page animate-fade-in">
      <Hero />
      
      {/* 品牌理念區塊 (預留位) */}
      <section className="brand-philosophy container">
        <div className="text-center">
          <h2 className="section-title text-gradient">關於 於美 au_beauty</h2>
          <p className="lead-text">
            (此處預留給您提供品牌理念與核心價值的文案，描述醫美級保養的專業與堅持。)
          </p>
        </div>
      </section>

      {/* 熱門產品區塊 */}
      <section className="popular-products container">
        <div className="section-header">
          <h2 className="section-title">熱門推薦產品</h2>
          <Link to="/products" className="btn btn-outline">查看全部產品</Link>
        </div>
        <div className="products-grid">
          {popularProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 預約 CTA 區塊 */}
      <section className="cta-section">
        <div className="container text-center">
          <h2>尋找專屬於您的肌膚保養方案？</h2>
          <p>進行快速肌膚測驗，或是直接預約一對一專業諮詢。</p>
          <div className="cta-buttons">
            <Link to="/quiz" className="btn btn-primary">開始肌膚測驗</Link>
            <Link to="/contact" className="btn btn-outline">預約諮詢</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
