import type { AvatarConfig } from '../data/subwayData';
import { SKIN_COLORS, HAIR_COLORS, TOP_COLORS, BOTTOM_COLORS, DEFAULT_AVATAR } from '../data/subwayData';

interface KeywordRule {
  field: keyof AvatarConfig;
  value: string;
  keywords: string[];
  priority?: number;
}

const COLOR_MAP: Record<string, { skin?: string; hair?: string; top?: string; bottom?: string }> = {
  // Korean color words
  '검은': { hair: '#2C2C2C', top: '#2C2C2C', bottom: '#2C2C2C' },
  '검정': { hair: '#2C2C2C', top: '#2C2C2C', bottom: '#2C2C2C' },
  '까만': { hair: '#2C2C2C', top: '#2C2C2C', bottom: '#2C2C2C' },
  '갈색': { hair: '#5C3A1E', top: '#5C3A1E', bottom: '#8B6B50' },
  '브라운': { hair: '#5C3A1E', top: '#5C3A1E', bottom: '#8B6B50' },
  '금발': { hair: '#D4A56A' },
  '노란': { hair: '#D4A56A', top: '#D4A56A' },
  '노랑': { hair: '#D4A56A', top: '#D4A56A' },
  '빨간': { hair: '#C44030', top: '#C44030' },
  '빨강': { hair: '#C44030', top: '#C44030' },
  '레드': { hair: '#C44030', top: '#C44030' },
  '파란': { hair: '#4A7FBA', top: '#4A7FBA' },
  '파랑': { hair: '#4A7FBA', top: '#4A7FBA' },
  '블루': { hair: '#4A7FBA', top: '#4A7FBA' },
  '분홍': { hair: '#E88CB5', top: '#C44030' },
  '핑크': { hair: '#E88CB5', top: '#C44030' },
  '흰': { top: '#F5F5F5' },
  '하얀': { top: '#F5F5F5' },
  '화이트': { top: '#F5F5F5' },
  '회색': { top: '#808080', bottom: '#3D3D3D' },
  '그레이': { top: '#808080', bottom: '#3D3D3D' },
  '초록': { top: '#5B8C5A', bottom: '#5B7A5E' },
  '녹색': { top: '#5B8C5A', bottom: '#5B7A5E' },
  '그린': { top: '#5B8C5A', bottom: '#5B7A5E' },
  '베이지': { top: '#F5F5F5', bottom: '#C8B89A' },

  // Japanese color words
  '黒': { hair: '#2C2C2C', top: '#2C2C2C', bottom: '#2C2C2C' },
  'ブラック': { hair: '#2C2C2C', top: '#2C2C2C', bottom: '#2C2C2C' },
  '茶色': { hair: '#5C3A1E', top: '#5C3A1E', bottom: '#8B6B50' },
  'ブラウン': { hair: '#5C3A1E', top: '#5C3A1E', bottom: '#8B6B50' },
  '金髪': { hair: '#D4A56A' },
  'ブロンド': { hair: '#D4A56A' },
  '赤': { hair: '#C44030', top: '#C44030' },
  'レッド': { hair: '#C44030', top: '#C44030' },
  '青': { hair: '#4A7FBA', top: '#4A7FBA' },
  'ブルー': { hair: '#4A7FBA', top: '#4A7FBA' },
  'ピンク': { hair: '#E88CB5', top: '#C44030' },
  '白': { top: '#F5F5F5' },
  'ホワイト': { top: '#F5F5F5' },
  'グレー': { top: '#808080', bottom: '#3D3D3D' },
  '灰色': { top: '#808080', bottom: '#3D3D3D' },
  '緑': { top: '#5B8C5A', bottom: '#5B7A5E' },
  'グリーン': { top: '#5B8C5A', bottom: '#5B7A5E' },
};

