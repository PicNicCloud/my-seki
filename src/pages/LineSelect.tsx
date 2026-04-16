import React from 'react';
import { SUBWAY_LINES } from '../data/subwayData';
import './LineSelect.css';

interface LineSelectProps {
  onSelectLine: (lineId: number) => void;
  onBack: () => void;
}

const LineSelect: React.FC<LineSelectProps> = ({ onSelectLine, onBack }) => {
  return (
    <div className="line-select-page page-enter">
      <header className="page-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h2 className="page-title">호선 선택</h2>
        <div className="header-spacer" />
      </header>

      <div className="line-select-content">
        <div className="line-select-hero">
          <span className="hero-emoji">🚇</span>
          <h1 className="line-select-title">어떤 호선을<br />타고 계신가요?</h1>
          <p className="line-select-subtitle">탑승 중인 노선을 선택해주세요</p>
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
              <span className="line-card-count">{line.stations.length}개역</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LineSelect;
