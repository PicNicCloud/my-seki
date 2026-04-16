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
  const { expression, skinColor, hair, hairColor, top, topColor, bottom, bottomColor, accessory } = config;

  const skinLight = `color-mix(in srgb, ${skinColor} 55%, white)`;
  const skinDark = `color-mix(in srgb, ${skinColor} 75%, #5D4037)`;
  const skinGrad = `radial-gradient(ellipse at 42% 38%, ${skinLight} 0%, ${skinColor} 55%, ${skinDark} 100%)`;
  const topLight = `color-mix(in srgb, ${topColor} 75%, white)`;
  const topDark = `color-mix(in srgb, ${topColor} 80%, #222)`;
  const bodyGrad = `linear-gradient(170deg, ${topLight} 0%, ${topColor} 45%, ${topDark} 100%)`;
  const btmDark = `color-mix(in srgb, ${bottomColor} 80%, #222)`;
  const bottomGrad = `linear-gradient(180deg, ${bottomColor} 0%, ${btmDark} 100%)`;

  return (
    <div
      className="av-outer"
      style={{ width: Math.round(140 * scale), height: Math.round(220 * scale) }}
    >
      <div
        className={`av ${animate ? 'av--animate' : ''}`}
        style={{ '--av-s': scale } as React.CSSProperties}
      >
        {/* ── Hair back ── */}
        <div className={`av-hair-back av-hair-back--${hair}`} style={{ background: hairColor }} />

        {/* ── Headphones band ── */}
        {accessory === 'headphones' && <div className="av-hp-band" />}

        {/* ── Ears ── */}
        <div className="av-ear av-ear-l" style={{ background: skinGrad }} />
        <div className="av-ear av-ear-r" style={{ background: skinGrad }} />

        {/* ── Head ── */}
        <div className="av-head" style={{ background: skinGrad }}>
          {/* Eyes */}
          <div className={`av-eyes av-eyes--${expression}`}>
            <div className="av-eye av-eye-l">
              <div className="av-iris" />
              <div className="av-highlight" />
            </div>
            <div className="av-eye av-eye-r">
              <div className="av-iris" />
              <div className="av-highlight" />
            </div>
          </div>
          {/* Nose */}
          <div className="av-nose" />
          {/* Blush */}
          <div className="av-blush av-blush-l" />
          <div className="av-blush av-blush-r" />
          {/* Mouth */}
          <div className={`av-mouth av-mouth--${expression}`} />
          {/* Glasses */}
          {accessory === 'glasses' && (
            <div className="av-glasses">
              <div className="av-glass av-glass-l" />
              <div className="av-glass-bridge" />
              <div className="av-glass av-glass-r" />
            </div>
          )}
        </div>

        {/* ── Hair front ── */}
        <div className={`av-hair-front av-hair-front--${hair}`} style={{ background: hairColor }} />

        {/* ── Headphone cups ── */}
        {accessory === 'headphones' && (
          <>
            <div className="av-hp-cup av-hp-cup-l" />
            <div className="av-hp-cup av-hp-cup-r" />
          </>
        )}

        {/* ── Neck ── */}
        <div className="av-neck" style={{ background: skinColor }} />

        {/* ── Body (top) ── */}
        <div className={`av-body av-body--${top}`} style={{ background: bodyGrad }}>
          <div className={`av-top-detail av-top-detail--${top}`} />
          {accessory === 'scarf' && <div className="av-scarf" />}
        </div>

        {/* ── Sleeves ── */}
        {top !== 'vest' && (
          <>
            <div className={`av-sleeve av-sleeve-l av-sleeve--${top}`} style={{ background: bodyGrad }} />
            <div className={`av-sleeve av-sleeve-r av-sleeve--${top}`} style={{ background: bodyGrad }} />
          </>
        )}

        {/* ── Arms ── */}
        <div className="av-arm av-arm-l" style={{ background: skinColor }} />
        <div className="av-arm av-arm-r" style={{ background: skinColor }} />

        {/* ── Bag strap ── */}
        {(accessory === 'backpack' || accessory === 'bag') && (
          <div className={`av-strap av-strap--${accessory}`} />
        )}

        {/* ── Bottom (pants/skirt) ── */}
        {bottom === 'skirt' ? (
          <div className="av-bottom av-bottom--skirt" style={{ background: bottomGrad }} />
        ) : (
          <div className={`av-pants av-pants--${bottom}`}>
            <div className="av-pant-l" style={{ background: bottomGrad }} />
            <div className="av-pant-r" style={{ background: bottomGrad }} />
          </div>
        )}

        {/* ── Legs ── */}
        <div className="av-leg av-leg-l" style={{ background: skinColor }} />
        <div className="av-leg av-leg-r" style={{ background: skinColor }} />

        {/* ── Feet ── */}
        <div className="av-foot av-foot-l" />
        <div className="av-foot av-foot-r" />

        {/* ── Earbuds ── */}
        {accessory === 'earbuds' && <div className="av-earbuds" />}
        {/* ── Watch ── */}
        {accessory === 'watch' && <div className="av-watch" />}
      </div>
    </div>
  );
};

export default AvatarPreview;
