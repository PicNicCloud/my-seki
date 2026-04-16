import React, { useState } from 'react';
import { useI18n } from '../i18n';
import './Login.css';

interface LoginProps {
  onSuccess: () => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess, onBack }) => {
  const { t } = useI18n();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (id === 'myseki' && pw === '0000') {
      setError(false);
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="login-page page-enter">
      <header className="page-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h2 className="page-title">{t('login.title')}</h2>
        <div className="header-spacer" />
      </header>

      <div className="login-content">
        <div className="login-hero">
          <div className="login-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg></div>
        </div>

        <div className="login-form">
          <div className="form-group">
            <label className="form-label">{t('login.id')}</label>
            <input
              type="text"
              className="form-input"
              placeholder={t('login.idPlaceholder')}
              value={id}
              onChange={(e) => { setId(e.target.value); setError(false); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t('login.password')}</label>
            <input
              type="password"
              className="form-input"
              placeholder={t('login.pwPlaceholder')}
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          {error && (
            <p className="login-error">{t('login.error')}</p>
          )}
        </div>
      </div>

      <div className="footer-btn-container">
        <button
          className={`submit-btn ${!id || !pw ? 'disabled' : ''}`}
          onClick={handleSubmit}
          disabled={!id || !pw}
        >
          {t('login.submit')}
        </button>
      </div>
    </div>
  );
};

export default Login;
