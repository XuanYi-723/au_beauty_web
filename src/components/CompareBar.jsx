import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import productsData from '../data/products.json';
import './CompareBar.css';

const CompareBar = () => {
  const { compareList, clearCompare } = useStore();
  const navigate = useNavigate();

  if (compareList.length === 0) return null;

  const compareProducts = compareList.map(id => productsData.find(p => p.id === id));

  return (
    <div className="compare-bar-wrapper">
      <div className="compare-bar container">
        <div className="compare-info">
          <span>已選擇 <strong>{compareList.length}</strong> 項產品進行比較 (最多3項)</span>
          <div className="compare-thumbnails">
            {compareProducts.map(p => (
              <div key={p.id} className="compare-thumb">
                {p.image && <img src={p.image} alt={p.name} />}
                <span className="thumb-name">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="compare-actions">
          <button className="btn btn-outline" onClick={clearCompare}>清除</button>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/compare')}
            disabled={compareList.length < 2}
          >
            {compareList.length < 2 ? '請至少選擇 2 項' : '開始比較'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
