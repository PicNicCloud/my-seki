import React from 'react';
import type { AvatarConfig } from '../data/subwayData';
import './AvatarPreview.css';

interface AvatarPreviewProps {
  config: AvatarConfig;
  size?: number;
  animate?: boolean;
}

const AvatarPreview: React.FC<AvatarPreviewProps> = ({
  config,
  size = 140,
  animate = false,
}) => {
  const scale = size / 140;
  const { expression, skinColor, hair, hairColor, top, topColor, accessory } = config;

  const skinGrad = `radial-gradient(ellipse at 40% 35%, color-mix(in srgb, ${skinColor} 60%, white) 0%, ${skinColor} 50%, color-mix(in srgb, ${skinColor} 75%, #5D4037) 100%)`;
  const bodyGrad = `linear-gradient(180deg, color-mix(in srgb, ${topColor} 80%, white) 0%, ${topColor} 50%, color-mix(in srgb, ${topColor} 80%, #333) 100%)`;

  return (
    <div
      className="av-outer"
      style={{ width: Math.round(140 * scale), height: Math.round(170 * scale) }}
    >
      <div
        className={`av ${animate ? 'av--animate' : ''}`}
        style={{ '--av-s': scale } as React.CSSProperties}
      >
        {/* Hair back layer */}
        <div className={`av-hair-back av-hair-back--${hair}`} style={{ background: hairColor }} />

        {/* Headphones band */}
        {accessory === 'headphones' && <div className="av-headphones-band" />}

        {/* Ears */}
        <div className="av-ear av-ear-l" style={{ background: skinColor }} />
        <div className="av-ear av-ear-r" style={{ background: skinColor }} />

        {/* Head */}
        <div className="av-head" style={{ background: skinGrad }}>
          <div className={`av-eyes av-eyes--${expression}`}>
            <div className="av-eye av-eye-l" />
            <div className="av-eye av-eye-r" />
          </div>
          <div className="av-blush av-blush-l" />
          <div className="av-blush av-blush-r" />
          <div className={`av-mouth av-mouth--${expression}`} />
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

        {/* Neck */}
        <div className="av-neck" style={{ background: skinColor }} />

        {/* Body */}
        <div className={`av-body av-body--${top}`} style={{ background: bodyGrad }}>
          {accessory === 'scarf' && <div className="av-scarf" />}
          {top === 'shirt' && <div className="av-collar" />}
          {top === 'hoodie' && <div className="av-hood-string" />}
          {top === 'tshirt' && <div className="av-tshirt-neck" />}
        </div>

        {/* Bag strap */}
        {(accessory === 'backpack' || accessory === 'bag') && (
          <div className={`av-strap av-strap--${accessory}`} />
        )}
      </div>
    </div>
  );
};

export default AvatarPreview;
