import React, { useState, useEffect, useRef } from 'react';
import type { SubwayLine, AvatarConfig, Country } from '../data/subwayData';
import { DEFAULT_AVATAR } from '../data/subwayData';
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
  myAvatar?: AvatarConfig;
}

const MOCK_MSG_KEYS = [
  'finder.mockMsg1',
  'finder.mockMsg2',
  'finder.mockMsg3',
  'finder.mockMsg4',
] as const;

interface AvatarPos {
  x: number;
  y: number;
}

const SEAT_ROWS_TOP = 5;
const SEAT_ROWS_BOT = 5;

function initPositions(count: number): AvatarPos[] {
  return Array.from({ length: count }, () => ({
    x: 14 + Math.random() * 68,
    y: 22 + Math.random() * 50,
  }));
}

const SeatFinder: React.FC<SeatFinderProps> = ({
  line,
  country,
  carNumber,
  destination,
  onChangeLine,
  myAvatar,
}) => {
  const { t } = useI18n();
  const [waitingIds, setWaitingIds] = useState<Set<number>>(new Set());
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const positionsRef = useRef<AvatarPos[] | null>(null);

  const [chatInput, setChatInput] = useState('');
  const [myBubble, setMyBubble] = useState('');
  const [mockBubbles, setMockBubbles] = useState<Record<number, string>>({});
  const myBubbleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [myPos, setMyPos] = useState<AvatarPos>({
    x: 42 + Math.random() * 16,
    y: 28 + Math.random() * 18,
  });
  const meAvatar = myAvatar ?? DEFAULT_AVATAR;
  const userIdsRef = useRef<number[]>([]);

  const toggleWait = (id: number) => {
    setWaitingIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getWaitCount = (id: number) => {
    const base = (id * 7 + 3) % 4;
    return base + (waitingIds.has(id) ? 1 : 0);
  };

  const destIdx = line.stations.indexOf(destination);
  const startIdx = Math.max(0, destIdx - 3);
  const progressStations = line.stations.slice(startIdx, startIdx + 6);
  const currentIdx = Math.min(2, destIdx);

  const nearbyStations = line.stations.slice(
    Math.max(0, destIdx - 2),
    destIdx + 4
  );

  const MOCK_USERS: MockUser[] = [
    {
      id: 1, station: nearbyStations[1] || destination,
      desc: t('mock.desc.1' as Parameters<typeof t>[0]),
      avatar: { expression: 'happy', skinColor: '#FFDCB5', hair: 'short', hairColor: '#2C2C2C', top: 'padding', topColor: '#C44030', bottom: 'jeans', bottomColor: '#4A6FA5', accessory: 'backpack' },
      time: `1${t('finder.stopsAfter')}`, stops: 1,
    },
    {
      id: 2, station: nearbyStations[2] || destination,
      desc: t('mock.desc.2' as Parameters<typeof t>[0]),
      avatar: { expression: 'cool', skinColor: '#F5C6A0', hair: 'long', hairColor: '#5C3A1E', top: 'coat', topColor: '#E88CB5', bottom: 'slacks', bottomColor: '#3D3D3D', accessory: 'bag' },
      time: `2${t('finder.stopsAfter')}`, stops: 2,
    },
    {
      id: 3, station: nearbyStations[3] || destination,
      desc: t('mock.desc.3' as Parameters<typeof t>[0]),
      avatar: { expression: 'chill', skinColor: '#E8AB8B', hair: 'curly', hairColor: '#D4A56A', top: 'hoodie', topColor: '#808080', bottom: 'jogger', bottomColor: '#3D3D3D', accessory: 'headphones' },
      time: `3${t('finder.stopsAfter')}`, stops: 3,
    },
    {
      id: 4, station: nearbyStations[4] || destination,
      desc: t('mock.desc.4' as Parameters<typeof t>[0]),
      avatar: { expression: 'lovely', skinColor: '#FFDCB5', hair: 'tied', hairColor: '#2C2C2C', top: 'shirt', topColor: '#F5F5F5', bottom: 'skirt', bottomColor: '#8B6B50', accessory: 'glasses' },
      time: `4${t('finder.stopsAfter')}`, stops: 4,
    },
    {
      id: 5, station: nearbyStations[0] || destination,
      desc: t('mock.desc.5' as Parameters<typeof t>[0]),
      avatar: { expression: 'sleepy', skinColor: '#C68F6E', hair: 'buzz', hairColor: '#2C2C2C', top: 'cardigan', topColor: '#5B8C5A', bottom: 'jeans', bottomColor: '#4A6FA5', accessory: 'scarf' },
      time: `1${t('finder.stopsAfter')}`, stops: 1,
    },
  ];

  const maxStops = Math.max(...MOCK_USERS.map((u) => u.stops));

  const getProximityColor = (stops: number) => {
    const ratio = Math.min((stops - 1) / Math.max(maxStops - 1, 1), 1);
    const hue = Math.round(ratio * 120);
    return `hsl(${hue}, 65%, 48%)`;
  };

  const getProximityBg = (stops: number) => {
    const ratio = Math.min((stops - 1) / Math.max(maxStops - 1, 1), 1);
    const hue = Math.round(ratio * 120);
    return `hsl(${hue}, 70%, 95%)`;
  };

  const sortedUsers = [...MOCK_USERS].sort((a, b) => a.stops - b.stops);
  userIdsRef.current = sortedUsers.map((u) => u.id);

  if (!positionsRef.current) {
    positionsRef.current = initPositions(sortedUsers.length);
  }
  const [positions, setPositions] = useState<AvatarPos[]>(positionsRef.current);

  const sendChat = () => {
    const text = chatInput.trim();
    if (!text) return;
    setMyBubble(text);
    setChatInput('');
    if (myBubbleTimer.current) clearTimeout(myBubbleTimer.current);
    myBubbleTimer.current = setTimeout(() => setMyBubble(''), 4000);
  };

  useEffect(() => {
    const drift = () => {
      setPositions((prev) =>
        prev.map((pos) => ({
          x: Math.max(10, Math.min(82, pos.x + (Math.random() - 0.5) * 12)),
          y: Math.max(20, Math.min(72, pos.y + (Math.random() - 0.5) * 12)),
        }))
      );
      setMyPos((prev) => ({
        x: Math.max(15, Math.min(80, prev.x + (Math.random() - 0.5) * 6)),
        y: Math.max(25, Math.min(68, prev.y + (Math.random() - 0.5) * 6)),
      }));
    };
    const id = setInterval(drift, 3200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const showBubble = () => {
      const ids = userIdsRef.current;
      if (!ids.length) return;
      const uid = ids[Math.floor(Math.random() * ids.length)];
      const key = MOCK_MSG_KEYS[Math.floor(Math.random() * MOCK_MSG_KEYS.length)];
      setMockBubbles((prev) => ({ ...prev, [uid]: key }));
      setTimeout(() => {
        setMockBubbles((prev) => {
          const next = { ...prev };
          delete next[uid];
          return next;
        });
      }, 3500);
    };
    const initial = setTimeout(showBubble, 2500);
    const interval = setInterval(showBubble, 7000);
    return () => { clearTimeout(initial); clearInterval(interval); };
  }, []);

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
      <div className="station-progress-wrap">
        <div className="station-progress">
          {progressStations.map((station, idx) => {
            const isActive = idx < currentIdx;
            const isCurrent = idx === currentIdx;
            return (
              <React.Fragment key={station}>
                {idx > 0 && (
                  <div
                    className={`progress-line ${isActive ? 'active' : ''}`}
                    style={isActive ? { backgroundColor: line.color } : undefined}
                  />
                )}
                <div className={`progress-node ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}>
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
      </div>

      {/* Subway Car Interior */}
      <div className="subway-car">
        {/* Car structure */}
        <div className="car-wall car-wall-top">
          {Array.from({ length: SEAT_ROWS_TOP }, (_, i) => (
            <div key={i} className="car-seat" />
          ))}
        </div>
        <div className="car-wall car-wall-bot">
          {Array.from({ length: SEAT_ROWS_BOT }, (_, i) => (
            <div key={i} className="car-seat" />
          ))}
        </div>

        <div className="car-door car-door-l">
          <div className="car-door-line" />
        </div>
        <div className="car-door car-door-r">
          <div className="car-door-line" />
        </div>

        <div className="car-pole car-pole-1" />
        <div className="car-pole car-pole-2" />

        <div className="car-handle-row">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="car-handle" />
          ))}
        </div>

        {/* Wandering avatars */}
        {sortedUsers.map((user, idx) => {
          const pos = positions[idx];
          const proxColor = getProximityColor(user.stops);
          const bubbleKey = mockBubbles[user.id];
          return (
            <button
              key={user.id}
              className="car-avatar"
              style={{
                left: `${pos?.x ?? 50}%`,
                top: `${pos?.y ?? 50}%`,
                '--prox-color': proxColor,
              } as React.CSSProperties}
              onClick={() => setSelectedUser(user)}
            >
              {bubbleKey && (
                <div className="speech-bubble" key={bubbleKey + user.id}>
                  {t(bubbleKey as Parameters<typeof t>[0])}
                </div>
              )}
              <div className="car-avatar-glow" />
              <AvatarPreview config={user.avatar} size={30} />
            </button>
          );
        })}

        {/* Me avatar */}
        <div
          className="car-avatar car-avatar-me"
          style={{
            left: `${myPos.x}%`,
            top: `${myPos.y}%`,
            '--prox-color': 'var(--primary-color)',
          } as React.CSSProperties}
        >
          {myBubble && (
            <div className="speech-bubble speech-bubble-me" key={myBubble}>
              {myBubble}
            </div>
          )}
          <AvatarPreview config={meAvatar} size={30} />
          <span className="car-me-tag">{t('finder.me' as Parameters<typeof t>[0])}</span>
        </div>

        <p className="car-hint">{t('finder.tapHint' as Parameters<typeof t>[0])}</p>
      </div>

      {/* User List */}
      <div className="user-list">
        {sortedUsers.map((user) => (
          <div
            key={user.id}
            className="user-card"
            onClick={() => setSelectedUser(user)}
          >
            <div className="user-avatar-wrap">
              <AvatarPreview config={user.avatar} size={46} />
            </div>
            <div className="user-info">
              <div className="user-info-top">
                <span
                  className="proximity-dot"
                  style={{ backgroundColor: getProximityColor(user.stops) }}
                />
              </div>
              <p className="user-desc">{user.desc}</p>
              {getWaitCount(user.id) > 0 && (
                <span className="wait-count-tag">{getWaitCount(user.id)}{t('finder.waitCount')}</span>
              )}
            </div>
            <button
              className={`wait-btn ${waitingIds.has(user.id) ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); toggleWait(user.id); }}
            >
              {waitingIds.has(user.id) ? t('finder.waiting') : t('finder.wait')}
            </button>
          </div>
        ))}
      </div>

      {/* Floating Chat Input */}
      <div className="chat-input-bar">
        <input
          className="chat-input"
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return;
            if (e.key === 'Enter') sendChat();
          }}
          placeholder={t('finder.chatPlaceholder' as Parameters<typeof t>[0])}
          maxLength={30}
        />
        <button className="chat-send-btn" onClick={sendChat} disabled={!chatInput.trim()}>
          {t('finder.chatSend' as Parameters<typeof t>[0])}
        </button>
      </div>

      {/* Detail Bottom Sheet */}
      {selectedUser && (
        <div className="detail-overlay" onClick={() => setSelectedUser(null)}>
          <div className="detail-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="detail-handle" />
            <div className="detail-body">
              <div className="detail-avatar-wrap">
                <AvatarPreview config={selectedUser.avatar} size={80} />
              </div>
              <div className="detail-info">
                <div className="detail-prox-row">
                  <span
                    className="detail-prox-badge"
                    style={{
                      backgroundColor: getProximityBg(selectedUser.stops),
                      color: getProximityColor(selectedUser.stops),
                    }}
                  >
                    {selectedUser.time}
                  </span>
                  {getWaitCount(selectedUser.id) > 0 && (
                    <span className="detail-wait-count">
                      {getWaitCount(selectedUser.id)}{t('finder.waitCount')}
                    </span>
                  )}
                </div>
                <p className="detail-desc">{selectedUser.desc}</p>
              </div>
            </div>
            <button
              className={`wait-btn detail-wait-btn ${waitingIds.has(selectedUser.id) ? 'active' : ''}`}
              onClick={() => toggleWait(selectedUser.id)}
            >
              {waitingIds.has(selectedUser.id) ? t('finder.waiting') : t('finder.wait')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatFinder;
