import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="about">
      <div className="hero-background"></div>
      <div className="container hero-container animate-fade-in">
        <div className="hero-content glass-panel">
          <h1>Bio-Renewal</h1>
          <h2 className="text-gradient">專業醫學與科學的美麗結晶</h2>
          <p>
            結合皮膚專業醫學知識，善用皮膚科學研究，並運用高端生物科學技術，遵循肌膚分層保養觀念，所研發一系列有效改善各型皮膚問題的保養品。
          </p>
          <p>
            多年來長期與亞洲、歐洲、南美洲等多國研發實驗中心合作，為國內大眾醫美院所、專業美容美體SPA館，提供具有安全且高功效性的美容產品。
          </p>
          <div className="hero-actions">
            <a href="#products" className="btn btn-primary">探索產品</a>
            <button className="btn btn-outline">了解更多</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
