import React, { useState } from 'react';
import type { SubwayLine, Country } from '../data/subwayData';
import { useI18n } from '../i18n';
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
  country: Country;
  carNumber: number;
  destination: string;
}

const SeatFinder: React.FC<SeatFinderProps> = ({
  line,
  country,
  carNumber,
  destination,
}) => {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState('all');
  const [waitingIds, setWaitingIds] = useState<Set<number>>(new Set());

  const toggleWait = (id: number) => {
    setWaitingIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Mock wait counts (random 0~3 per user, + 1 if current user is waiting)
  const getWaitCount = (id: number) => {
    const base = (id * 7 + 3) % 4; // deterministic pseudo-random 0~3
    return base + (waitingIds.has(id) ? 1 : 0);
  };

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
      desc: t('mock.desc.1'),
      emoji: '😊',
      time: `1${t('finder.stopsAfter')}`,
      stops: 1,
    },
    {
      id: 2,
      station: nearbyStations[2] || destination,
      desc: t('mock.desc.2'),
      emoji: '😎',
      time: `2${t('finder.stopsAfter')}`,
      stops: 2,
    },
    {
      id: 3,
      station: nearbyStations[3] || destination,
      desc: t('mock.desc.3'),
      emoji: '😌',
      time: `3${t('finder.stopsAfter')}`,
      stops: 3,
    },
    {
      id: 4,
      station: nearbyStations[4] || destination,
      desc: t('mock.desc.4'),
      emoji: '🥰',
      time: `4${t('finder.stopsAfter')}`,
      stops: 4,
    },
    {
      id: 5,
      station: nearbyStations[0] || destination,
      desc: t('mock.desc.5'),
      emoji: '😴',
      time: `1${t('finder.stopsAfter')}`,
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
    { key: 'all', label: `${t('finder.all')} ${MOCK_USERS.length}` },
    {
      key: 'near',
      label: `${t('finder.near')} ${MOCK_USERS.filter((u) => u.stops <= 2).length}`,
    },
    {
      key: 'far',
      label: `${t('finder.far')} ${MOCK_USERS.filter((u) => u.stops >= 3).length}`,
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
            {t(`${country === 'jp' ? 'line.jp.' : 'line.'}${line.id}` as Parameters<typeof t>[0])} {carNumber}{t('home.car')}
          </span>
        </div>
        <h1 className="finder-station-title">{destination} {t('finder.direction')} 🚃</h1>
        <p className="finder-count">
          {t('finder.registered')} <strong>{MOCK_USERS.length}{t('finder.count')}</strong>
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
        <span>{t('finder.sortLabel')}</span>
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
                  {user.time} {t('finder.exit')}
                </span>
              </div>
              <h3 className="user-station">{user.station}</h3>
              <p className="user-desc">{user.desc}</p>
              {getWaitCount(user.id) > 0 && (
                <span className="wait-count-tag">{getWaitCount(user.id)}{t('finder.waitCount')}</span>
              )}
            </div>
            <button
              className={`wait-btn ${waitingIds.has(user.id) ? 'active' : ''}`}
              onClick={() => toggleWait(user.id)}
            >
              {waitingIds.has(user.id) ? t('finder.waiting') : t('finder.wait')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatFinder;
