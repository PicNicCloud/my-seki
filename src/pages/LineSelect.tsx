import React from 'react';
import { getSubwayLines } from '../data/subwayData';
import type { Country } from '../data/subwayData';
import { useI18n } from '../i18n';
import './LineSelect.css';

interface LineSelectProps {
  country: Country;
  onSelectLine: (lineId: number) => void;
  onBack: () => void;
}

const LineSelect: React.FC<LineSelectProps> = ({ country, onSelectLine, onBack }) => {
  const { t } = useI18n();
  const lines = getSubwayLines(country);
  const lineKeyPrefix = country === 'jp' ? 'line.jp.' : 'line.';

  return (
    <div className="line-select-page page-enter">
      <header className="page-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h2 className="page-title">{t('lineSelect.title')}</h2>
        <div className="header-spacer" />
      </header>

      <div className="line-select-content">
        <div className="line-select-hero">
          <span className="hero-emoji"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="14" rx="3"/><path d="M4 11h16"/><circle cx="8.5" cy="20" r="1.5"/><circle cx="15.5" cy="20" r="1.5"/><path d="M7 17l-1.5 3M17 17l1.5 3"/></svg></span>
          <h1 className="line-select-title">
            {t('lineSelect.heading').split('\n').map((line, i) => (
              <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
            ))}
          </h1>
          <p className="line-select-subtitle">{t('lineSelect.subtitle')}</p>
        </div>

        <div className="lines-grid">
          {lines.map((line) => (
            <button
              key={line.id}
              className="line-card"
              onClick={() => onSelectLine(line.id)}
            >
              <div
                className="line-card-badge"
                style={{ backgroundColor: line.color }}
              >
                {line.badge ?? line.id}
              </div>
              <span className="line-card-name">{t(`${lineKeyPrefix}${line.id}` as Parameters<typeof t>[0])}</span>
              <span className="line-card-count">{line.stations.length}{t('lineSelect.stationCount')}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LineSelect;
