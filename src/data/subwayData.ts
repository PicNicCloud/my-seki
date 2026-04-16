export interface SubwayLine {
  id: number;
  name: string;
  color: string;
  stations: string[];
  badge?: string;
}

export const SUBWAY_LINES: SubwayLine[] = [
  { id: 1, name: '1호선', color: '#0052A4', stations: ['소요산', '의정부', '회룡', '도봉산', '창동', '광운대', '청량리', '동대문', '종로3가', '종각', '시청', '서울역', '남영', '용산', '노량진', '영등포', '구로', '인천'] },
  { id: 2, name: '2호선', color: '#00A84D', stations: ['시청', '을지로입구', '을지로3가', '동대문역사문화공원', '왕십리', '성수', '건대입구', '잠실', '종합운동장', '삼성', '선릉', '역삼', '강남', '교대', '서초', '방배', '사당', '낙성대', '서울대입구', '신림', '신도림', '영등포구청', '당산', '합정', '홍대입구', '신촌', '이대', '충정로'] },
  { id: 3, name: '3호선', color: '#EF7C1C', stations: ['대화', '주엽', '정발산', '백석', '대곡', '화정', '구파발', '연신내', '불광', '독립문', '경복궁', '안국', '종로3가', '충무로', '약수', '압구정', '신사', '고속터미널', '교대', '양재', '대치', '수서', '오금'] },
  { id: 4, name: '4호선', color: '#00A5DE', stations: ['당고개', '노원', '창동', '쌍문', '수유', '미아삼거리', '성신여대입구', '혜화', '동대문', '충무로', '명동', '서울역', '삼각지', '이촌', '동작', '사당', '과천', '인덕원', '안양', '금정', '산본', '안산', '오이도'] },
  { id: 5, name: '5호선', color: '#996CAC', stations: ['방화', '김포공항', '송정', '까치산', '신정', '영등포구청', '여의도', '여의나루', '마포', '공덕', '충정로', '광화문', '종로3가', '동대문역사문화공원', '왕십리', '군자', '아차산', '천호', '강동', '길동', '굽은다리', '명일', '상일동', '마천'] },
  { id: 6, name: '6호선', color: '#CD7C2F', stations: ['응암', '역촌', '불광', '독바위', '연신내', '구산', '디지털미디어시티', '월드컵경기장', '합정', '상수', '광흥창', '대흥', '공덕', '효창공원앞', '삼각지', '녹사평', '이태원', '한강진', '버티고개', '약수', '청구', '신당', '동묘앞', '보문', '안암', '고려대', '월곡', '상월곡', '돌곶이', '석계', '태릉입구', '봉화산'] },
  { id: 7, name: '7호선', color: '#747F00', stations: ['장암', '도봉산', '노원', '중계', '하계', '공릉', '태릉입구', '먹골', '중화', '상봉', '면목', '사가정', '용마산', '중곡', '군자', '어린이대공원', '건대입구', '뚝섬유원지', '청담', '강남구청', '학동', '논현', '반포', '고속터미널', '내방', '이수', '남성', '총신대입구', '보라매', '신풍', '대림', '가산디지털단지', '철산', '광명사거리', '온수'] },
  { id: 8, name: '8호선', color: '#E6186C', stations: ['암사', '천호', '강동구청', '몽촌토성', '잠실', '석촌', '송파', '가락시장', '문정', '장지', '복정', '산성', '남한산성입구', '단대오거리', '신흥', '수진', '모란'] },
  { id: 9, name: '9호선', color: '#BDB092', stations: ['개화', '김포공항', '공항시장', '신방화', '마곡나루', '양천향교', '가양', '증미', '등촌', '염창', '신목동', '선유도', '당산', '국회의사당', '여의도', '샛강', '노량진', '노들', '흑석', '동작', '구반포', '신반포', '고속터미널', '사평', '신논현', '언주', '선정릉', '삼성중앙', '봉은사', '종합운동장', '삼전', '석촌고분', '석촌', '송파나루', '한성백제', '올림픽공원', '둔촌오륜', '중앙보훈병원'] },
];

