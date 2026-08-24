import React from 'react';
import { useStore } from '../store/useStore';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { compareList, toggleCompare, addToInquiry, inquiryList } = useStore();
  const isCompared = compareList.includes(product.id);
  const inInquiry = inquiryList.some(item => item.product.id === product.id);

  return (
    <div className="product-card glass-panel">
      <div className="product-image-wrapper">
        {product.image ? (
          <img src={product.image} alt={product.name} className="product-image" />
        ) : (
          <div className="product-image-placeholder">
            <span className="placeholder-brand">於美 au_beauty</span>
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
        
        <div className="product-actions">
          <button 
            className={`btn ${isCompared ? 'btn-primary' : 'btn-outline'} btn-half-width`}
            onClick={() => toggleCompare(product.id)}
          >
            {isCompared ? '已加入比較' : '加入比較'}
          </button>
          <button 
            className={`btn ${inInquiry ? 'btn-primary' : 'btn-outline'} btn-half-width`}
            onClick={() => addToInquiry(product)}
          >
            {inInquiry ? '已在詢問清單' : '詢問清單'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
