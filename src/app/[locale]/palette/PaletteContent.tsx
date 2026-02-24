'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Copy, Check } from 'lucide-react';
import { Season } from '@/types';

const ALL_SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter'];

const SEASON_CONFIG = {
    spring: {
        label: '🌸 봄 웜톤',
        gradient: 'from-orange-100 to-pink-100',
        headerGrad: 'from-orange-400 to-pink-500',
        border: 'border-orange-200',
        tab: 'bg-gradient-to-r from-orange-400 to-pink-500',
    },
    summer: {
        label: '🌊 여름 쿨톤',
        gradient: 'from-pink-100 to-purple-100',
        headerGrad: 'from-pink-400 to-purple-500',
        border: 'border-pink-200',
        tab: 'bg-gradient-to-r from-pink-400 to-purple-500',
    },
    autumn: {
        label: '🍂 가을 웜톤',
        gradient: 'from-amber-100 to-orange-100',
        headerGrad: 'from-amber-500 to-orange-600',
        border: 'border-amber-200',
        tab: 'bg-gradient-to-r from-amber-500 to-orange-600',
    },
    winter: {
        label: '❄️ 겨울 쿨톤',
        gradient: 'from-purple-100 to-blue-100',
        headerGrad: 'from-purple-600 to-blue-600',
        border: 'border-purple-200',
        tab: 'bg-gradient-to-r from-purple-600 to-blue-600',
    },
};

function ColorSwatch({ hex, name }: { hex: string; name: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="flex flex-col items-center gap-2 group">
            <button
                onClick={handleCopy}
                className="relative w-16 h-16 rounded-2xl shadow-sm border-2 border-white/80 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                style={{ backgroundColor: hex }}
                title={`Copy ${hex}`}
            >
                <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/10 transition-all duration-200 flex items-center justify-center">
                    {copied ? (
                        <Check className="w-5 h-5 text-white drop-shadow" />
                    ) : (
                        <Copy className="w-4 h-4 text-white/0 group-hover:text-white/80 transition-all duration-200 drop-shadow" />
                    )}
                </div>
            </button>
            <span className="text-xs text-gray-500 font-mono">{hex}</span>
            <span className="text-xs text-gray-600 text-center max-w-[70px] leading-tight">{name}</span>
        </div>
    );
}

export default function PaletteContent() {
    const t = useTranslations('result');
    const palT = useTranslations('palette');
    const searchParams = useSearchParams();

    const defaultSeason = (searchParams.get('season') as Season) || 'spring';
    const [activeSeason, setActiveSeason] = useState<Season>(defaultSeason);

    const seasonData = t.raw(`seasons.${activeSeason}`) as any;
    const cfg = SEASON_CONFIG[activeSeason];

    return (
        <div className={`min-h-screen bg-gradient-to-br ${cfg.gradient} pb-16`}>
            {/* Header */}
            <div className={`bg-gradient-to-r ${cfg.headerGrad} text-white py-12 px-4`}>
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-3">{palT('title')}</h1>
                    <p className="text-white/80 text-lg">{palT('subtitle')}</p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 -mt-4">
                {/* Season Tabs */}
                <div className="flex flex-wrap gap-2 mb-8 p-1 bg-white/60 backdrop-blur rounded-2xl shadow-soft">
                    {ALL_SEASONS.map((season) => {
                        const scfg = SEASON_CONFIG[season];
                        return (
                            <button
                                key={season}
                                onClick={() => setActiveSeason(season)}
                                className={`flex-1 min-w-[120px] px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeSeason === season ? `${scfg.tab} text-white shadow-md` : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {scfg.label}
                            </button>
                        );
                    })}
                </div>

                {/* Season Info */}
                <div className="card p-8 mb-6 animate-fade-in">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-5xl">{seasonData.emoji}</span>
                        <div>
                            <h2 className="font-playfair text-3xl font-bold text-gray-800">{seasonData.name}</h2>
                            <p className="text-gray-500">{seasonData.subtype}</p>
                        </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{seasonData.description}</p>
                </div>

                {/* Best Colors */}
                <div className="card p-6 mb-6">
                    <h3 className="font-playfair text-xl font-bold text-gray-800 mb-6">
                        💚 {t('bestColors')}
                    </h3>
                    <div className="flex flex-wrap gap-5">
                        {(seasonData.bestColors as string[]).map((hex: string, i: number) => (
                            <ColorSwatch key={hex} hex={hex} name={seasonData.bestColorNames[i]} />
                        ))}
                    </div>
                </div>

                {/* Makeup & Hair */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="card p-6">
                        <h3 className="font-playfair text-xl font-bold text-gray-800 mb-5">💄 {t('makeup')}</h3>
                        <div className="flex flex-wrap gap-4">
                            {(seasonData.makeupColors as string[]).map((hex: string, i: number) => (
                                <ColorSwatch key={hex} hex={hex} name={seasonData.makeupColorNames[i]} />
                            ))}
                        </div>
                    </div>
                    <div className="card p-6">
                        <h3 className="font-playfair text-xl font-bold text-gray-800 mb-5">💇‍♀️ {t('hair')}</h3>
                        <div className="flex flex-wrap gap-4">
                            {(seasonData.hairColors as string[]).map((hex: string) => (
                                <ColorSwatch key={hex} hex={hex} name={hex} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Avoid Colors */}
                <div className="card p-6">
                    <h3 className="font-playfair text-xl font-bold text-gray-800 mb-5">⚠️ {t('avoidColors')}</h3>
                    <div className="flex flex-wrap gap-4">
                        {(seasonData.avoidColors as string[]).map((hex: string, i: number) => (
                            <div key={hex} className="flex flex-col items-center gap-2">
                                <div
                                    className="w-16 h-16 rounded-2xl shadow-sm border-2 border-white/80 opacity-60 relative"
                                    style={{ backgroundColor: hex }}
                                >
                                    <div className="absolute inset-0 rounded-2xl flex items-center justify-center">
                                        <div className="w-8 h-0.5 bg-white/70 rotate-45" />
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500 font-mono">{hex}</span>
                                <span className="text-xs text-gray-500 text-center max-w-[70px] leading-tight line-through">
                                    {seasonData.avoidColorNames[i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