export type Country = 'kr' | 'jp';

export const JAPAN_SUBWAY_LINES: SubwayLine[] = [
  { id: 1, name: '山手線', color: '#9ACD32', badge: 'JY', stations: ['東京', '神田', '秋葉原', '御徒町', '上野', '鶯谷', '日暮里', '西日暮里', '田端', '駒込', '巣鴨', '大塚', '池袋', '目白', '高田馬場', '新大久保', '新宿', '代々木', '原宿', '渋谷', '恵比寿', '目黒', '五反田', '大崎', '品川', '高輪ゲートウェイ', '田町', '浜松町', '新橋', '有楽町'] },
  { id: 2, name: '中央線', color: '#F15A22', badge: 'JC', stations: ['東京', '神田', '御茶ノ水', '四ツ谷', '新宿', '中野', '高円寺', '阿佐ケ谷', '荻窪', '西荻窪', '吉祥寺', '三鷹', '国分寺', '立川', '八王子', '高尾'] },
  { id: 3, name: '銀座線', color: '#FF9500', badge: 'G', stations: ['渋谷', '表参道', '外苑前', '青山一丁目', '赤坂見附', '溜池山王', '虎ノ門', '新橋', '銀座', '京橋', '日本橋', '三越前', '神田', '末広町', '上野広小路', '上野', '稲荷町', '田原町', '浅草'] },
  { id: 4, name: '丸ノ内線', color: '#E60012', badge: 'M', stations: ['荻窪', '南阿佐ヶ谷', '新高円寺', '東高円寺', '新中野', '中野坂上', '西新宿', '新宿', '新宿三丁目', '新宿御苑前', '四谷三丁目', '四ツ谷', '赤坂見附', '国会議事堂前', '霞ケ関', '銀座', '東京', '大手町', '淡路町', '御茶ノ水', '本郷三丁目', '後楽園', '茗荷谷', '新大塚', '池袋'] },
  { id: 5, name: '日比谷線', color: '#B5B5AC', badge: 'H', stations: ['中目黒', '恵比寿', '広尾', '六本木', '神谷町', '虎ノ門ヒルズ', '霞ケ関', '日比谷', '銀座', '東銀座', '築地', '八丁堀', '茅場町', '人形町', '小伝馬町', '秋葉原', '仲御徒町', '上野', '入谷', '三ノ輪', '南千住', '北千住'] },
  { id: 6, name: '東西線', color: '#009BBF', badge: 'T', stations: ['中野', '落合', '高田馬場', '早稲田', '神楽坂', '飯田橋', '九段下', '竹橋', '大手町', '日本橋', '茅場町', '門前仲町', '木場', '東陽町', '南砂町', '西葛西', '葛西', '浦安', '南行徳', '行徳', '妙典', '原木中山', '西船橋'] },
  { id: 7, name: '千代田線', color: '#00BB85', badge: 'C', stations: ['代々木上原', '代々木公園', '明治神宮前', '表参道', '乃木坂', '赤坂', '国会議事堂前', '霞ケ関', '日比谷', '二重橋前', '大手町', '新御茶ノ水', '湯島', '根津', '千駄木', '西日暮里', '町屋', '北千住', '綾瀬', '北綾瀬'] },
  { id: 8, name: '有楽町線', color: '#C1A470', badge: 'Y', stations: ['和光市', '地下鉄成増', '地下鉄赤塚', '平和台', '氷川台', '小竹向原', '千川', '要町', '池袋', '東池袋', '護国寺', '江戸川橋', '飯田橋', '市ケ谷', '麹町', '永田町', '桜田門', '有楽町', '銀座一丁目', '新富町', '月島', '豊洲', '辰巳', '新木場'] },
  { id: 9, name: '半蔵門線', color: '#8F76D6', badge: 'Z', stations: ['渋谷', '表参道', '青山一丁目', '永田町', '半蔵門', '九段下', '神保町', '大手町', '三越前', '水天宮前', '清澄白河', '住吉', '錦糸町', '押上'] },
];

