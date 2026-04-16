import React from 'react';
import './Landing.css';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="landing-page">
      <div className="landing-bg">
        <div className="cloud c1" />
        <div className="cloud c2" />
        <div className="cloud c3" />
        <div className="star s1">✦</div>
        <div className="star s2">✦</div>
        <div className="star s3">·</div>
      </div>

      <div className="landing-content">
        <div className="landing-illustration">
          <div className="train-wrapper">
            <div className="mini-train">
              <div className="train-body">
                <div className="train-face">
                  <span className="train-eye" />
                  <span className="train-eye" />
                  <span className="train-smile" />
                </div>
                <div className="train-windows">
                  <div className="train-win" />
                  <div className="train-win" />
                  <div className="train-win" />
                </div>
              </div>
              <div className="train-bottom">
                <div className="train-wheel" />
                <div className="train-wheel" />
                <div className="train-wheel" />
              </div>
            </div>
            <div className="train-track-line" />
          </div>
        </div>

        <div className="landing-text">
          <h1 className="app-title">
            지하철<br />자리의 주인
          </h1>
          <p className="app-subtitle">
            내릴 사람을 미리 찾고<br />
            포근하게 앉아서 가세요 🍃
          </p>
        </div>
      </div>

      <div className="landing-footer">
        <button className="start-btn submit-btn green" onClick={onStart}>
          🚃 기차 타기
        </button>
        <p className="login-link">
          이미 캐릭터가 있나요? <span>로그인</span>
        </p>
      </div>
    </div>
  );
};

export default Landing;
