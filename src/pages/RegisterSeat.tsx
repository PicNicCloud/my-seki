import React, { useState } from 'react';
import { getAvatarDescription } from '../data/subwayData';
import type { SubwayLine, AvatarConfig, Country } from '../data/subwayData';
import { useI18n } from '../i18n';
import AvatarPreview from '../components/AvatarPreview';
import './RegisterSeat.css';

interface RegisterSeatProps {
  line: SubwayLine;
  country: Country;
  carNumber: number;
  avatar: AvatarConfig;
  onComplete: (station: string) => void;
  onBack: () => void;
}

const RegisterSeat: React.FC<RegisterSeatProps> = ({
  line,
  country,
  carNumber,
  avatar,
  onComplete,
  onBack,
}) => {
  const { t } = useI18n();
  const [destination, setDestination] = useState('');
  const desc = getAvatarDescription(avatar, (id) => t(`item.${id}` as Parameters<typeof t>[0]));

  return (
    <div className="register-seat page-enter">
      <header className="page-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h2 className="page-title">{t('register.title')}</h2>
        <div className="header-spacer" />
      </header>

      <div className="register-content">
        <div className="car-info-banner">
          <div
            className="line-badge"
            style={{ backgroundColor: line.color }}
          >
            {line.id}
          </div>
          <div className="car-info-text">
            <strong>{t(`${country === 'jp' ? 'line.jp.' : 'line.'}${line.id}` as Parameters<typeof t>[0])} {carNumber}{t('home.car')}</strong>
            <span>{t('register.riding')}</span>
          </div>
        </div>

        <section className="station-select-section">
          <h3 className="section-title">{t('register.where')}</h3>
          <div className="station-list">
            {line.stations.map((s) => (
              <button
                key={s}
                className={`station-chip ${destination === s ? 'active' : ''}`}
                style={
                  destination === s
                    ? { backgroundColor: line.color, borderColor: line.color }
                    : undefined
                }
                onClick={() => setDestination(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        <section className="outfit-confirm-section">
          <h3 className="section-title">{t('register.appearance')}</h3>
          <div className="outfit-preview-card">
            <div className="preview-avatar-wrap">
              <AvatarPreview config={avatar} size={50} />
            </div>
            <div className="outfit-details">
              <p className="outfit-desc">{desc || t('register.noOutfit')}</p>
            </div>
          </div>
        </section>
      </div>

      <div className="footer-btn-container">
        <button
          className={`submit-btn ${!destination ? 'disabled' : ''}`}
          onClick={() => destination && onComplete(destination)}
          disabled={!destination}
        >
          {destination
            ? `${destination}${t('register.confirm')}`
            : t('register.placeholder')}
        </button>
      </div>
    </div>
  );
};

export default RegisterSeat;
