import React, { useState } from 'react';
import { getAvatarEmoji, getAvatarDescription } from '../data/subwayData';
import type { AvatarConfig } from '../data/subwayData';
import { useI18n } from '../i18n';
import './ProfileRegistration.css';

interface ProfileRegistrationProps {
  avatar: AvatarConfig;
  onBack?: () => void;
}

const ProfileRegistration: React.FC<ProfileRegistrationProps> = ({
  avatar,
  onBack,
}) => {
  const { t } = useI18n();
  const [nickname, setNickname] = useState('');
  const [features, setFeatures] = useState('');
  const emoji = getAvatarEmoji(avatar);
  const desc = getAvatarDescription(avatar, (id) => t(`item.${id}` as Parameters<typeof t>[0]));

  return (
    <div className="profile-registration page-enter">
      <header className="page-header">
        {onBack ? (
          <button className="back-btn" onClick={onBack}>←</button>
        ) : (
          <div className="header-spacer" />
        )}
        <h2 className="page-title">{t('profile.title')}</h2>
        <div className="header-spacer" />
      </header>

      <div className="profile-content">
        <section className="profile-avatar-section">
          <div className="profile-avatar-circle">
            <span>{emoji}</span>
          </div>
          <p className="profile-outfit-desc">{desc || t('profile.noAvatar')}</p>
        </section>

        <section className="profile-form-section">
          <div className="form-group">
            <label className="form-label">{t('profile.nickname')}</label>
            <input
              type="text"
              className="form-input"
              placeholder={t('profile.nicknamePlaceholder')}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t('profile.features')}</label>
            <input
              type="text"
              className="form-input"
              placeholder={t('profile.featuresPlaceholder')}
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
            />
            <p className="form-hint">
              {t('profile.featuresHint')}
            </p>
          </div>
        </section>

        <section className="profile-info-section">
          <div className="info-box">
            <p>
              {t('profile.infoBox').split('\n').map((line, i) => (
                <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
              ))}
            </p>
          </div>
        </section>
      </div>

      <div className="footer-btn-container">
        <button className="submit-btn">{t('profile.save')}</button>
      </div>
    </div>
  );
};

export default ProfileRegistration;
