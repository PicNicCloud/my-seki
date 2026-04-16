import React, { useState } from 'react';
import {
  AVATAR_CATEGORIES,
  SKIN_COLORS,
  HAIR_COLORS,
  TOP_COLORS,
  BOTTOM_COLORS,
} from '../data/subwayData';
import type { AvatarConfig } from '../data/subwayData';
import { useI18n } from '../i18n';
import { generateAvatarFromText } from '../api/gemini';
import AvatarPreview from '../components/AvatarPreview';
import './AvatarDecorator.css';

interface AvatarDecoratorProps {
  avatar: AvatarConfig;
  onUpdateAvatar: (avatar: AvatarConfig) => void;
  onComplete: () => void;
  onBack?: () => void;
  showBack?: boolean;
}

const COLOR_PICKERS: Record<string, { key: keyof AvatarConfig; colors: string[]; labelKey: string }> = {
  expression: { key: 'skinColor', colors: SKIN_COLORS, labelKey: 'avatar.skinColor' },
  hair: { key: 'hairColor', colors: HAIR_COLORS, labelKey: 'avatar.hairColor' },
  top: { key: 'topColor', colors: TOP_COLORS, labelKey: 'avatar.topColor' },
  bottom: { key: 'bottomColor', colors: BOTTOM_COLORS, labelKey: 'avatar.bottomColor' },
};

