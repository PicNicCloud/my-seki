import React from 'react';
import './AvatarDecorator.css';

const AvatarDecorator: React.FC = () => {
  return (
    <div className="avatar-decorator">
      <header className="page-header">
        <button className="back-btn">{'<'}</button>
        <h2 className="page-title">아바타 꾸미기</h2>
        <div style={{ width: 24 }}></div>
      </header>

      <div className="tab-container">
        <button className="tab active">직접 꾸미기</button>
        <button className="tab">AI 생성</button>
      </div>

      <div className="avatar-preview">
        <div className="avatar-circle-main">
          {/* Avatar representation using CSS */}
          <div className="face">
            <div className="eyes">
              <div className="eye"></div>
              <div className="eye"></div>
            </div>
            <div className="blush"></div>
            <div className="mouth"></div>
          </div>
        </div>
      </div>

      <div className="customization-panel">
        <nav className="category-nav">
          <div className="category-item active">얼굴</div>
          <div className="category-item">헤어</div>
          <div className="category-item">상의</div>
          <div className="category-item">하의</div>
          <div className="category-item">신발</div>
          <div className="category-item">악세서리</div>
        </nav>

        <div className="item-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className={`grid-item ${i === 5 ? 'selected' : ''}`}>
              <div className="item-preview"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-btn-container">
        <button className="submit-btn">완료</button>
      </div>
    </div>
  );
};

export default AvatarDecorator;
