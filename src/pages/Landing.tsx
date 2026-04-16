import React from 'react';
import { useI18n } from '../i18n';
import './Landing.css';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const { t } = useI18n();

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
            {t('landing.title').split('\n').map((line, i) => (
              <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
            ))}
          </h1>
          <p className="app-subtitle">
            {t('landing.subtitle').split('\n').map((line, i) => (
              <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
            ))}
          </p>
        </div>
      </div>

      <div className="landing-footer">
        <button className="start-btn submit-btn green" onClick={onStart}>
          {t('landing.start')}
        </button>
        <p className="login-link">
          {t('landing.login')} <span>{t('landing.loginLink')}</span>
        </p>
      </div>
    </div>
  );
};

export default Landing;
