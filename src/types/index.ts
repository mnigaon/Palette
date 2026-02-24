export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface SeasonScores {
    spring: number;
    summer: number;
    autumn: number;
    winter: number;
}

export interface QuizOption {
    id: string;
    text: string;
    scores: Partial<SeasonScores>;
}

export interface QuizQuestion {
    id: number;
    text: string;
    options: QuizOption[];
}

export interface UserProfile {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    season?: Season;
    seasonScores?: SeasonScores;
    testedAt?: string;
    createdAt: string;
}

export interface ColorSwatch {
    hex: string;
    name: string;
}

export interface SeasonData {
    name: string;
    emoji: string;
    subtype: string;
    description: string;
    characteristics: string[];
    bestColors: string[];
    bestColorNames: string[];
    avoidColors: string[];
    avoidColorNames: string[];
    makeupColors: string[];
    makeupColorNames: string[];
    hairColors: string[];
}

export interface Product {
    id: string;
    name: string;
    brand: string;
    category: 'clothing' | 'lipstick' | 'foundation' | 'accessories' | 'eyeshadow';
    season: Season[];
    price: string;
    color: string;
    colorName: string;
    imageUrl: string;
    productUrl: string;
    description: string;
}
