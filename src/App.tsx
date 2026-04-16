import { useState } from 'react';
import './styles/global.css';
import { DEFAULT_AVATAR, getSubwayLines } from './data/subwayData';
import type { AvatarConfig, Country } from './data/subwayData';
import { I18nProvider, useI18n } from './i18n';
import LanguageToggle from './components/LanguageToggle';
import Landing from './pages/Landing';
import CountrySelect from './pages/CountrySelect';
import LineSelect from './pages/LineSelect';
import Home from './pages/Home';
import AvatarDecorator from './pages/AvatarDecorator';
import RegisterSeat from './pages/RegisterSeat';
import SeatFinder from './pages/SeatFinder';
import Login from './pages/Login';
import ProfileRegistration from './pages/ProfileRegistration';

type Page =
  | 'landing'
  | 'countrySelect'
  | 'login'
  | 'lineSelect'
  | 'home'
  | 'avatar'
  | 'register'
  | 'finder'
  | 'profile';

function AppContent() {
  const { t, setLang } = useI18n();
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  // country = 지하철 데이터 (KR노선 vs JP노선), lang toggle과 독립
  const [country, setCountry] = useState<Country>('kr');
  const [selectedLineId, setSelectedLineId] = useState<number>(2);
  const [selectedCar, setSelectedCar] = useState<number>(1);
  const [destination, setDestination] = useState<string>('');
  const [avatar, setAvatar] = useState<AvatarConfig>(DEFAULT_AVATAR);

  const subwayLines = getSubwayLines(country);
  const selectedLine = subwayLines.find((l) => l.id === selectedLineId) ?? subwayLines[0];

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <Landing
            onStart={() => setCurrentPage('countrySelect')}
            onLogin={() => setCurrentPage('login')}
          />
        );
      case 'login':
        return (
          <Login
            onSuccess={() => setCurrentPage('countrySelect')}
            onBack={() => setCurrentPage('landing')}
          />
        );
      case 'countrySelect':
        return (
          <CountrySelect
            onSelect={(c) => {
              setCountry(c);
              setLang(c === 'jp' ? 'ja' : 'ko');
              setSelectedLineId(c === 'jp' ? 1 : 2);
              setCurrentPage('lineSelect');
            }}
            onBack={() => setCurrentPage('landing')}
          />
        );
      case 'lineSelect':
        return (
          <LineSelect
            country={country}
            onSelectLine={(lineId) => {
              setSelectedLineId(lineId);
              setCurrentPage('home');
            }}
            onBack={() => setCurrentPage('countrySelect')}
          />
        );
      case 'home':
        return (
          <Home
            line={selectedLine}
            country={country}
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
            country={country}
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
            country={country}
            carNumber={selectedCar}
            destination={destination}
            onChangeLine={() => setCurrentPage('lineSelect')}
          />
        );
      case 'profile':
        return (
          <ProfileRegistration avatar={avatar} />
        );
      default:
        return <Landing onStart={() => setCurrentPage('countrySelect')} onLogin={() => setCurrentPage('login')} />;
    }
  };

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
            <span className="nav-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 18v-4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M6 12V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4"/><line x1="4" y1="18" x2="20" y2="18"/></svg></span>
            <span>{t('nav.finder')}</span>
          </button>
          <button
            className={`nav-item ${currentPage === 'avatar' ? 'active' : ''}`}
            onClick={() => setCurrentPage('avatar')}
          >
            <span className="nav-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M5 20c0-4 3.5-7 7-7s7 3 7 7"/></svg></span>
            <span>{t('nav.avatar')}</span>
          </button>
          <button
            className={`nav-item ${currentPage === 'profile' ? 'active' : ''}`}
            onClick={() => setCurrentPage('profile')}
          >
            <span className="nav-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1.08 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1.08H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1.08z"/></svg></span>
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
