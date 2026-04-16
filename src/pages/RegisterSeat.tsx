import React, { useState } from 'react';
import { getAvatarDescription, getAvatarEmoji } from '../data/subwayData';
import type { SubwayLine, AvatarConfig } from '../data/subwayData';
import './RegisterSeat.css';

interface RegisterSeatProps {
  line: SubwayLine;
  carNumber: number;
  avatar: AvatarConfig;
  onComplete: (station: string) => void;
  onBack: () => void;
}

const RegisterSeat: React.FC<RegisterSeatProps> = ({
  line,
  carNumber,
  avatar,
  onComplete,
  onBack,
}) => {
  const [destination, setDestination] = useState('');
  const desc = getAvatarDescription(avatar);
  const emoji = getAvatarEmoji(avatar);

  return (
    <div className="register-seat page-enter">
      <header className="page-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h2 className="page-title">내릴 역 등록</h2>
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
            <strong>{line.name} {carNumber}호차</strong>
            <span>에 타고 계시군요!</span>
          </div>
        </div>

        <section className="station-select-section">
          <h3 className="section-title">어디에서 내리시나요? 🚏</h3>
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
          <h3 className="section-title">다른 사람에게 보이는 내 모습</h3>
          <div className="outfit-preview-card">
            <div className="preview-avatar">
              <span>{emoji}</span>
            </div>
            <div className="outfit-details">
              <p className="outfit-desc">{desc || '아직 설정하지 않았어요'}</p>
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
            ? `${destination}에서 내릴게요!`
            : '내릴 역을 선택해주세요'}
        </button>
      </div>
    </div>
  );
};

export default RegisterSeat;
