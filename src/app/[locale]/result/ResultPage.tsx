'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { RotateCcw, ShoppingBag, Share2, CheckCircle, AlertCircle } from 'lucide-react';
import { Season } from '@/types';
import { useState } from 'react';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const SEASON_THEMES = {
    spring: {
        gradient: 'from-orange-100 via-pink-100 to-rose-100',
        headerGrad: 'from-orange-400 to-pink-500',
        card: 'bg-orange-50/80',
        border: 'border-orange-200',
    },
    summer: {
        gradient: 'from-pink-100 via-purple-100 to-blue-100',
        headerGrad: 'from-pink-400 to-purple-500',
        card: 'bg-pink-50/80',
        border: 'border-pink-200',
    },
    autumn: {
        gradient: 'from-amber-100 via-orange-100 to-yellow-100',
        headerGrad: 'from-amber-500 to-orange-600',
        card: 'bg-amber-50/80',
        border: 'border-amber-200',
    },
    winter: {
        gradient: 'from-purple-100 via-blue-100 to-indigo-100',
        headerGrad: 'from-purple-600 to-blue-600',
        card: 'bg-purple-50/80',
        border: 'border-purple-200',
    },
};

export default function ResultPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const locale = useLocale();
    const season = (searchParams.get('season') || 'spring') as Season;
    const t = useTranslations('result');
    const [copied, setCopied] = useState(false);

    const theme = SEASON_THEMES[season];
    const seasonData = t.raw(`seasons.${season}`) as any;

    const handleShare = async () => {
        const url = window.location.href;
        try {
            if (navigator.share) {
                await navigator.share({
                    title: `Palette — ${seasonData.name}`,
                    text: seasonData.description,
                    url,
                });
            } else {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch { }
    };

    return (
        <div className={`min-h-screen bg-gradient-to-br ${theme.gradient} pb-16`}>
            {/* Hero Result Banner */}
            <div className={`bg-gradient-to-r ${theme.headerGrad} text-white py-16 px-4`}>
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-white/70 text-lg mb-3 font-medium">{t('subtitle')}</p>
                    <div className="text-7xl mb-4">{seasonData.emoji}</div>
                    <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-2">
                        {t('title')}
                    </h1>
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-white/90">
                        {seasonData.name}
                    </h2>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-sm font-medium backdrop-blur-sm">
                        {seasonData.subtype}
                    </span>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 -mt-6">
                {/* Description Card */}
                <div className="card p-8 mb-6 animate-slide-up">
                    <p className="text-gray-700 text-lg leading-relaxed text-center">
                        {seasonData.description}
                    </p>
                </div>

                {/* Characteristics */}
                <div className={`card p-6 mb-6 ${theme.card}`}>
                    <h3 className="font-playfair text-xl font-bold text-gray-800 mb-4">
                        ✨ {t('characteristics')}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {(seasonData.characteristics as string[]).map((c: string) => (
                            <div key={c} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">{c}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Best Colors */}
                <div className="card p-6 mb-6">
                    <h3 className="font-playfair text-xl font-bold text-gray-800 mb-5">
                        💚 {t('bestColors')}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                        {(seasonData.bestColors as string[]).map((hex: string, i: number) => (
                            <div key={hex} className="flex flex-col items-center gap-1.5">
                                <div
                                    className="color-swatch w-14 h-14 rounded-2xl shadow-sm border-2 border-white/80"
                                    style={{ backgroundColor: hex }}
                                    title={seasonData.bestColorNames[i]}
                                />
                                <span className="text-xs text-gray-500 font-mono">{hex}</span>
                                <span className="text-xs text-gray-600 text-center max-w-[60px] leading-tight">
                                    {seasonData.bestColorNames[i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Avoid Colors */}
                <div className="card p-6 mb-6">
                    <h3 className="font-playfair text-xl font-bold text-gray-800 mb-5">
                        ⚠️ {t('avoidColors')}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                        {(seasonData.avoidColors as string[]).map((hex: string, i: number) => (
                            <div key={hex} className="flex flex-col items-center gap-1.5 relative">
                                <div
                                    className="w-14 h-14 rounded-2xl shadow-sm border-2 border-white/80 relative overflow-hidden"
                                    style={{ backgroundColor: hex }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <AlertCircle className="w-5 h-5 text-white/70" />
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500 font-mono">{hex}</span>
                                <span className="text-xs text-gray-600 text-center max-w-[60px] leading-tight">
                                    {seasonData.avoidColorNames[i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Makeup Colors */}
                <div className="card p-6 mb-6">
                    <h3 className="font-playfair text-xl font-bold text-gray-800 mb-5">
                        💄 {t('makeup')}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                        {(seasonData.makeupColors as string[]).map((hex: string, i: number) => (
                            <div key={hex} className="flex flex-col items-center gap-1.5">
                                <div
                                    className="color-swatch w-12 h-12 rounded-full shadow-sm border-2 border-white/80"
                                    style={{ backgroundColor: hex }}
                                />
                                <span className="text-xs text-gray-600 text-center max-w-[56px] leading-tight">
                                    {seasonData.makeupColorNames[i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hair Colors */}
                <div className="card p-6 mb-8">
                    <h3 className="font-playfair text-xl font-bold text-gray-800 mb-5">
                        💇‍♀️ {t('hair')}
                    </h3>
                    <div className="flex gap-4">
                        {(seasonData.hairColors as string[]).map((hex: string) => (
                            <div key={hex} className="flex flex-col items-center gap-1.5">
                                <div
                                    className="color-swatch w-14 h-14 rounded-full shadow-sm border-2 border-white/80"
                                    style={{ backgroundColor: hex }}
                                />
                                <span className="text-xs text-gray-500 font-mono">{hex}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => router.push(`/${locale}/test`)}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-700 font-semibold hover:border-pink-300 hover:text-pink-600 transition-all duration-200"
                    >
                        <RotateCcw className="w-5 h-5" />
                        {t('retake')}
                    </button>
                    <button
                        onClick={() => router.push(`/${locale}/shop?season=${season}`)}
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r ${theme.headerGrad} text-white font-semibold hover:shadow-lg transition-all duration-200 hover:scale-[1.02]`}
                    >
                        <ShoppingBag className="w-5 h-5" />
                        {t('goShop')}
                    </button>
                    <button
                        onClick={handleShare}
                        className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-700 font-semibold hover:border-pink-300 hover:text-pink-600 transition-all duration-200 min-w-[120px]"
                    >
                        <Share2 className="w-5 h-5" />
                        {copied ? '✓' : t('shareCopy')}
                    </button>
                </div>
            </div>
        </div>
    );
}
