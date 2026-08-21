import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import productsData from './data/products.json';
import './App.css';

function App() {
  // 依據系列分群產品
  const productCategories = productsData.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="app">
      <Navbar />
      <Hero />
      
      <main className="container" id="products">
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
