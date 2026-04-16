import React from 'react';
import type { SubwayLine } from '../data/subwayData';
import { useI18n } from '../i18n';
import './Home.css';

interface HomeProps {
  line: SubwayLine;
  onSelectCar: (carNumber: number) => void;
  onBack: () => void;
}

const Home: React.FC<HomeProps> = ({ line, onSelectCar, onBack }) => {
  const { t } = useI18n();
  const cars = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="home-page page-enter">
      <header className="page-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h2 className="page-title">{t('home.title')}</h2>
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
          <h1 className="home-title">
            {(line.name + t('home.heading')).split('\n').map((text, i) => (
              <React.Fragment key={i}>{i > 0 && <br />}{text}</React.Fragment>
            ))}
          </h1>
          <p className="home-subtitle">{t('home.subtitle')}</p>
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
              <div className="car-label">{num}{t('home.car')}</div>
            </button>
          ))}
        </div>

        <div className="info-box">
          <p>{t('home.info')}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;