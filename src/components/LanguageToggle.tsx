import React from 'react';
import { useI18n } from '../i18n';
import './LanguageToggle.css';

const LanguageToggle: React.FC = () => {
  const { lang, setLang } = useI18n();

  return (
    <button
      className="lang-toggle"
      onClick={() => setLang(lang === 'ko' ? 'ja' : 'ko')}
    >
      <span className={`lang-option ${lang === 'ko' ? 'active' : ''}`}>KR</span>
      <span className="lang-divider">/</span>
      <span className={`lang-option ${lang === 'ja' ? 'active' : ''}`}>JP</span>
    </button>
  );
};

export default LanguageToggle;
