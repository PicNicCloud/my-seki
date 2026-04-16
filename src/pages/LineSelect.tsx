import React from 'react';
import { SUBWAY_LINES } from '../data/subwayData';
import { useI18n } from '../i18n';
import './LineSelect.css';

interface LineSelectProps {
  onSelectLine: (lineId: number) => void;
  onBack: () => void;
}

const LineSelect: React.FC<LineSelectProps> = ({ onSelectLine, onBack }) => {
  const { t } = useI18n();

  return (
    <div className="line-select-page page-enter">
      <header className="page-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h2 className="page-title">{t('lineSelect.title')}</h2>
        <div className="header-spacer" />
      </header>

      <div className="line-select-content">
        <div className="line-select-hero">
          <span className="hero-emoji">🚇</span>
          <h1 className="line-select-title">
            {t('lineSelect.heading').split('\n').map((line, i) => (
              <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
            ))}
          </h1>
          <p className="line-select-subtitle">{t('lineSelect.subtitle')}</p>
        </div>

        <div className="lines-grid">
          {SUBWAY_LINES.map((line) => (
            <button
              key={line.id}
              className="line-card"
              onClick={() => onSelectLine(line.id)}
            >
              <div
                className="line-card-badge"
                style={{ backgroundColor: line.color }}
              >
                {line.id}
              </div>
              <span className="line-card-name">{line.name}</span>
              <span className="line-card-count">{line.stations.length}{t('lineSelect.stationCount')}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LineSelect;