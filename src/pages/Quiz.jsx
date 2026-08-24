import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import productsData from '../data/products.json';
import './Quiz.css';

const questions = [
  {
    id: 1,
    title: "洗完臉後，您通常的感受是？",
    options: [
      { text: "經常覺得緊繃乾澀", type: "dry", icon: "🌵" },
      { text: "T字部位容易出油", type: "mixed", icon: "⚖️" },
      { text: "全臉都容易泛油光", type: "oily", icon: "🪔" },
      { text: "容易泛紅或刺痛", type: "sensitive", icon: "🌸" }
    ]
  },
  {
    id: 2,
    title: "目前最想優先改善的肌膚困擾是？",
    options: [
      { text: "乾燥脫皮、缺水", effect: "hydration", icon: "💧" },
      { text: "細紋、鬆弛老化", effect: "anti-aging", icon: "⏳" },
      { text: "暗沉蠟黃、斑點", effect: "brightening", icon: "✨" },
      { text: "粉刺痘痘、毛孔粗大", effect: "acne", icon: "🔍" }
    ]
  },
  {
    id: 3,
    title: "您偏好的保養物質地是？",
    options: [
      { text: "清爽好吸收 (水狀/凝膠)", texture: "light", icon: "🍃" },
      { text: "滋潤包覆感 (乳液/乳霜)", texture: "rich", icon: "🍯" },
      { text: "針對性強效 (安瓶/精華油)", texture: "intense", icon: "🧪" }
    ]
  }
];

const Quiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const { addToInquiry } = useStore();
  const navigate = useNavigate();

  const handleSelect = (option) => {
    const newAnswers = { ...answers, [step]: option };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    // 簡單的推薦演算法
    const skinType = finalAnswers[0].type;
    const effect = finalAnswers[1].effect;
    
    let recommended = [];
    
    // 尋找符合標籤的產品 (這只是一個簡易範例演算法)
    if (effect === 'hydration') {
      recommended = productsData.filter(p => p.category.includes('化妝水') || p.category.includes('面膜')).slice(0, 3);
    } else if (effect === 'anti-aging') {
      recommended = productsData.filter(p => p.name.includes('蜂萃') || p.name.includes('金鑽') || p.name.includes('魚子')).slice(0, 3);
    } else if (effect === 'brightening') {
      recommended = productsData.filter(p => p.name.includes('煥白') || p.name.includes('晶亮') || p.name.includes('無瑕')).slice(0, 3);
    } else if (effect === 'acne') {
      recommended = productsData.filter(p => p.category.includes('痘痘') || p.name.includes('泥膜')).slice(0, 3);
    }
    
    // 如果找不到，給個預設
    if (recommended.length === 0) {
      recommended = productsData.slice(0, 3);
    }
    
    setTimeout(() => {
      setResults(recommended);
      setStep(step + 1);
    }, 600);
  };

  const addAllToInquiry = () => {
    results.forEach(product => addToInquiry(product));
    alert("已全部加入詢問清單！");
    navigate('/products'); // 或跳轉到 inquiry 頁
  };

  return (
    <div className="quiz-page container animate-fade-in">
      <div className="quiz-header text-center">
        <h1 className="text-gradient">探索您的專屬保養</h1>
        <p>只需 3 個問題，為您找出最適合的醫美級保養方案</p>
      </div>

      <div className="quiz-container">
        {step < questions.length ? (
          <div className="quiz-card glass-panel">
            <div className="quiz-progress">
              <span>Question {step + 1} of {questions.length}</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${((step + 1) / questions.length) * 100}%` }}></div>
              </div>
            </div>
            
            <h2 className="question-title">{questions[step].title}</h2>
            
            <div className="options-grid">
              {questions[step].options.map((option, idx) => (
                <button 
                  key={idx} 
                  className={`option-btn ${answers[step]?.text === option.text ? 'selected' : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-text">{option.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="quiz-results animate-fade-in">
            <div className="text-center mb-2">
              <span className="result-icon">✨</span>
              <h2 className="text-gradient">您的專屬保養配方</h2>
              <p>根據您的測驗結果，我們為您推薦以下組合：</p>
            </div>
            
            <div className="recommended-grid">
              {results?.map(product => (
                <div key={product.id} className="recommended-card glass-panel">
                  <img src={product.image} alt={product.name} />
                  <h4>{product.name}</h4>
                  <span>{product.priceDisplay}</span>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-3">
              <button className="btn btn-primary btn-large" onClick={addAllToInquiry}>
                一鍵加入詢問清單
              </button>
              <button className="btn btn-outline ml-1" onClick={() => {setStep(0); setAnswers({});}}>
                重新測驗
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
