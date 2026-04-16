import React from 'react';
import type { SubwayLine, Country } from '../data/subwayData';
import { useI18n } from '../i18n';
import './Waiting.css';

interface WaitingProps {
  line: SubwayLine;
  country: Country;
  carNumber: number;
  destination: string;
  onCancel: () => void;
}

const Waiting: React.FC<WaitingProps> = ({
  line,
  country,
  carNumber,
  destination,
  onCancel,
}) => {
  const { t } = useI18n();

  return (
    <div className="waiting-page page-enter">
      <header className="page-header">
        <button className="back-btn" onClick={onCancel}>←</button>
        <div className="header-spacer" />
        <div className="header-spacer" />
      </header>
      <div className="waiting-content">
        <div className="waiting-animation">
          <div className="waiting-train">
            <span className="waiting-emoji">🚃</span>
          </div>
          <div className="waiting-dots">
            <div className="w-dot" />
            <div className="w-dot" />
            <div className="w-dot" />
          </div>
        </div>

        <h1 className="waiting-title">
          {t('waiting.title').split('\n').map((text, i) => (
            <React.Fragment key={i}>{i > 0 && <br />}{text}</React.Fragment>
          ))}
        </h1>
        <p className="waiting-subtitle">
          {destination}{t('waiting.subtitle1')}<br />
          {t('waiting.subtitle2')}
        </p>

        <div className="wait-info-card">
          <div className="wait-info-row">
            <span className="wait-info-label">{t('waiting.route')}</span>
            <div className="wait-info-value">
              <div
                className="line-badge"
                style={{ backgroundColor: line.color }}
              >
                {line.id}
              </div>
              <strong>{t(`${country === 'jp' ? 'line.jp.' : 'line.'}${line.id}` as Parameters<typeof t>[0])}</strong>
            </div>
          </div>
          <div className="wait-info-divider" />
          <div className="wait-info-row">
            <span className="wait-info-label">{t('waiting.car')}</span>
            <strong className="wait-info-value">{carNumber}{t('home.car')}</strong>
          </div>
          <div className="wait-info-divider" />
          <div className="wait-info-row">
            <span className="wait-info-label">{t('waiting.dest')}</span>
            <strong className="wait-info-value">{destination}</strong>
          </div>
          <div className="wait-info-divider" />
          <div className="wait-info-row">
            <span className="wait-info-label">{t('waiting.waitCount')}</span>
            <strong className="wait-info-value wait-count">3{t('waiting.people')}</strong>
          </div>
        </div>
      </div>

      <div className="waiting-footer">
        <button className="cancel-btn" onClick={onCancel}>
          {t('waiting.cancel')}
        </button>
      </div>
    </div>
  );
};

export default Waiting;
