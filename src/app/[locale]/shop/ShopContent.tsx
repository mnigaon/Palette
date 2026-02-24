'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import { Season } from '@/types';

const PRODUCTS = [
    {
        id: 'sp-1', name: '피치 플로럴 블라우스', brand: 'ZARA', category: 'clothing',
        season: ['spring'] as Season[], price: '59,900원', color: '#FFBFA0', colorName: '피치',
        productUrl: 'https://www.zara.com',
        description: '따뜻한 피치 컬러의 플로럴 패턴 블라우스. 봄 웜톤에게 완벽해요!',
    },
    {
        id: 'sp-2', name: '코랄 립 컬렉션', brand: 'Peripera', category: 'lipstick',
        season: ['spring', 'autumn'] as Season[], price: '12,000원', color: '#FF7F5C', colorName: '코랄',
        productUrl: 'https://www.peripera.com',
        description: '생기있는 코랄 컬러로 봄 화사함을 연출하세요',
    },
    {
        id: 'sp-3', name: '웜 아이보리 파운데이션', brand: 'MISSHA', category: 'foundation',
        season: ['spring', 'autumn'] as Season[], price: '28,000원', color: '#FFF8F0', colorName: '웜 아이보리',
        productUrl: 'https://www.missha.com',
        description: '황금빛이 감도는 자연스러운 피부 표현',
    },
    {
        id: 'sp-4', name: '살구빛 치크 팔레트', brand: 'Clinique', category: 'eyeshadow',
        season: ['spring'] as Season[], price: '32,000원', color: '#FFB347', colorName: '살구',
        productUrl: 'https://www.clinique.co.kr',
        description: '두 볼에 봄의 생기를 불어넣어주는 살구빛 치크',
    },
    {
        id: 'sp-5', name: '골드 리본 헤어핀', brand: 'JEALOUSY', category: 'accessories',
        season: ['spring'] as Season[], price: '15,000원', color: '#FFD980', colorName: '골드',
        productUrl: 'https://www.jealousy.co.kr',
        description: '봄의 따뜻함을 닮은 화사한 골드 헤어핀',
    },
    // Summer Cool
    {
        id: 'su-1', name: '라벤더 시폰 드레스', brand: 'H&M', category: 'clothing',
        season: ['summer'] as Season[], price: '49,900원', color: '#C8B4E0', colorName: '라벤더',
        productUrl: 'https://www.hm.com',
        description: '부드럽고 우아한 라벤더 시폰 드레스',
    },
    {
        id: 'su-2', name: '로즈 모브 립스틱', brand: 'MAC', category: 'lipstick',
        season: ['summer'] as Season[], price: '42,000원', color: '#C4A0B8', colorName: '로즈 모브',
        productUrl: 'https://www.maccosmetics.com',
        description: '여름 쿨톤에게 찰떡인 로즈 모브 컬러',
    },
    {
        id: 'su-3', name: '쿨 핑크 블러셔', brand: 'ROMAND', category: 'lipstick',
        season: ['summer', 'winter'] as Season[], price: '18,000원', color: '#F5B8C4', colorName: '쿨 핑크',
        productUrl: 'https://www.romand.com',
        description: '쿨톤에게 완벽한 쿨핑크 블러셔',
    },
    {
        id: 'su-4', name: '실버 리본 귀걸이', brand: 'LIAVY', category: 'accessories',
        season: ['summer', 'winter'] as Season[], price: '24,000원', color: '#B4C8E0', colorName: '실버',
        productUrl: 'https://www.liavy.com',
        description: '여름의 청량함을 더해주는 실버 액세서리',
    },
    {
        id: 'su-5', name: '스카이 블루 린넨 셔츠', brand: 'GAP', category: 'clothing',
        season: ['summer'] as Season[], price: '45,000원', color: '#B8C8D0', colorName: '스카이블루',
        productUrl: 'https://www.gap.com',
        description: '여름 쿨톤의 시원함을 극대화하는 린넨 셔츠',
    },
    // Autumn Warm
    {
        id: 'au-1', name: '테라코타 롱 가디건', brand: 'COS', category: 'clothing',
        season: ['autumn'] as Season[], price: '115,000원', color: '#C4613C', colorName: '테라코타',
        productUrl: 'https://www.cosstores.com',
        description: '가을 감성 가득한 분위기 있는 테라코타 가디건',
    },
    {
        id: 'au-2', name: '브릭 레드 벨벳 립', brand: 'HERA', category: 'lipstick',
        season: ['autumn'] as Season[], price: '38,000원', color: '#A0522D', colorName: '브릭 레드',
        productUrl: 'https://www.hera.com',
        description: '가을 웜톤에게 어울리는 깊고 풍부한 브릭 레드',
    },
    {
        id: 'au-3', name: '올리브 카키 야상', brand: 'WHO.A.U', category: 'clothing',
        season: ['autumn'] as Season[], price: '79,900원', color: '#7C8C5C', colorName: '올리브',
        productUrl: 'https://www.whoau.com',
        description: '내추럴한 가을 무드의 올리브 카키 재킷',
    },
    {
        id: 'au-4', name: '골드 호박 목걸이', brand: 'PANDORA', category: 'accessories',
        season: ['autumn'] as Season[], price: '120,000원', color: '#D4A843', colorName: '앰버',
        productUrl: 'https://www.pandora.net',
        description: '가을 웜톤의 성숙미를 완성해주는 골드 목걸이',
    },
    {
        id: 'au-5', name: '머스타드 스웨이드 스니커즈', brand: 'VANS', category: 'clothing',
        season: ['autumn'] as Season[], price: '69,000원', color: '#D4A843', colorName: '머스타드',
        productUrl: 'https://www.vans.co.kr',
        description: '가을 톤에 딱 맞는 따뜻하고 포인트 되는 스니커즈',
    },
    // Winter Cool
    {
        id: 'wi-1', name: '디퍼 퍼플 울 코트', brand: 'MANGO', category: 'clothing',
        season: ['winter'] as Season[], price: '249,000원', color: '#4B0082', colorName: '딥 퍼플',
        productUrl: 'https://www.mango.com',
        description: '겨울 쿨톤의 시크함을 강조하는 딥 퍼플 울 코트',
    },
    {
        id: 'wi-2', name: '체리 레드 잉크 틴트', brand: '3CE', category: 'lipstick',
        season: ['winter'] as Season[], price: '15,000원', color: '#DC143C', colorName: '체리레드',
        productUrl: 'https://www.stylenanda.com',
        description: '얼굴에 형광등을 켠 듯 선명한 레드 컬러',
    },
    {
        id: 'wi-3', name: '스노우 화이트 셔츠', brand: 'Theory', category: 'clothing',
        season: ['winter'] as Season[], price: '159,000원', color: '#F8F8FF', colorName: '스노우 화이트',
        productUrl: 'https://www.theory.com',
        description: '겨울 쿨톤에게 가장 깨끗하게 어울리는 순백색 셔츠',
    },
    {
        id: 'wi-4', name: '실버 크리스탈 초커', brand: 'Swarovski', category: 'accessories',
        season: ['winter'] as Season[], price: '185,000원', color: '#B4C8E0', colorName: '실버',
        productUrl: 'https://www.swarovski.com',
        description: '강렬한 대비를 완성하는 화려한 실버 초커',
    },
    {
        id: 'wi-5', name: '딥 버건디 가죽 백', brand: 'CHARLES & KEITH', category: 'accessories',
        season: ['winter'] as Season[], price: '95,000원', color: '#8C2040', colorName: '버건디',
        productUrl: 'https://www.charleskeith.com',
        description: '겨울 쿨톤의 고급미를 완성하는 딥 버건디 백',
    },
];

