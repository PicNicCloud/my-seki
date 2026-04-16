import React from 'react';
import type { SubwayLine } from '../data/subwayData';
import './Home.css';

interface HomeProps {
  line: SubwayLine;
  onSelectCar: (carNumber: number) => void;
  onBack: () => void;
}

const Home: React.FC<HomeProps> = ({ line, onSelectCar, onBack }) => {
  const cars = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="home-page page-enter">
      <header className="page-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h2 className="page-title">칸 선택</h2>
        <div className="header-spacer" />
      </header>

      <div className="home-content">
        <div className="home-hero">
          <div
            className="line-badge-large"
            style={{ backgroundColor: line.color }}
          >
            {line.id}
          </div>
          <h1 className="home-title">{line.name} 어느 칸에<br />계신가요?</h1>
          <p className="home-subtitle">현재 탑승하신 칸을 선택해주세요</p>
        </div>

        <div className="cars-grid">
          {cars.map((num) => (
            <button
              key={num}
              className="car-button"
              onClick={() => onSelectCar(num)}
            >
              <div className="car-visual" style={{ borderBottomColor: line.color }}>
                <div className="car-window" />
                <div className="car-window" />
                <div className="car-window" />
              </div>
              <div className="car-label">{num}호차</div>
            </button>
          ))}
        </div>

        <div className="info-box">
          <p>🍃 칸을 선택하면 같은 칸에서 내릴 사람을 찾을 수 있어요</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