const KEYWORD_RULES: KeywordRule[] = [
  // ── Expression ──
  { field: 'expression', value: 'happy', keywords: ['행복', '기쁜', '웃는', '웃음', '밝은', '笑顔', '嬉しい', '明るい', '웃고'] },
  { field: 'expression', value: 'cool', keywords: ['쿨', '멋진', '시크', 'カッコいい', 'クール', 'シック'] },
  { field: 'expression', value: 'lovely', keywords: ['설렘', '두근', '사랑', '러블리', 'ラブリー', '恋', 'ときめき'] },
  { field: 'expression', value: 'sleepy', keywords: ['졸린', '졸려', '졸음', '자는', '피곤', '眠い', '眠そう', '疲れ'] },
  { field: 'expression', value: 'proud', keywords: ['당당', '자신감', '씩씩', '堂々', '自信'] },
  { field: 'expression', value: 'chill', keywords: ['여유', '편안', '릴렉스', 'のんびり', 'リラックス', 'チル'] },

  // ── Hair ──
  { field: 'hair', value: 'short', keywords: ['짧은 머리', '숏컷', '숏', 'ショート', '短い髪', '短髪'], priority: 2 },
  { field: 'hair', value: 'bangs', keywords: ['내림머리', '앞머리', '뱅', 'バング', '前髪おろし', '前髪'], priority: 2 },
  { field: 'hair', value: 'long', keywords: ['긴 머리', '장발', '롱', 'ロング', '長い髪', '長髪'], priority: 2 },
  { field: 'hair', value: 'curly', keywords: ['곱슬', '웨이브', '파마', 'カーリー', 'パーマ', '巻き', 'ウェーブ'] },
  { field: 'hair', value: 'tied', keywords: ['묶은', '포니테일', '묶음', 'ポニーテール', '束ね', '結び', '포니'] },
  { field: 'hair', value: 'cap', keywords: ['모자', '캡', '볼캡', 'キャップ', '帽子', 'ハット'] },
  { field: 'hair', value: 'buzz', keywords: ['커트', '스포츠', '민머리', '삭발', '坊主', '刈り上げ', 'バズ'] },

  // ── Top ──
  { field: 'top', value: 'padding', keywords: ['패딩', '다운', '점퍼', '롱패딩', 'ダウン', 'パディング'] },
  { field: 'top', value: 'shirt', keywords: ['셔츠', '남방', '블라우스', 'シャツ', 'ブラウス', 'ワイシャツ'] },
  { field: 'top', value: 'hoodie', keywords: ['후드', '후디', '맨투맨', 'パーカー', 'フーディ', 'フード'] },
  { field: 'top', value: 'tshirt', keywords: ['티셔츠', '반팔', '티', 'Tシャツ', '半袖'] },
  { field: 'top', value: 'coat', keywords: ['코트', '트렌치', 'コート', 'トレンチ'] },
  { field: 'top', value: 'cardigan', keywords: ['가디건', '니트', '카디건', 'カーディガン', 'ニット'] },

  // ── Bottom ──
  { field: 'bottom', value: 'jeans', keywords: ['청바지', '데님', '진', '청', 'ジーンズ', 'デニム'] },
  { field: 'bottom', value: 'slacks', keywords: ['슬랙스', '정장', '바지', 'スラックス', '正装'] },
  { field: 'bottom', value: 'skirt', keywords: ['치마', '스커트', 'スカート'] },
  { field: 'bottom', value: 'shorts', keywords: ['반바지', '숏팬츠', 'ショートパンツ', '半ズボン', 'ショーツ'] },
  { field: 'bottom', value: 'jogger', keywords: ['조거', '트레이닝', '운동복', 'ジョガー', 'トレーニング', 'スウェット'] },
  { field: 'bottom', value: 'leggings', keywords: ['레깅스', 'レギンス'] },

  // ── Accessory ──
  { field: 'accessory', value: 'backpack', keywords: ['백팩', '배낭', '책가방', 'リュック', 'バックパック'] },
  { field: 'accessory', value: 'glasses', keywords: ['안경', '선글라스', 'メガネ', '眼鏡', 'サングラス'] },
  { field: 'accessory', value: 'headphones', keywords: ['헤드폰', '이어폰', 'ヘッドホン', 'イヤホン'] },
  { field: 'accessory', value: 'scarf', keywords: ['목도리', '스카프', '머플러', 'マフラー', 'スカーフ'] },
  { field: 'accessory', value: 'bag', keywords: ['가방', '핸드백', '숄더백', '토트', 'バッグ', 'かばん', 'カバン', 'トート'] },
];

function findClosestColor(target: string, palette: string[]): string {
  if (palette.includes(target)) return target;
  return palette[0];
}

/**
 * Resolves color context from surrounding text.
 * Handles patterns like "검은 머리", "회색 후드", "파란 코트" etc.
 */
