import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card glass-panel">
      <div className="product-image-wrapper">
        {product.image ? (
          <img src={product.image} alt={product.name} className="product-image" />
        ) : (
          <div className="product-image-placeholder">
            <div className="placeholder-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <span className="placeholder-brand">Bio-Renewal</span>
          </div>
        )}
      </div>
      <div className="product-info">
        <div className="product-header">
          <h3 className="product-name">{product.name}</h3>
          <span className="product-price">{product.priceDisplay}</span>
        </div>
        
        <p className="product-desc">{product.description}</p>
        
        <div className="product-meta">
          <span className="meta-tag">容量: {product.volume}</span>
        </div>
        
        <div className="product-details">
          <h4>適用對象</h4>
          <p>{product.target}</p>
          
          <h4>主要成分</h4>
          <ul className="ingredient-list">
            {product.ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </div>
        
        <button className="btn btn-outline btn-full-width">加入詢問清單</button>
      </div>
    </div>
  );
};

export default ProductCard;