export function getSubwayLines(country: Country): SubwayLine[] {
  return country === 'kr' ? SUBWAY_LINES : JAPAN_SUBWAY_LINES;
}

/* ── Avatar data ─────────────────────────────────────── */

export interface AvatarConfig {
  expression: string;
  skinColor: string;
  hair: string;
  hairColor: string;
  top: string;
  topColor: string;
  bottom: string;
  accessory: string;
}

export const DEFAULT_AVATAR: AvatarConfig = {
  expression: 'happy',
  skinColor: '#FFDCB5',
  hair: 'short',
  hairColor: '#2C2C2C',
  top: 'hoodie',
  topColor: '#808080',
  bottom: 'jeans',
  accessory: 'none',
};

export const SKIN_COLORS = ['#FFDCB5', '#F5C6A0', '#E8AB8B', '#C68F6E', '#A06B4E', '#7B4F35'];
export const HAIR_COLORS = ['#2C2C2C', '#5C3A1E', '#D4A56A', '#C44030', '#4A7FBA', '#E88CB5'];
export const TOP_COLORS = ['#2C2C2C', '#F5F5F5', '#808080', '#4A7FBA', '#C44030', '#5B8C5A'];
export interface AvatarItem {
  id: string;
  label: string;
}

export interface AvatarCategory {
  key: string;
  label: string;
  items: AvatarItem[];
}

export const AVATAR_CATEGORIES: AvatarCategory[] = [
  {
    key: 'expression', label: '표정',
    items: [
      { id: 'happy', label: '행복' },
      { id: 'cool', label: '쿨' },
      { id: 'lovely', label: '설렘' },
      { id: 'sleepy', label: '졸림' },
      { id: 'proud', label: '당당' },
      { id: 'chill', label: '여유' },
    ],
  },
  {
    key: 'hair', label: '헤어',
    items: [
      { id: 'short', label: '짧은 머리' },
      { id: 'long', label: '긴 머리' },
      { id: 'curly', label: '곱슬' },
      { id: 'tied', label: '묶은 머리' },
      { id: 'cap', label: '모자 착용' },
      { id: 'buzz', label: '짧은 커트' },
    ],
  },
  {
    key: 'top', label: '상의',
    items: [
      { id: 'padding', label: '패딩' },
      { id: 'shirt', label: '셔츠' },
      { id: 'hoodie', label: '후드' },
      { id: 'tshirt', label: '티셔츠' },
      { id: 'coat', label: '코트' },
      { id: 'cardigan', label: '가디건' },
    ],
  },
  {
    key: 'bottom', label: '하의',
    items: [
      { id: 'jeans', label: '청바지' },
      { id: 'slacks', label: '슬랙스' },
      { id: 'skirt', label: '치마' },
      { id: 'shorts', label: '반바지' },
      { id: 'jogger', label: '조거팬츠' },
      { id: 'leggings', label: '레깅스' },
    ],
  },
  {
    key: 'accessory', label: '악세서리',
    items: [
      { id: 'backpack', label: '백팩' },
      { id: 'glasses', label: '안경' },
      { id: 'headphones', label: '헤드폰' },
      { id: 'scarf', label: '목도리' },
      { id: 'bag', label: '가방' },
      { id: 'none', label: '없음' },
    ],
  },
];

export function getAvatarDescription(
  config: AvatarConfig,
  translateItem?: (id: string) => string,
): string {
  const t = (id: string) => {
    if (translateItem) return translateItem(id);
    for (const cat of AVATAR_CATEGORIES) {
      const item = cat.items.find((i) => i.id === id);
      if (item) return item.label;
    }
    return id;
  };
  const parts: string[] = [];
  if (config.hair) parts.push(t(config.hair));
  if (config.top) parts.push(t(config.top));
  if (config.bottom) parts.push(t(config.bottom));
  if (config.accessory && config.accessory !== 'none') parts.push(t(config.accessory));
  return parts.join(' · ');
}
