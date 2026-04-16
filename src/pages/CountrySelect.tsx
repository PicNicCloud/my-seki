import React from 'react';
import type { Country } from '../data/subwayData';
import { useI18n } from '../i18n';
import './CountrySelect.css';

interface CountrySelectProps {
  onSelect: (country: Country) => void;
  onBack: () => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ onSelect, onBack }) => {
  const { t, lang } = useI18n();

  return (
    <div className="country-select-page page-enter">
      <header className="page-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h2 className="page-title"> </h2>
        <div className="header-spacer" />
      </header>

      <div className="country-select-content">
        <div className="country-hero">
          <span className="country-hero-emoji"><svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></span>
          <h1 className="country-title">{t('countrySelect.title')}</h1>
          <p className="country-subtitle">
            {lang === 'ko' ? 'どこの地下鉄ですか？' : '어디 지하철인가요?'}
          </p>
        </div>

        <div className="country-cards">
          <button className="country-card" onClick={() => onSelect('kr')}>
            <span className="country-flag">🇰🇷</span>
            <div className="country-card-text">
              <strong className="country-name">한국</strong>
              <span className="country-name-sub">Korea</span>
            </div>
          </button>

          <button className="country-card" onClick={() => onSelect('jp')}>
            <span className="country-flag">🇯🇵</span>
            <div className="country-card-text">
              <strong className="country-name">日本</strong>
              <span className="country-name-sub">Japan</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountrySelect;