function resolveColors(text: string): Partial<AvatarConfig> {
  const result: Partial<AvatarConfig> = {};

  const hairKeywords = ['머리', '헤어', '髪', 'ヘア'];
  const topKeywords = ['셔츠', '후드', '코트', '가디건', '패딩', '니트', '옷', '상의', '티',
    'シャツ', 'パーカー', 'コート', 'カーディガン', '服', '上'];
  const bottomKeywords = ['바지', '청바지', '치마', '하의', '슬랙스', '조거', '레깅스',
    'ズボン', 'パンツ', 'スカート', 'ジーンズ', 'ボトム'];

  for (const [colorWord, colors] of Object.entries(COLOR_MAP)) {
    const idx = text.indexOf(colorWord);
    if (idx === -1) continue;

    const context = text.slice(idx, idx + colorWord.length + 10);

    let appliedToHair = false;
    let appliedToTop = false;
    let appliedToBottom = false;

    for (const kw of hairKeywords) {
      if (context.includes(kw)) {
        if (colors.hair) result.hairColor = findClosestColor(colors.hair, HAIR_COLORS);
        appliedToHair = true;
        break;
      }
    }

    for (const kw of topKeywords) {
      if (context.includes(kw)) {
        if (colors.top) result.topColor = findClosestColor(colors.top, TOP_COLORS);
        appliedToTop = true;
        break;
      }
    }

    for (const kw of bottomKeywords) {
      if (context.includes(kw)) {
        if (colors.bottom) result.bottomColor = findClosestColor(colors.bottom, BOTTOM_COLORS);
        appliedToBottom = true;
        break;
      }
    }

    if (!appliedToHair && !appliedToTop && !appliedToBottom) {
      if (colors.hair && !result.hairColor) {
        result.hairColor = findClosestColor(colors.hair, HAIR_COLORS);
      }
      if (colors.top && !result.topColor) {
        result.topColor = findClosestColor(colors.top, TOP_COLORS);
      }
    }
  }

  return result;
}

export function parseAvatarFromText(text: string): AvatarConfig {
  const input = text.toLowerCase();
  const matched: Partial<AvatarConfig> = {};

  const matchedFields = new Map<keyof AvatarConfig, { value: string; priority: number; index: number }>();

  for (const rule of KEYWORD_RULES) {
    for (const keyword of rule.keywords) {
      const idx = input.indexOf(keyword.toLowerCase());
      if (idx === -1) continue;

      const priority = rule.priority ?? 1;
      const existing = matchedFields.get(rule.field);

      if (!existing || priority > existing.priority || (priority === existing.priority && idx < existing.index)) {
        matchedFields.set(rule.field, { value: rule.value, priority, index: idx });
      }
      break;
    }
  }

  for (const [field, match] of matchedFields) {
    (matched as Record<string, string>)[field] = match.value;
  }

  const colorOverrides = resolveColors(text);

  const skinKeywords: Record<string, string> = {
    '밝은 피부': SKIN_COLORS[0],
    '하얀 피부': SKIN_COLORS[0],
    '白い肌': SKIN_COLORS[0],
    '色白': SKIN_COLORS[0],
    '피부가 밝': SKIN_COLORS[0],
    '피부가 하얀': SKIN_COLORS[0],
    '구릿빛': SKIN_COLORS[3],
    '까무잡잡': SKIN_COLORS[3],
    '어두운 피부': SKIN_COLORS[4],
    '黒い肌': SKIN_COLORS[4],
    '褐色': SKIN_COLORS[3],
    '色黒': SKIN_COLORS[4],
    '탄': SKIN_COLORS[2],
  };

  for (const [kw, color] of Object.entries(skinKeywords)) {
    if (text.includes(kw)) {
      colorOverrides.skinColor = color;
      break;
    }
  }

  return {
    expression: matched.expression ?? DEFAULT_AVATAR.expression,
    skinColor: colorOverrides.skinColor ?? DEFAULT_AVATAR.skinColor,
    hair: matched.hair ?? DEFAULT_AVATAR.hair,
    hairColor: colorOverrides.hairColor ?? DEFAULT_AVATAR.hairColor,
    top: matched.top ?? DEFAULT_AVATAR.top,
    topColor: colorOverrides.topColor ?? DEFAULT_AVATAR.topColor,
    bottom: matched.bottom ?? DEFAULT_AVATAR.bottom,
    bottomColor: colorOverrides.bottomColor ?? DEFAULT_AVATAR.bottomColor,
    accessory: matched.accessory ?? DEFAULT_AVATAR.accessory,
  };
}
