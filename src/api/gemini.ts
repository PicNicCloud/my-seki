import type { AvatarConfig } from '../data/subwayData';
import { SKIN_COLORS, HAIR_COLORS, TOP_COLORS, BOTTOM_COLORS } from '../data/subwayData';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

const SYSTEM_PROMPT = `Return ONLY a JSON object, no markdown, no code blocks, no explanation.
Example: {"expression":"happy","skinColor":"#FFDCB5","hair":"short","hairColor":"#4A3728","top":"hoodie","topColor":"#808080","bottom":"jeans","bottomColor":"#4A6FA5","accessories":["glasses","backpack"]}
Allowed values:
expression=[happy,cool,lovely,sleepy,proud,chill,surprised,angry,wink,smirk,tearful,excited]
skinColor=${JSON.stringify(SKIN_COLORS)}
hair=[short,long,curly,tied,cap,buzz,bob,twintail,bun,wavy,spiky,parted,slickback,ponytail,bald]
hairColor=${JSON.stringify(HAIR_COLORS)}
top=[padding,shirt,hoodie,tshirt,coat,cardigan,sweater,vest,blazer,onepiece]
topColor=${JSON.stringify(TOP_COLORS)}
bottom=[jeans,slacks,skirt,shorts,jogger,leggings]
bottomColor=${JSON.stringify(BOTTOM_COLORS)}
accessories=array of zero or more from [backpack,glasses,headphones,scarf,bag,earbuds,watch] (empty array if none)
Pick the closest match. If not mentioned, pick a reasonable default. Input can be Korean or Japanese.`;

export async function generateAvatarFromText(text: string): Promise<AvatarConfig> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: SYSTEM_PROMPT },
          { text: text },
        ],
      }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 1024,
        thinkingConfig: { thinkingBudget: 0 },
      },
    }),
  });

  if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);

  const data = await res.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error('Empty response from Gemini');

  const jsonStr = rawText.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(jsonStr);

  return {
    expression: parsed.expression || 'happy',
    skinColor: parsed.skinColor || SKIN_COLORS[0],
    hair: parsed.hair || 'short',
    hairColor: parsed.hairColor || HAIR_COLORS[0],
    top: parsed.top || 'tshirt',
    topColor: parsed.topColor || TOP_COLORS[0],
    bottom: parsed.bottom || 'jeans',
    bottomColor: parsed.bottomColor || BOTTOM_COLORS[0],
    accessories: parsed.accessories ? (Array.isArray(parsed.accessories) ? parsed.accessories : [parsed.accessories]).filter((a: string) => a !== 'none') : [],
  };
}
