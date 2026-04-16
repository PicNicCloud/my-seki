import React, { useState } from 'react';
import type { SubwayLine, AvatarConfig, Country } from '../data/subwayData';
import { useI18n } from '../i18n';
import AvatarPreview from '../components/AvatarPreview';
import './SeatFinder.css';

interface MockUser {
  id: number;
  station: string;
  desc: string;
  avatar: AvatarConfig;
  time: string;
  stops: number;
}

interface SeatFinderProps {
  line: SubwayLine;
  country: Country;
  carNumber: number;
  destination: string;
  onChangeLine?: () => void;
}

const SeatFinder: React.FC<SeatFinderProps> = ({
  line,
  country,
  carNumber,
  destination,
  onChangeLine,
}) => {
  const { t } = useI18n();
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
      id: 1, station: nearbyStations[1] || destination,
      desc: t('mock.desc.1' as Parameters<typeof t>[0]),
      avatar: { expression: 'happy', skinColor: '#FFDCB5', hair: 'short', hairColor: '#2C2C2C', top: 'padding', topColor: '#C44030', bottom: 'jeans', accessory: 'backpack' },
      time: `1${t('finder.stopsAfter')}`, stops: 1,
    },
    {
      id: 2, station: nearbyStations[2] || destination,
      desc: t('mock.desc.2' as Parameters<typeof t>[0]),
      avatar: { expression: 'cool', skinColor: '#F5C6A0', hair: 'long', hairColor: '#5C3A1E', top: 'coat', topColor: '#E88CB5', bottom: 'slacks', accessory: 'bag' },
      time: `2${t('finder.stopsAfter')}`, stops: 2,
    },
    {
      id: 3, station: nearbyStations[3] || destination,
      desc: t('mock.desc.3' as Parameters<typeof t>[0]),
      avatar: { expression: 'chill', skinColor: '#E8AB8B', hair: 'curly', hairColor: '#D4A56A', top: 'hoodie', topColor: '#808080', bottom: 'jogger', accessory: 'headphones' },
      time: `3${t('finder.stopsAfter')}`, stops: 3,
    },
    {
      id: 4, station: nearbyStations[4] || destination,
      desc: t('mock.desc.4' as Parameters<typeof t>[0]),
      avatar: { expression: 'lovely', skinColor: '#FFDCB5', hair: 'tied', hairColor: '#2C2C2C', top: 'shirt', topColor: '#F5F5F5', bottom: 'skirt', accessory: 'glasses' },
      time: `4${t('finder.stopsAfter')}`, stops: 4,
    },
    {
      id: 5, station: nearbyStations[0] || destination,
      desc: t('mock.desc.5' as Parameters<typeof t>[0]),
      avatar: { expression: 'sleepy', skinColor: '#C68F6E', hair: 'buzz', hairColor: '#2C2C2C', top: 'cardigan', topColor: '#5B8C5A', bottom: 'jeans', accessory: 'scarf' },
      time: `1${t('finder.stopsAfter')}`, stops: 1,
    },
  ];

  const maxStops = Math.max(...MOCK_USERS.map((u) => u.stops));

  // Green(far) → Red(close) gradient via HSL interpolation
  const getProximityColor = (stops: number) => {
    const ratio = Math.min((stops - 1) / Math.max(maxStops - 1, 1), 1);
    const hue = Math.round(ratio * 120); // 0=red, 120=green
    return {
      backgroundColor: `hsl(${hue}, 70%, 95%)`,
      color: `hsl(${hue}, 65%, 42%)`,
    };
  };

  const sortedUsers = [...MOCK_USERS].sort((a, b) => a.stops - b.stops);

  return (
    <div className="seat-finder page-enter">
      <header className="finder-header">
        <div className="finder-line-info">
          <div className="line-badge" style={{ backgroundColor: line.color }}>
            {line.badge ?? line.id}
          </div>
          <span className="finder-line-text">
            {t(`${country === 'jp' ? 'line.jp.' : 'line.'}${line.id}` as Parameters<typeof t>[0])} {carNumber}{t('home.car')}
          </span>
          {onChangeLine && (
            <button className="change-line-btn" onClick={onChangeLine}>
              {t('finder.changeLine')}
            </button>
          )}
        </div>
        <h1 className="finder-station-title">{destination} {t('finder.direction')}</h1>
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
      {/* User List */}
      <div className="user-list">
        {sortedUsers.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-avatar-wrap">
              <AvatarPreview config={user.avatar} size={46} />
            </div>
            <div className="user-info">
              <div className="user-info-top">
                <span
                  className="proximity-dot"
                  style={{ backgroundColor: getProximityColor(user.stops).color }}
                />
              </div>
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
