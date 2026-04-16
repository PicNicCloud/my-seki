import { useState } from 'react';
import './styles/global.css';
import { SUBWAY_LINES, DEFAULT_AVATAR } from './data/subwayData';
import type { AvatarConfig } from './data/subwayData';
import { I18nProvider, useI18n } from './i18n';
import LanguageToggle from './components/LanguageToggle';
import Landing from './pages/Landing';
import LineSelect from './pages/LineSelect';
import Home from './pages/Home';
import AvatarDecorator from './pages/AvatarDecorator';
import RegisterSeat from './pages/RegisterSeat';
import SeatFinder from './pages/SeatFinder';
import Waiting from './pages/Waiting';
import ProfileRegistration from './pages/ProfileRegistration';

type Page =
  | 'landing'
  | 'lineSelect'
  | 'home'
  | 'avatar'
  | 'register'
  | 'finder'
  | 'waiting'
  | 'profile';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [selectedLineId, setSelectedLineId] = useState<number>(2);
  const [selectedCar, setSelectedCar] = useState<number>(1);
  const [destination, setDestination] = useState<string>('');
  const [avatar, setAvatar] = useState<AvatarConfig>(DEFAULT_AVATAR);

  const selectedLine = SUBWAY_LINES.find((l) => l.id === selectedLineId) ?? SUBWAY_LINES[1];

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <Landing onStart={() => setCurrentPage('lineSelect')} />
        );
      case 'lineSelect':
        return (
          <LineSelect
            onSelectLine={(lineId) => {
              setSelectedLineId(lineId);
              setCurrentPage('home');
            }}
            onBack={() => setCurrentPage('landing')}
          />
        );
      case 'home':
        return (
          <Home
            line={selectedLine}
            onSelectCar={(car) => {
              setSelectedCar(car);
              setCurrentPage('avatar');
            }}
            onBack={() => setCurrentPage('lineSelect')}
          />
        );
      case 'avatar':
        return (
          <AvatarDecorator
            avatar={avatar}
            onUpdateAvatar={setAvatar}
            onComplete={() => setCurrentPage('register')}
            onBack={() => setCurrentPage('home')}
            showBack={true}
          />
        );
      case 'register':
        return (
          <RegisterSeat
            line={selectedLine}
            carNumber={selectedCar}
            avatar={avatar}
            onComplete={(station) => {
              setDestination(station);
              setCurrentPage('finder');
            }}
            onBack={() => setCurrentPage('avatar')}
          />
        );
      case 'finder':
        return (
          <SeatFinder
            line={selectedLine}
            carNumber={selectedCar}
            destination={destination}
            onWait={() => setCurrentPage('waiting')}
          />
        );
      case 'waiting':
        return (
          <Waiting
            line={selectedLine}
            carNumber={selectedCar}
            destination={destination}
            onCancel={() => setCurrentPage('finder')}
          />
        );
      case 'profile':
        return (
          <ProfileRegistration avatar={avatar} />
        );
      default:
        return <Landing onStart={() => setCurrentPage('lineSelect')} />;
    }
  };

  const { t } = useI18n();
  const showBottomNav = ['finder', 'avatar', 'profile'].includes(currentPage);

  return (
    <>
      <LanguageToggle />
      <div className={`app-container ${showBottomNav ? 'has-nav' : ''}`}>
        {renderPage()}
      </div>

      {showBottomNav && (
        <nav className="bottom-nav">
          <button
            className={`nav-item ${currentPage === 'finder' ? 'active' : ''}`}
            onClick={() => setCurrentPage('finder')}
          >
            <span className="nav-icon">🪑</span>
            <span>{t('nav.finder')}</span>
          </button>
          <button
            className={`nav-item ${currentPage === 'avatar' ? 'active' : ''}`}
            onClick={() => setCurrentPage('avatar')}
          >
            <span className="nav-icon">🧑</span>
            <span>{t('nav.avatar')}</span>
          </button>
          <button
            className={`nav-item ${currentPage === 'profile' ? 'active' : ''}`}
            onClick={() => setCurrentPage('profile')}
          >
            <span className="nav-icon">⚙️</span>
            <span>{t('nav.settings')}</span>
          </button>
        </nav>
      )}
    </>
  );
}

function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}

export default App;
