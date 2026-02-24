'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, Sparkles, Star, Heart } from 'lucide-react';

const FLOATING_COLORS = [
    { color: '#FFBFA0', size: 80, top: '10%', left: '5%', delay: 0 },
    { color: '#C8B4E0', size: 60, top: '15%', right: '8%', delay: 1 },
    { color: '#C4613C', size: 50, top: '60%', left: '3%', delay: 2 },
    { color: '#8C2040', size: 70, top: '70%', right: '5%', delay: 0.5 },
    { color: '#90EE90', size: 40, top: '40%', left: '8%', delay: 1.5 },
    { color: '#87CEEB', size: 55, top: '30%', right: '12%', delay: 2.5 },
];

const SEASON_CARDS = [
    {
        key: 'spring',
        emoji: '🌸',
        gradient: 'from-orange-100 via-pink-100 to-rose-100',
        border: 'border-orange-200',
        badge: 'bg-orange-100 text-orange-700',
        dot: 'bg-orange-400',
        textGrad: 'from-orange-400 to-pink-500',
        colors: ['#FFBFA0', '#FF7F5C', '#FFD980', '#90EE90'],
    },
    {
        key: 'summer',
        emoji: '🌊',
        gradient: 'from-pink-100 via-purple-100 to-blue-100',
        border: 'border-pink-200',
        badge: 'bg-pink-100 text-pink-700',
        dot: 'bg-pink-400',
        textGrad: 'from-pink-400 to-purple-500',
        colors: ['#F5B8C4', '#C8B4E0', '#B4C8E0', '#C4A0B8'],
    },
    {
        key: 'autumn',
        emoji: '🍂',
        gradient: 'from-amber-100 via-orange-100 to-yellow-100',
        border: 'border-amber-200',
        badge: 'bg-amber-100 text-amber-700',
        dot: 'bg-amber-500',
        textGrad: 'from-amber-500 to-orange-600',
        colors: ['#C4613C', '#7C8C5C', '#D4A843', '#C4501C'],
    },
    {
        key: 'winter',
        emoji: '❄️',
        gradient: 'from-purple-100 via-blue-100 to-indigo-100',
        border: 'border-purple-200',
        badge: 'bg-purple-100 text-purple-700',
        dot: 'bg-purple-500',
        textGrad: 'from-purple-600 to-blue-600',
        colors: ['#8C2040', '#1C2854', '#E0B0C0', '#4B0082'],
    },
];

