import React from 'react';
import type { SubwayLine } from '../data/subwayData';
import './Waiting.css';

interface WaitingProps {
  line: SubwayLine;
  carNumber: number;
  destination: string;
  onCancel: () => void;
}

const Waiting: React.FC<WaitingProps> = ({
  line,
  carNumber,
  destination,
  onCancel,
}) => {
  return (
    <div className="waiting-page page-enter">
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
          빈 자리를<br />찾고 있어요
        </h1>
        <p className="waiting-subtitle">
          {destination} 방면 하차 예정자를 찾고 있습니다<br />
          발견되면 바로 알려드릴게요! 🍃
        </p>

        <div className="wait-info-card">
          <div className="wait-info-row">
            <span className="wait-info-label">노선</span>
            <div className="wait-info-value">
              <div
                className="line-badge"
                style={{ backgroundColor: line.color }}
              >
                {line.id}
              </div>
              <strong>{line.name}</strong>
            </div>
          </div>
          <div className="wait-info-divider" />
          <div className="wait-info-row">
            <span className="wait-info-label">칸</span>
            <strong className="wait-info-value">{carNumber}호차</strong>
          </div>
          <div className="wait-info-divider" />
          <div className="wait-info-row">
            <span className="wait-info-label">목적지</span>
            <strong className="wait-info-value">{destination}</strong>
          </div>
          <div className="wait-info-divider" />
          <div className="wait-info-row">
            <span className="wait-info-label">대기 인원</span>
            <strong className="wait-info-value wait-count">3명</strong>
          </div>
        </div>
      </div>

      <div className="waiting-footer">
        <button className="cancel-btn" onClick={onCancel}>
          대기 취소하기
        </button>
      </div>
    </div>
  );
};

export default Waiting;
