import { createContext, useContext, useState, type ReactNode } from 'react';

type Lang = 'ko' | 'ja';

const translations = {
  // Landing
  'landing.title': { ko: '지하철\n자리의 주인', ja: '地下鉄\n席の主人' },
  'landing.subtitle': { ko: '내릴 사람을 미리 찾고\n포근하게 앉아서 가세요 🍃', ja: '降りる人を先に見つけて\nゆったり座っていきましょう 🍃' },
  'landing.start': { ko: '🚃 기차 타기', ja: '🚃 電車に乗る' },
  'landing.login': { ko: '이미 캐릭터가 있나요?', ja: 'すでにキャラクターがありますか？' },
  'landing.loginLink': { ko: '로그인', ja: 'ログイン' },

  // LineSelect
  'lineSelect.title': { ko: '호선 선택', ja: '路線選択' },
  'lineSelect.heading': { ko: '어떤 호선을\n타고 계신가요?', ja: 'どの路線に\n乗っていますか？' },
  'lineSelect.subtitle': { ko: '탑승 중인 노선을 선택해주세요', ja: '乗車中の路線を選んでください' },
  'lineSelect.stationCount': { ko: '개역', ja: '駅' },

  // Home
  'home.title': { ko: '칸 선택', ja: '車両選択' },
  'home.heading': { ko: ' 어느 칸에\n계신가요?', ja: ' どの車両に\nいますか？' },
  'home.subtitle': { ko: '현재 탑승하신 칸을 선택해주세요', ja: '現在乗っている車両を選んでください' },
  'home.car': { ko: '호차', ja: '号車' },
  'home.info': { ko: '🍃 칸을 선택하면 같은 칸에서 내릴 사람을 찾을 수 있어요', ja: '🍃 車両を選ぶと同じ車両で降りる人を探せます' },

  // AvatarDecorator
  'avatar.title': { ko: '아바타 꾸미기', ja: 'アバターを作る' },
  'avatar.complete': { ko: '완성! ✨', ja: '完成！ ✨' },

  // RegisterSeat
  'register.title': { ko: '내릴 역 등록', ja: '降車駅の登録' },
  'register.riding': { ko: '에 타고 계시군요!', ja: 'に乗っていますね！' },
  'register.where': { ko: '어디에서 내리시나요? 🚏', ja: 'どこで降りますか？ 🚏' },
  'register.appearance': { ko: '다른 사람에게 보이는 내 모습', ja: '他の人に見える私の姿' },
  'register.noOutfit': { ko: '아직 설정하지 않았어요', ja: 'まだ設定していません' },
  'register.confirm': { ko: '에서 내릴게요!', ja: 'で降ります！' },
  'register.placeholder': { ko: '내릴 역을 선택해주세요', ja: '降車駅を選んでください' },

  // SeatFinder
  'finder.direction': { ko: '방면', ja: '方面' },
  'finder.registered': { ko: '이 칸에 등록된 좌석', ja: 'この車両の登録済み座席' },
  'finder.count': { ko: '개', ja: '席' },
  'finder.all': { ko: '전체', ja: '全体' },
  'finder.near': { ko: '1~2정거장', ja: '1〜2駅' },
  'finder.far': { ko: '3정거장+', ja: '3駅+' },
  'finder.sortLabel': { ko: '하차 예정이 빠른 순', ja: '降車予定が早い順' },
  'finder.stopsAfter': { ko: '정거장 후', ja: '駅後' },
  'finder.exit': { ko: '하차', ja: '降車' },
  'finder.wait': { ko: '대기', ja: '待機' },

  // Waiting
  'waiting.title': { ko: '빈 자리를\n찾고 있어요', ja: '空席を\n探しています' },
  'waiting.subtitle1': { ko: ' 방면 하차 예정자를 찾고 있습니다', ja: ' 方面の降車予定者を探しています' },
  'waiting.subtitle2': { ko: '발견되면 바로 알려드릴게요! 🍃', ja: '見つかったらすぐお知らせします！ 🍃' },
  'waiting.route': { ko: '노선', ja: '路線' },
  'waiting.car': { ko: '칸', ja: '車両' },
  'waiting.dest': { ko: '목적지', ja: '目的地' },
  'waiting.waitCount': { ko: '대기 인원', ja: '待機人数' },
  'waiting.people': { ko: '명', ja: '人' },
  'waiting.cancel': { ko: '대기 취소하기', ja: '待機をキャンセル' },

  // ProfileRegistration
  'profile.title': { ko: '내 프로필', ja: 'マイプロフィール' },
  'profile.noAvatar': { ko: '아바타를 꾸며보세요', ja: 'アバターを作りましょう' },
  'profile.nickname': { ko: '닉네임', ja: 'ニックネーム' },
  'profile.nicknamePlaceholder': { ko: '닉네임을 입력하세요', ja: 'ニックネームを入力' },
  'profile.features': { ko: '기타 특징', ja: 'その他の特徴' },
  'profile.featuresPlaceholder': { ko: '예: 안경, 에어팟, 큰 가방', ja: '例：メガネ、AirPods、大きいカバン' },
  'profile.featuresHint': { ko: '정확한 인상착의는 다른 이용자가 자리를 찾는 데 도움이 돼요 🍃', ja: '正確な服装情報は他の利用者が席を探すのに役立ちます 🍃' },
  'profile.infoBox': { ko: '이 정보는 같은 칸에 탄 이용자에게만 보여요.\n언제든 수정할 수 있어요!', ja: 'この情報は同じ車両の利用者にのみ表示されます。\nいつでも修正できます！' },
  'profile.save': { ko: '저장하기', ja: '保存する' },

  // Bottom Nav
  'nav.finder': { ko: '좌석 찾기', ja: '席を探す' },
  'nav.avatar': { ko: '내 아바타', ja: 'アバター' },
  'nav.settings': { ko: '설정', ja: '設定' },

  // Avatar categories
  'cat.expression': { ko: '표정', ja: '表情' },
  'cat.hair': { ko: '헤어', ja: 'ヘアー' },
  'cat.top': { ko: '상의', ja: 'トップス' },
  'cat.bottom': { ko: '하의', ja: 'ボトムス' },
  'cat.accessory': { ko: '악세서리', ja: 'アクセサリー' },

  // Avatar items - expression
  'item.happy': { ko: '행복', ja: 'ハッピー' },
  'item.cool': { ko: '쿨', ja: 'クール' },
  'item.lovely': { ko: '설렘', ja: 'ときめき' },
  'item.sleepy': { ko: '졸림', ja: '眠い' },
  'item.proud': { ko: '당당', ja: '堂々' },
  'item.chill': { ko: '여유', ja: 'リラックス' },
  // Avatar items - hair
  'item.short': { ko: '짧은 머리', ja: 'ショート' },
  'item.long': { ko: '긴 머리', ja: 'ロング' },
  'item.curly': { ko: '곱슬', ja: 'カーリー' },
  'item.tied': { ko: '묶은 머리', ja: 'まとめ髪' },
  'item.cap': { ko: '모자 착용', ja: '帽子' },
  'item.buzz': { ko: '짧은 커트', ja: 'ショートカット' },
  // Avatar items - top
  'item.padding': { ko: '패딩', ja: 'ダウン' },
  'item.shirt': { ko: '셔츠', ja: 'シャツ' },
  'item.hoodie': { ko: '후드', ja: 'パーカー' },
  'item.tshirt': { ko: '티셔츠', ja: 'Tシャツ' },
  'item.coat': { ko: '코트', ja: 'コート' },
  'item.cardigan': { ko: '가디건', ja: 'カーディガン' },
  // Avatar items - bottom
  'item.jeans': { ko: '청바지', ja: 'ジーンズ' },
  'item.slacks': { ko: '슬랙스', ja: 'スラックス' },
  'item.skirt': { ko: '치마', ja: 'スカート' },
  'item.shorts': { ko: '반바지', ja: 'ショートパンツ' },
  'item.jogger': { ko: '조거팬츠', ja: 'ジョガーパンツ' },
  'item.leggings': { ko: '레깅스', ja: 'レギンス' },
  // Avatar items - accessory
  'item.backpack': { ko: '백팩', ja: 'リュック' },
  'item.glasses': { ko: '안경', ja: 'メガネ' },
  'item.headphones': { ko: '헤드폰', ja: 'ヘッドホン' },
  'item.scarf': { ko: '목도리', ja: 'マフラー' },
  'item.bag': { ko: '가방', ja: 'カバン' },
  'item.none': { ko: '없음', ja: 'なし' },
} as const;

type TranslationKey = keyof typeof translations;

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko');

  const t = (key: TranslationKey): string => {
    return translations[key]?.[lang] ?? key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
