import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import productsData from './data/products.json';
import './App.css';

function App() {
  const [activeCategory, setActiveCategory] = useState('全部');

  // 取得所有分類（保持順序）
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

  // 篩選產品
  const filteredProducts = useMemo(() => {
    if (activeCategory === '全部') return productsData;
    return productsData.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  // 依分類分群
  const productCategories = useMemo(() => {
    return filteredProducts.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});
  }, [filteredProducts]);

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      
      <main className="container">
        <div className="product-count">
          共 <strong>{filteredProducts.length}</strong> 款產品
        </div>
        {Object.entries(productCategories).map(([category, products]) => (
          <section key={category} className="product-section animate-fade-in">
            <h2 className="section-title text-center text-gradient">{category}</h2>
            <div className="products-grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}

export default App;
