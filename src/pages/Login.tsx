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
          <div className="login-icon">🔑</div>
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
