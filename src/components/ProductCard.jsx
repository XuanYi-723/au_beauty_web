import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card glass-panel">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <div className="product-header">
          <h3 className="product-name">{product.name}</h3>
          <span className="product-price">NT$ {product.price}</span>
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
