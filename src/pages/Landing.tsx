import React from 'react';
import './Landing.css';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="logo-container">
          <div className="subway-car">
            <div className="window"></div>
            <div className="window"></div>
            <div className="wheel"></div>
            <div className="wheel"></div>
          </div>
          <h1 className="app-title">지하철 <br/>자리의 주인</h1>
        </div>
        
        <p className="app-subtitle">
          내릴 사람을 미리 찾고<br/>
          포근하게 앉아서 가세요
        </p>

        <div className="illustration">
          <div className="cloud c1"></div>
          <div className="cloud c2"></div>
          <div className="character-silhouette"></div>
        </div>
      </div>

      <div className="landing-footer">
        <button className="start-btn" onClick={onStart}>
          기차 타기
        </button>
        <p className="login-link">이미 캐릭터가 있나요? <span>로그인</span></p>
      </div>
    </div>
  );
};

export default Landing;