const CATEGORIES = ['all', 'clothing', 'lipstick', 'foundation', 'accessories', 'eyeshadow'] as const;

const SEASON_CONFIG: Record<Season, { label: string; color: string }> = {
    spring: { label: '🌸 봄 웜톤', color: '#FF9A5C' },
    summer: { label: '🌊 여름 쿨톤', color: '#F472B6' },
    autumn: { label: '🍂 가을 웜톤', color: '#F97316' },
    winter: { label: '❄️ 겨울 쿨톤', color: '#D946EF' },
};

export default function ShopContent() {
    const t = useTranslations('shop');
    const searchParams = useSearchParams();

    const defaultSeason = searchParams.get('season') || 'all';
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedSeason, setSelectedSeason] = useState<string>(defaultSeason);

    const filteredProducts = PRODUCTS.filter((p) => {
        const catMatch = selectedCategory === 'all' || p.category === selectedCategory;
        const seasonMatch = selectedSeason === 'all' || p.season.includes(selectedSeason as Season);
        return catMatch && seasonMatch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50/60 via-white to-purple-50/40 pb-16">
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-14 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-3">{t('title')}</h1>
                    <p className="text-white/80 text-lg">{t('subtitle')}</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-4">
                {/* Filters */}
                <div className="card p-5 mb-8">
                    <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">컬러 시즌</p>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedSeason('all')}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedSeason === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                전체
                            </button>
                            {(Object.entries(SEASON_CONFIG) as [Season, { label: string; color: string }][]).map(([key, val]) => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedSeason(key)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedSeason === key ? 'text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    style={selectedSeason === key ? { backgroundColor: val.color } : {}}
                                >
                                    {val.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">카테고리</p>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                        ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {t(`categories.${cat}`)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="card overflow-hidden hover:shadow-medium transition-all duration-300 hover:-translate-y-1 group"
                        >
                            <div
                                className="h-40 relative flex items-center justify-center"
                                style={{ backgroundColor: product.color + '33' }}
                            >
                                <div
                                    className="w-20 h-20 rounded-full shadow-md border-4 border-white/80 transition-transform duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: product.color }}
                                />
                                <div className="absolute top-3 right-3">
                                    <span className="text-xs px-2 py-1 rounded-full bg-white/80 backdrop-blur text-gray-600 font-medium">
                                        {product.colorName}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {product.season.map((s) => (
                                        <span
                                            key={s}
                                            className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                                            style={{ backgroundColor: SEASON_CONFIG[s].color + '20', color: SEASON_CONFIG[s].color }}
                                        >
                                            {SEASON_CONFIG[s].label}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-400 font-medium mb-1">{product.brand}</p>
                                <h3 className="font-semibold text-gray-800 mb-1.5 text-sm leading-tight">{product.name}</h3>
                                <p className="text-xs text-gray-500 mb-3 leading-relaxed line-clamp-2">{product.description}</p>

                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-gray-800">{product.price}</span>
                                    <a
                                        href={product.productUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 text-white text-xs font-semibold hover:shadow-md transition-all duration-200 hover:scale-105"
                                    >
                                        <ShoppingBag className="w-3 h-3" />
                                        {t('viewProduct')}
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p>해당 필터에 맞는 제품이 없어요</p>
                    </div>
                )}
            </div>
        </div>
    );
}
