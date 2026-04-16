import React, { useState } from 'react';
import { AVATAR_CATEGORIES, getAvatarEmoji } from '../data/subwayData';
import type { AvatarConfig } from '../data/subwayData';
import './AvatarDecorator.css';

interface AvatarDecoratorProps {
  avatar: AvatarConfig;
  onUpdateAvatar: (avatar: AvatarConfig) => void;
  onComplete: () => void;
  onBack?: () => void;
  showBack?: boolean;
}

const AvatarDecorator: React.FC<AvatarDecoratorProps> = ({
  avatar,
  onUpdateAvatar,
  onComplete,
  onBack,
  showBack = true,
}) => {
  const [activeCategory, setActiveCategory] = useState(0);

  const currentCategory = AVATAR_CATEGORIES[activeCategory];
  const currentValue = avatar[currentCategory.key as keyof AvatarConfig];

  const handleSelectItem = (itemId: string) => {
    onUpdateAvatar({
      ...avatar,
      [currentCategory.key]: itemId,
    });
  };

  const expressionEmoji = getAvatarEmoji(avatar);

  const getSelectedLabel = (catKey: string) => {
    const cat = AVATAR_CATEGORIES.find((c) => c.key === catKey);
    const item = cat?.items.find(
      (i) => i.id === avatar[catKey as keyof AvatarConfig]
    );
    return item;
  };

  return (
    <div className="avatar-decorator page-enter">
      <header className="page-header">
        {showBack && onBack ? (
          <button className="back-btn" onClick={onBack}>←</button>
        ) : (
          <div className="header-spacer" />
        )}
        <h2 className="page-title">아바타 꾸미기</h2>
        <div className="header-spacer" />
      </header>

      {/* Avatar Preview */}
      <div className="avatar-preview-section">
        <div className="avatar-stage">
          <div className="avatar-glow" />
          <div className="avatar-body">
            <div className="avatar-face-circle">
              <span className="avatar-expression">{expressionEmoji}</span>
            </div>
            <div className="avatar-outfit-tags">
              {['hair', 'top', 'bottom', 'accessory'].map((key) => {
                const item = getSelectedLabel(key);
                if (!item || item.id === 'none') return null;
                return (
                  <span key={key} className="outfit-tag">
                    {item.emoji} {item.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Customization Panel */}
      <div className="customization-panel">
        <nav className="category-nav">
          {AVATAR_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.key}
              className={`category-tab ${idx === activeCategory ? 'active' : ''}`}
              onClick={() => setActiveCategory(idx)}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        <div className="item-grid">
          {currentCategory.items.map((item) => (
            <button
              key={item.id}
              className={`grid-item ${currentValue === item.id ? 'selected' : ''}`}
              onClick={() => handleSelectItem(item.id)}
            >
              <span className="item-emoji">{item.emoji}</span>
              <span className="item-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="footer-btn-container">
        <button className="submit-btn" onClick={onComplete}>
          완성! ✨
        </button>
      </div>
    </div>
  );
};

export default AvatarDecorator;
