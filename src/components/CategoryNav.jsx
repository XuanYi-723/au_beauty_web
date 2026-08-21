import React from 'react';
import './CategoryNav.css';

const CategoryNav = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="category-nav-wrapper" id="products">
      <div className="container">
        <nav className="category-nav" aria-label="產品分類">
          <button
            className={`category-tab ${activeCategory === '全部' ? 'active' : ''}`}
            onClick={() => onCategoryChange('全部')}
          >
            全部
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CategoryNav;
