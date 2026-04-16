import React from 'react';
import type { AvatarConfig } from '../data/subwayData';
import './AvatarPreview.css';

interface AvatarPreviewProps {
  config: AvatarConfig;
  size?: number;
}

const AvatarPreview: React.FC<AvatarPreviewProps> = ({ config, size = 140 }) => {
  const scale = size / 140;
  const { expression, skinColor, hair, hairColor, top, topColor, accessory } = config;

  return (
    <div
      className="av"
      style={{ transform: `scale(${scale})`, width: 140, height: 170 }}
    >
      {/* Hair back layer */}
      <div className={`av-hair-back av-hair-back--${hair}`} style={{ background: hairColor }} />

      {/* Headphones band */}
      {accessory === 'headphones' && (
        <div className="av-headphones-band" />
      )}

      {/* Head */}
      <div
        className="av-head"
        style={{
          background: `radial-gradient(ellipse at 40% 35%, color-mix(in srgb, ${skinColor} 60%, white) 0%, ${skinColor} 50%, color-mix(in srgb, ${skinColor} 75%, #5D4037) 100%)`,
        }}
      >
        {/* Eyes */}
        <div className={`av-eyes av-eyes--${expression}`}>
          <div className="av-eye av-eye-l" />
          <div className="av-eye av-eye-r" />
        </div>

        {/* Blush */}
        <div className="av-blush av-blush-l" />
        <div className="av-blush av-blush-r" />

        {/* Mouth */}
        <div className={`av-mouth av-mouth--${expression}`} />

        {/* Glasses */}
        {accessory === 'glasses' && (
          <div className="av-glasses">
            <div className="av-glass-l" />
            <div className="av-glass-bridge" />
            <div className="av-glass-r" />
          </div>
        )}
      </div>

      {/* Hair front layer */}
      <div className={`av-hair-front av-hair-front--${hair}`} style={{ background: hairColor }} />

      {/* Headphone cups */}
      {accessory === 'headphones' && (
        <>
          <div className="av-hp-cup av-hp-cup-l" />
          <div className="av-hp-cup av-hp-cup-r" />
        </>
      )}

      {/* Body */}
      <div
        className={`av-body av-body--${top}`}
        style={{
          background: `linear-gradient(180deg, color-mix(in srgb, ${topColor} 80%, white) 0%, ${topColor} 50%, color-mix(in srgb, ${topColor} 80%, #333) 100%)`,
        }}
      >
        {/* Scarf */}
        {accessory === 'scarf' && <div className="av-scarf" />}

        {/* Collar/detail per top style */}
        {top === 'shirt' && <div className="av-collar" />}
        {top === 'hoodie' && <div className="av-hood-string" />}
        {top === 'tshirt' && <div className="av-tshirt-neck" />}
      </div>

      {/* Bag strap */}
      {(accessory === 'backpack' || accessory === 'bag') && (
        <div className={`av-strap av-strap--${accessory}`} />
      )}
    </div>
  );
};

export default AvatarPreview;
