import React, { useState, useMemo } from 'react';
import CategoryNav from '../components/CategoryNav';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import { Search, SlidersHorizontal } from 'lucide-react';
import './Products.css';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const seen = new Set();
    return productsData
      .map(p => p.category)
      .filter(cat => {
        if (seen.has(cat)) return false;
        seen.add(cat);
        return true;
      });
  }, []);

  const filteredProducts = useMemo(() => {
    return productsData.filter(p => {
      const matchCategory = activeCategory === '全部' || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.target.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="products-page animate-fade-in">
      <div className="products-header">
        <h1 className="page-title text-gradient text-center">探索全系列產品</h1>
        <p className="text-center text-muted">為您的肌膚找到最純粹的保養解答</p>
      </div>

      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="container products-container">
        <div className="products-toolbar">
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="搜尋產品名稱或功效..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn btn-outline filter-btn">
            <SlidersHorizontal size={20} />
            進階篩選 (開發中)
          </button>
        </div>

        <div className="product-count">
          找到 <strong>{filteredProducts.length}</strong> 款產品
        </div>

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-results text-center">
              <h3>找不到符合條件的產品</h3>
              <p>請嘗試其他搜尋關鍵字或分類</p>
              <button className="btn btn-primary mt-2" onClick={() => {setSearchQuery(''); setActiveCategory('全部');}}>
                清除條件
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
