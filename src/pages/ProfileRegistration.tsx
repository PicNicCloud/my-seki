import React, { useState } from 'react';
import { getAvatarEmoji, getAvatarDescription } from '../data/subwayData';
import type { AvatarConfig } from '../data/subwayData';
import './ProfileRegistration.css';

interface ProfileRegistrationProps {
  avatar: AvatarConfig;
  onBack?: () => void;
}

const ProfileRegistration: React.FC<ProfileRegistrationProps> = ({
  avatar,
  onBack,
}) => {
  const [nickname, setNickname] = useState('');
  const [features, setFeatures] = useState('');
  const emoji = getAvatarEmoji(avatar);
  const desc = getAvatarDescription(avatar);

  return (
    <div className="profile-registration page-enter">
      <header className="page-header">
        {onBack ? (
          <button className="back-btn" onClick={onBack}>←</button>
        ) : (
          <div className="header-spacer" />
        )}
        <h2 className="page-title">내 프로필</h2>
        <div className="header-spacer" />
      </header>

      <div className="profile-content">
        <section className="profile-avatar-section">
          <div className="profile-avatar-circle">
            <span>{emoji}</span>
          </div>
          <p className="profile-outfit-desc">{desc || '아바타를 꾸며보세요'}</p>
        </section>

        <section className="profile-form-section">
          <div className="form-group">
            <label className="form-label">닉네임</label>
            <input
              type="text"
              className="form-input"
              placeholder="닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">기타 특징</label>
            <input
              type="text"
              className="form-input"
              placeholder="예: 안경, 에어팟, 큰 가방"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
            />
            <p className="form-hint">
              정확한 인상착의는 다른 이용자가 자리를 찾는 데 도움이 돼요 🍃
            </p>
          </div>
        </section>

        <section className="profile-info-section">
          <div className="info-box">
            <p>
              이 정보는 같은 칸에 탄 이용자에게만 보여요.
              언제든 수정할 수 있어요!
            </p>
          </div>
        </section>
      </div>

      <div className="footer-btn-container">
        <button className="submit-btn">저장하기</button>
      </div>
    </div>
  );
};

export default ProfileRegistration;
