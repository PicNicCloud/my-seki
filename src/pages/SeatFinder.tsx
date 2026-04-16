import React from 'react';
import './SeatFinder.css';

const MOCK_USERS = [
  { id: 1, station: '강남역', desc: '빨간 자켓 · 백팩 · 짧은...', color: '#FF7070', time: '1정거장 후 하차' },
  { id: 2, station: '교대역', desc: '코랄 코트 · 긴 머리 · 숄...', color: '#FFA07A', time: '2정거장 후 하차' },
  { id: 3, station: '서초역', desc: '회색 후드 · 헤드폰 · 짧은...', color: '#A0A0A0', time: '3정거장 후 하차' },
];

const SeatFinder: React.FC = () => {
  return (
    <div className="seat-finder">
      <header className="header">
        <div className="line-info">
          <span className="line-badge">2</span>
          <span>2호선 외선순환</span>
        </div>
        <h1 className="station-title">역삼역 승차</h1>
        <p className="registered-count">이 칸에 등록된 좌석 5개</p>
      </header>

      <div className="station-progress">
        <div className="node active">선릉</div>
        <div className="line active"></div>
        <div className="node active">삼성</div>
        <div className="line active"></div>
        <div className="node current">역삼</div>
        <div className="line"></div>
        <div className="node">강남</div>
        <div className="line"></div>
        <div className="node">교대</div>
      </div>

      <div className="filter-chips">
        <button className="chip active">전체 5</button>
        <button className="chip">1~2정거장 2</button>
        <button className="chip">3정거장+ 3</button>
      </div>

      <div className="sort-bar">
        <span>하차 예정이 빠른 순</span>
        <span>↑ 정렬</span>
      </div>

      <div className="user-list">
        {MOCK_USERS.map(user => (
          <div key={user.id} className="user-card">
            <div className="avatar-circle" style={{ backgroundColor: user.color }}></div>
            <div className="user-info">
              <span className="time-tag">{user.time}</span>
              <h3 className="user-station">{user.station}</h3>
              <p className="user-desc">{user.desc}</p>
            </div>
            <button className="wait-btn">대기 등록</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatFinder;