export default function HomePage() {
    const t = useTranslations('home');
    const navT = useTranslations('nav');
    const { data: session } = useSession();
    const locale = useLocale();
    const router = useRouter();
    const sectionsRef = useRef<HTMLElement[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        sectionsRef.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const addToRefs = (el: HTMLElement | null) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el);
        }
    };

    const handleStartTest = () => {
        router.push(`/${locale}/test`);
    };

    return (
        <div className="overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
                {/* Floating Color Orbs */}
                {FLOATING_COLORS.map((orb, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full opacity-40 blur-xl float-shape pointer-events-none"
                        style={{
                            backgroundColor: orb.color,
                            width: orb.size,
                            height: orb.size,
                            top: orb.top,
                            left: (orb as any).left,
                            right: (orb as any).right,
                            animationDelay: `${orb.delay}s`,
                        }}
                    />
                ))}

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-gray-700 mb-8 shadow-soft">
                        <Sparkles className="w-4 h-4 text-pink-500" />
                        {t('hero.badge')}
                    </div>

                    {/* Main Title */}
                    <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-4 leading-tight">
                        <span className="text-gray-800">{t('hero.title')}</span>
                        <br />
                        <span className="gradient-text">{t('hero.title2')}</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        {t('hero.subtitle')}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={handleStartTest}
                            className="btn-primary text-lg px-8 py-4 shadow-glow-summer animate-bounce-soft"
                        >
                            {t('hero.cta')}
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                        <Link
                            href={`/${locale}/palette`}
                            className="btn-secondary text-lg px-8 py-4"
                        >
                            {t('hero.secondary')}
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8 justify-center mt-12 pt-8 border-t border-white/40">
                        {[
                            { num: '15', label: locale === 'ko' ? '정확한 질문' : 'Questions' },
                            { num: '4', label: locale === 'ko' ? '퍼스널컬러 시즌' : 'Color Seasons' },
                            { num: '10분', label: locale === 'ko' ? '소요 시간' : 'Only 10 Min' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="font-playfair text-3xl font-bold gradient-text">{stat.num}</p>
                                <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-soft">
                    <div className="w-6 h-10 rounded-full border-2 border-pink-300 flex justify-center pt-2">
                        <div className="w-1 h-3 rounded-full bg-pink-400 animate-bounce" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section
                ref={addToRefs}
                className="section-fade py-24 px-4 bg-white"
            >
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            {t('features.title')}
                        </h2>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            {t('features.subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: '🔬',
                                title: t('features.diagnosis.title'),
                                desc: t('features.diagnosis.desc'),
                                gradient: 'from-pink-50 to-rose-50',
                            },
                            {
                                icon: '🎨',
                                title: t('features.palette.title'),
                                desc: t('features.palette.desc'),
                                gradient: 'from-purple-50 to-pink-50',
                            },
                            {
                                icon: '🛍️',
                                title: t('features.shopping.title'),
                                desc: t('features.shopping.desc'),
                                gradient: 'from-blue-50 to-purple-50',
                            },
                        ].map((feat) => (
                            <div
                                key={feat.title}
                                className={`p-8 rounded-3xl bg-gradient-to-br ${feat.gradient} border border-white/60 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1`}
                            >
                                <div className="text-5xl mb-4">{feat.icon}</div>
                                <h3 className="font-playfair text-xl font-bold text-gray-800 mb-3">{feat.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seasons Section */}
            <section
                ref={addToRefs}
                className="section-fade py-24 px-4 bg-gradient-to-br from-pink-50/50 via-purple-50/30 to-blue-50/50"
            >
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            {t('seasons.title')}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {SEASON_CARDS.map((season) => {
                            const sKey = season.key as 'spring' | 'summer' | 'autumn' | 'winter';
                            return (
                                <div
                                    key={season.key}
                                    className={`season-card p-8 rounded-3xl bg-gradient-to-br ${season.gradient} border ${season.border} shadow-soft cursor-pointer`}
                                    onClick={() => router.push(`/${locale}/palette?season=${season.key}`)}
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <span className="text-4xl mb-2 block">{season.emoji}</span>
                                            <h3 className={`font-playfair text-2xl font-bold bg-gradient-to-r ${season.textGrad} bg-clip-text text-transparent`}>
                                                {t(`seasons.${sKey}.name`)}
                                            </h3>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5 max-w-[140px] justify-end">
                                            {(t.raw(`seasons.${sKey}.keywords`) as string[]).map((kw: string) => (
                                                <span key={kw} className={`${season.badge} text-xs px-2.5 py-1 rounded-full font-medium`}>
                                                    {kw}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-5">{t(`seasons.${sKey}.desc`)}</p>

                                    <div className="flex gap-2">
                                        {season.colors.map((color) => (
                                            <div
                                                key={color}
                                                className="color-swatch w-10 h-10 rounded-full shadow-sm border-2 border-white/80"
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                ref={addToRefs}
                className="section-fade py-24 px-4"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <div className="relative p-12 rounded-3xl bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 shadow-medium overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-4 left-8 w-16 h-16 rounded-full bg-white/30 blur-xl" />
                            <div className="absolute bottom-4 right-8 w-24 h-24 rounded-full bg-white/20 blur-xl" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-center gap-2 mb-4">
                                {[Heart, Star, Sparkles].map((Icon, i) => (
                                    <Icon key={i} className="w-5 h-5 text-white/70" />
                                ))}
                            </div>
                            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
                                {t('cta.title')}
                            </h2>
                            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                                {t('cta.subtitle')}
                            </p>
                            <button
                                onClick={handleStartTest}
                                className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-purple-600 font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                {t('cta.button')}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-gray-100 bg-white">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-pink-400 to-purple-500" />
                        <span className="font-playfair font-bold text-gray-800">Palette</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                        © 2024 Palette. Made with 💗 for every beautiful person.
                    </p>
                </div>
            </footer>
        </div>
    );
}
