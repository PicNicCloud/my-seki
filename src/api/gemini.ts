import type { AvatarConfig } from '../data/subwayData';
import { SKIN_COLORS, HAIR_COLORS, TOP_COLORS } from '../data/subwayData';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const SYSTEM_PROMPT = `You are an avatar configuration parser. Given a text description of a person's appearance, return a JSON object matching this exact schema:

{
  "expression": one of ["happy","cool","lovely","sleepy","proud","chill"],
  "skinColor": one of ${JSON.stringify(SKIN_COLORS)},
  "hair": one of ["short","long","curly","tied","cap","buzz"],
  "hairColor": one of ${JSON.stringify(HAIR_COLORS)},
  "top": one of ["padding","shirt","hoodie","tshirt","coat","cardigan"],
  "topColor": one of ${JSON.stringify(TOP_COLORS)},
  "bottom": one of ["jeans","slacks","skirt","shorts","jogger","leggings"],
  "accessory": one of ["backpack","glasses","headphones","scarf","bag","none"]
}

Rules:
- Return ONLY the JSON object, no markdown, no explanation
- Pick the closest match for each field
- If something is not mentioned, pick a reasonable default
- The input can be in Korean or Japanese`;

export async function generateAvatarFromText(text: string): Promise<AvatarConfig> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: SYSTEM_PROMPT },
          { text: `Description: ${text}` },
        ],
      }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 256,
      },
    }),
  });

  if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);

  const data = await res.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error('Empty response from Gemini');

  // Extract JSON from response (strip markdown code blocks if any)
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
    accessory: parsed.accessory || 'none',
  };
}
