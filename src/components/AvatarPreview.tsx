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
  const { expression, skinColor, hair, hairColor, top, topColor, bottom, bottomColor, accessories } = config;

  const skinGrad = `radial-gradient(ellipse at 40% 35%, color-mix(in srgb, ${skinColor} 60%, white) 0%, ${skinColor} 50%, color-mix(in srgb, ${skinColor} 75%, #5D4037) 100%)`;
  const bodyGrad = `linear-gradient(180deg, color-mix(in srgb, ${topColor} 80%, white) 0%, ${topColor} 50%, color-mix(in srgb, ${topColor} 80%, #333) 100%)`;
  const legGrad = `linear-gradient(180deg, ${bottomColor} 0%, color-mix(in srgb, ${bottomColor} 80%, #222) 100%)`;
  const showBareLeg = bottom === 'skirt';

  return (
    <div
      className="av-outer"
      style={{ width: Math.round(140 * scale), height: Math.round(160 * scale) }}
    >
      <div
        className={`av ${animate ? 'av--animate' : ''}`}
        style={{ '--av-s': scale } as React.CSSProperties}
      >
        {/* Hair back layer */}
        <div className={`av-hair-back av-hair-back--${hair}`} style={{ background: hairColor }} />

        {/* Headphones band */}
        {accessories.includes('headphones') && <div className="av-headphones-band" />}

        {/* Head */}
        <div className="av-head" style={{ background: skinGrad }}>
          <div className={`av-eyes av-eyes--${expression}`}>
            <div className="av-eye av-eye-l" />
            <div className="av-eye av-eye-r" />
          </div>
          <div className="av-nose" />
          <div className="av-blush av-blush-l" />
          <div className="av-blush av-blush-r" />
          <div className={`av-mouth av-mouth--${expression}`} />
          {accessories.includes('glasses') && (
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
        {accessories.includes('headphones') && (
          <>
            <div className="av-hp-cup av-hp-cup-l" />
            <div className="av-hp-cup av-hp-cup-r" />
          </>
        )}

        {/* Arms */}
        <div className="av-arm av-arm-l" style={{ background: skinColor }} />
        <div className="av-arm av-arm-r" style={{ background: skinColor }} />

        {/* Hood (behind head) */}
        {top === 'hoodie' && <div className="av-hood" style={{ background: bodyGrad }} />}

        {/* Body */}
        <div className={`av-body av-body--${top}`} style={{ background: bodyGrad }}>
          {accessories.includes('scarf') && <div className="av-scarf" />}
          {top === 'shirt' && <div className="av-collar" />}
          {top === 'hoodie' && <div className="av-hood-string" />}
          {top === 'tshirt' && <div className="av-tshirt-neck" />}
        </div>

        {/* Legs */}
        <div className={`av-legs av-legs--${bottom}`}>
          <div
            className="av-leg av-leg-l"
            style={{ background: showBareLeg ? skinColor : legGrad }}
          />
          <div
            className="av-leg av-leg-r"
            style={{ background: showBareLeg ? skinColor : legGrad }}
          />
          {bottom === 'skirt' && (
            <div className="av-skirt-piece" style={{ background: legGrad }} />
          )}
        </div>

        {/* Shoes */}
        <div className="av-shoe av-shoe-l" />
        <div className="av-shoe av-shoe-r" />

        {/* Bag strap */}
        {(accessories.includes('backpack') || accessories.includes('bag')) && (
          <div className={`av-strap av-strap--${accessories.includes('backpack') ? 'backpack' : 'bag'}`} />
        )}

        {/* Earbuds */}
        {accessories.includes('earbuds') && <div className="av-earbuds" />}
        {/* Watch */}
        {accessories.includes('watch') && <div className="av-watch" />}
      </div>
    </div>
  );
};

export default AvatarPreview;
