import React, { useState } from 'react';
import type { SubwayLine } from '../data/subwayData';
import './SeatFinder.css';

interface MockUser {
  id: number;
  station: string;
  desc: string;
  emoji: string;
  time: string;
  stops: number;
}

interface SeatFinderProps {
  line: SubwayLine;
  carNumber: number;
  destination: string;
  onWait: () => void;
}

const SeatFinder: React.FC<SeatFinderProps> = ({
  line,
  carNumber,
  destination,
  onWait,
}) => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Build station progress around destination
  const destIdx = line.stations.indexOf(destination);
  const startIdx = Math.max(0, destIdx - 3);
  const progressStations = line.stations.slice(startIdx, startIdx + 6);
  const currentIdx = Math.min(2, destIdx);

  // Generate contextual mock users based on nearby stations
  const nearbyStations = line.stations.slice(
    Math.max(0, destIdx - 2),
    destIdx + 4
  );

  const MOCK_USERS: MockUser[] = [
    {
      id: 1,
      station: nearbyStations[1] || destination,
      desc: '빨간 자켓 · 백팩 · 짧은 머리',
      emoji: '😊',
      time: '1정거장 후',
      stops: 1,
    },
    {
      id: 2,
      station: nearbyStations[2] || destination,
      desc: '코랄 코트 · 긴 머리 · 가방',
      emoji: '😎',
      time: '2정거장 후',
      stops: 2,
    },
    {
      id: 3,
      station: nearbyStations[3] || destination,
      desc: '회색 후드 · 헤드폰 · 곱슬',
      emoji: '😌',
      time: '3정거장 후',
      stops: 3,
    },
    {
      id: 4,
      station: nearbyStations[4] || destination,
      desc: '검정 패딩 · 안경 · 슬랙스',
      emoji: '🥰',
      time: '4정거장 후',
      stops: 4,
    },
    {
      id: 5,
      station: nearbyStations[0] || destination,
      desc: '니트 · 청바지 · 목도리',
      emoji: '😴',
      time: '1정거장 후',
      stops: 1,
    },
  ];

  const filteredUsers =
    activeFilter === 'all'
      ? MOCK_USERS
      : activeFilter === 'near'
        ? MOCK_USERS.filter((u) => u.stops <= 2)
        : MOCK_USERS.filter((u) => u.stops >= 3);

  const filters = [
    { key: 'all', label: `전체 ${MOCK_USERS.length}` },
    {
      key: 'near',
      label: `1~2정거장 ${MOCK_USERS.filter((u) => u.stops <= 2).length}`,
    },
    {
      key: 'far',
      label: `3정거장+ ${MOCK_USERS.filter((u) => u.stops >= 3).length}`,
    },
  ];

  return (
    <div className="seat-finder page-enter">
      <header className="finder-header">
        <div className="finder-line-info">
          <div className="line-badge" style={{ backgroundColor: line.color }}>
            {line.id}
          </div>
          <span className="finder-line-text">
            {line.name} {carNumber}호차
          </span>
        </div>
        <h1 className="finder-station-title">{destination} 방면 🚃</h1>
        <p className="finder-count">
          이 칸에 등록된 좌석 <strong>{MOCK_USERS.length}개</strong>
        </p>
      </header>

      {/* Station Progress */}
      <div className="station-progress">
        {progressStations.map((station, idx) => {
          const isActive = idx < currentIdx;
          const isCurrent = idx === currentIdx;
          return (
            <React.Fragment key={station}>
              {idx > 0 && (
                <div
                  className={`progress-line ${isActive ? 'active' : ''}`}
                  style={
                    isActive
                      ? { backgroundColor: line.color }
                      : undefined
                  }
                />
              )}
              <div
                className={`progress-node ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}
              >
                <div
                  className="node-dot"
                  style={
                    isActive || isCurrent
                      ? { borderColor: line.color, backgroundColor: isCurrent ? 'white' : line.color }
                      : undefined
                  }
                />
                <span className="node-label">{station}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Filters */}
      <div className="filter-chips">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`chip ${activeFilter === f.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="sort-bar">
        <span>하차 예정이 빠른 순</span>
      </div>

      {/* User List */}
      <div className="user-list">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-avatar-circle">
              <span>{user.emoji}</span>
            </div>
            <div className="user-info">
              <div className="user-info-top">
                <span
                  className="time-tag"
                  style={{
                    backgroundColor: user.stops <= 1 ? '#FFF0F0' : user.stops <= 2 ? '#FFF8EC' : '#F0F4FF',
                    color: user.stops <= 1 ? '#FF7070' : user.stops <= 2 ? '#E09540' : '#7B9CFF',
                  }}
                >
                  {user.time} 하차
                </span>
              </div>
              <h3 className="user-station">{user.station}</h3>
              <p className="user-desc">{user.desc}</p>
            </div>
            <button className="wait-btn" onClick={onWait}>
              대기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatFinder;
