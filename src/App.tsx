import { useState } from 'react';
import './styles/global.css';
import SeatFinder from './pages/SeatFinder';
import AvatarDecorator from './pages/AvatarDecorator';
import ProfileRegistration from './pages/ProfileRegistration';

function App() {
  const [currentPage, setCurrentPage] = useState('finder');

  const renderPage = () => {
    switch (currentPage) {
      case 'finder': return <SeatFinder />;
      case 'avatar': return <AvatarDecorator />;
      case 'profile': return <ProfileRegistration />;
      default: return <SeatFinder />;
    }
  };

  return (
    <>
      <div className="app-container">
        {renderPage()}
      </div>
      
      <nav className="bottom-nav">
        <button 
          className={`nav-item ${currentPage === 'finder' ? 'active' : ''}`}
          onClick={() => setCurrentPage('finder')}
        >
          <div className="icon-placeholder" />
          <span>좌석 찾기</span>
        </button>
        <button 
          className={`nav-item ${currentPage === 'avatar' ? 'active' : ''}`}
          onClick={() => setCurrentPage('avatar')}
        >
          <div className="icon-placeholder" />
          <span>내 정보</span>
        </button>
        <button 
          className={`nav-item ${currentPage === 'profile' ? 'active' : ''}`}
          onClick={() => setCurrentPage('profile')}
        >
          <div className="icon-placeholder" />
          <span>설정</span>
        </button>
      </nav>
    </>
  );
}

export default App;
