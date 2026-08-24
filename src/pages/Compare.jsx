import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import productsData from '../data/products.json';
import './Compare.css';

const Compare = () => {
  const { compareList, toggleCompare } = useStore();
  const navigate = useNavigate();

  const compareProducts = compareList.map(id => productsData.find(p => p.id === id));

  if (compareProducts.length === 0) {
    return (
      <div className="container empty-state">
        <h1 className="text-gradient">產品比較</h1>
        <p>您尚未選擇任何要比較的產品。</p>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>去挑選產品</button>
      </div>
    );
  }

  return (
    <div className="compare-page container animate-fade-in">
      <div className="page-header text-center">
        <h1 className="text-gradient">產品比較</h1>
        <p>深入了解產品差異，找出最適合您的保養方案</p>
      </div>

      <div className="compare-table-wrapper">
        <table className="compare-table">
          <thead>
            <tr>
              <th className="feature-col">產品特寫</th>
              {compareProducts.map(p => (
                <th key={p.id} className="product-col">
                  <div className="compare-header">
                    <button className="remove-btn" onClick={() => toggleCompare(p.id)}>×</button>
                    <img src={p.image} alt={p.name} className="compare-img" />
                    <h3>{p.name}</h3>
                    <span className="compare-price">{p.priceDisplay}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="feature-col">所屬系列</td>
              {compareProducts.map(p => <td key={p.id} className="text-center"><span className="meta-tag">{p.category}</span></td>)}
            </tr>
            <tr>
              <td className="feature-col">容量</td>
              {compareProducts.map(p => <td key={p.id} className="text-center">{p.volume}</td>)}
            </tr>
            <tr>
              <td className="feature-col">適用對象</td>
              {compareProducts.map(p => <td key={p.id}>{p.target}</td>)}
            </tr>
            <tr>
              <td className="feature-col">產品描述</td>
              {compareProducts.map(p => <td key={p.id} className="desc-cell">{p.description}</td>)}
            </tr>
            <tr>
              <td className="feature-col">主要成分</td>
              {compareProducts.map(p => (
                <td key={p.id}>
                  <ul className="ingredient-list">
                    {p.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Compare;