const AvatarDecorator: React.FC<AvatarDecoratorProps> = ({
  avatar,
  onUpdateAvatar,
  onComplete,
  onBack,
  showBack = true,
}) => {
  const { t } = useI18n();
  const [mode, setMode] = useState<'manual' | 'ai'>('manual');
  const [activeCategory, setActiveCategory] = useState(0);
  const [aiText, setAiText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(false);

  const handleAiGenerate = async () => {
    if (!aiText.trim() || aiLoading) return;
    setAiLoading(true);
    setAiError(false);
    try {
      const config = await generateAvatarFromText(aiText);
      onUpdateAvatar(config);
    } catch {
      setAiError(true);
    } finally {
      setAiLoading(false);
    }
  };

  const currentCategory = AVATAR_CATEGORIES[activeCategory];
  const currentValue = avatar[currentCategory.key as keyof AvatarConfig];
  const colorPicker = COLOR_PICKERS[currentCategory.key];

  const handleSelectItem = (itemId: string) => {
    onUpdateAvatar({ ...avatar, [currentCategory.key]: itemId });
  };

  const handleSelectColor = (color: string) => {
    if (colorPicker) {
      onUpdateAvatar({ ...avatar, [colorPicker.key]: color });
    }
  };

  return (
    <div className="avatar-decorator page-enter">
      <header className="page-header">
        {showBack && onBack ? (
          <button className="back-btn" onClick={onBack}>←</button>
        ) : (
          <div className="header-spacer" />
        )}
        <h2 className="page-title">{t('avatar.title')}</h2>
        <div className="header-spacer" />
      </header>

      {/* 3D Avatar Preview */}
      <div className="avatar-preview-section">
        <div className="avatar-stage">
          <div className="avatar-pedestal" />
          <AvatarPreview config={avatar} size={140} animate />
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="mode-tabs">
        <button
          className={`mode-tab ${mode === 'manual' ? 'active' : ''}`}
          onClick={() => setMode('manual')}
        >
          {t('avatar.tabManual')}
        </button>
        <button
          className={`mode-tab ${mode === 'ai' ? 'active' : ''}`}
          onClick={() => setMode('ai')}
        >
          {t('avatar.tabAI')}
        </button>
      </div>

      {/* AI Panel */}
      {mode === 'ai' && (
        <div className="ai-panel">
          <textarea
            className="ai-textarea"
            placeholder={t('avatar.aiPlaceholder')}
            value={aiText}
            onChange={(e) => { setAiText(e.target.value); setAiError(false); }}
            rows={3}
          />
          <button
            className={`ai-generate-btn submit-btn ${!aiText.trim() || aiLoading ? 'disabled' : ''}`}
            onClick={handleAiGenerate}
            disabled={!aiText.trim() || aiLoading}
          >
            {aiLoading ? t('avatar.aiGenerating') : t('avatar.aiGenerate')}
          </button>
          {aiError && <p className="ai-error">{t('avatar.aiError')}</p>}
        </div>
      )}

      {/* Customization Panel */}
      {mode === 'manual' && <div className="customization-panel">
        <nav className="category-nav">
          {AVATAR_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.key}
              className={`category-tab ${idx === activeCategory ? 'active' : ''}`}
              onClick={() => setActiveCategory(idx)}
            >
              {t(`cat.${cat.key}` as Parameters<typeof t>[0])}
            </button>
          ))}
        </nav>

        <div className="panel-scroll">
          {/* Item Grid */}
          <div className="item-grid">
            {currentCategory.items.map((item) => (
              <button
                key={item.id}
                className={`grid-item ${currentValue === item.id ? 'selected' : ''}`}
                onClick={() => handleSelectItem(item.id)}
              >
                <MiniPreview
                  category={currentCategory.key}
                  itemId={item.id}
                  avatar={avatar}
                />
                <span className="item-label">
                  {t(`item.${item.id}` as Parameters<typeof t>[0])}
                </span>
              </button>
            ))}
          </div>

          {/* Color Picker (shown for expression/hair/top) */}
          {colorPicker && (
            <div className="color-picker-section">
              <span className="color-picker-label">
                {t(colorPicker.labelKey as Parameters<typeof t>[0])}
              </span>
              <div className="color-picker-row">
                {colorPicker.colors.map((c) => (
                  <button
                    key={c}
                    className={`color-dot ${avatar[colorPicker.key] === c ? 'active' : ''}`}
                    style={{ background: c }}
                    onClick={() => handleSelectColor(c)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>}

      <div className="footer-btn-container">
        <button className="submit-btn" onClick={onComplete}>
          {t('avatar.complete')}
        </button>
      </div>
    </div>
  );
};

/* ── Mini preview icons for item grid ────────────── */

function MiniPreview({
  category,
  itemId,
  avatar,
}: {
  category: string;
  itemId: string;
  avatar: AvatarConfig;
}) {
  if (category === 'expression') {
    return <MiniExpression id={itemId} skin={avatar.skinColor} />;
  }
  if (category === 'hair') {
    return <MiniHair id={itemId} color={avatar.hairColor} />;
  }
  if (category === 'top') {
    return <MiniTop id={itemId} color={avatar.topColor} />;
  }
  if (category === 'accessory') {
    return <MiniAccessory id={itemId} />;
  }
  // bottom: leg-shaped previews
  return <MiniBottom id={itemId} color={avatar.bottomColor} />;
}

function MiniExpression({ id, skin }: { id: string; skin: string }) {
  return (
    <div className="mini-face" style={{ background: skin }}>
      <div className={`mini-eyes mini-eyes--${id}`}>
        <div className="mini-eye" />
        <div className="mini-eye" />
      </div>
      <div className={`mini-mouth mini-mouth--${id}`} />
    </div>
  );
}

function MiniHair({ id, color }: { id: string; color: string }) {
  return <div className={`mini-hair mini-hair--${id}`} style={{ background: color }} />;
}

function MiniTop({ id, color }: { id: string; color: string }) {
  return <div className={`mini-top mini-top--${id}`} style={{ background: color }} />;
}

function MiniBottom({ id, color }: { id: string; color: string }) {
  return <div className={`mini-bottom mini-bottom--${id}`} style={{ '--mb-color': color } as React.CSSProperties} />;
}

function MiniAccessory({ id }: { id: string }) {
  if (id === 'none') return <span className="mini-acc-none">✦</span>;
  return <div className={`mini-acc mini-acc--${id}`} />;
}

export default AvatarDecorator;
