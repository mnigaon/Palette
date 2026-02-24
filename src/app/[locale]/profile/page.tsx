'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User, Calendar, TestTube, LogOut, LogIn, Palette } from 'lucide-react';
import { Season } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const SEASON_BG = {
    spring: 'from-orange-100 via-pink-100 to-rose-100',
    summer: 'from-pink-100 via-purple-100 to-blue-100',
    autumn: 'from-amber-100 via-orange-100 to-yellow-100',
    winter: 'from-purple-100 via-blue-100 to-indigo-100',
};
const SEASON_GRAD = {
    spring: 'from-orange-400 to-pink-500',
    summer: 'from-pink-400 to-purple-500',
    autumn: 'from-amber-500 to-orange-600',
    winter: 'from-purple-600 to-blue-600',
};
const SEASON_EMOJI = {
    spring: '🌸',
    summer: '🌊',
    autumn: '🍂',
    winter: '❄️',
};
const SEASON_NAME = {
    spring: '봄 웜톤',
    summer: '여름 쿨톤',
    autumn: '가을 웜톤',
    winter: '겨울 쿨톤',
};

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const t = useTranslations('profile');
    const locale = useLocale();
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.email) {
            fetchUserData(session.user.email);
        } else if (status === 'unauthenticated') {
            setLoading(false);
        }
    }, [session, status]);

    const fetchUserData = async (email: string) => {
        try {
            const docRef = doc(db, 'users', email);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserData(docSnap.data());
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
                <div className="text-center">
                    <div className="w-12 h-12 rounded-full border-4 border-pink-300 border-t-pink-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-500">로딩 중...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 px-4">
                <div className="card p-10 max-w-md w-full text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center mx-auto mb-6">
                        <User className="w-10 h-10 text-gray-400" />
                    </div>
                    <h1 className="font-playfair text-2xl font-bold text-gray-800 mb-3">{t('title')}</h1>
                    <p className="text-gray-500 mb-8">로그인하면 퍼스널컬러 결과를 저장하고 언제든 확인할 수 있어요!</p>
                    <button
                        onClick={() => signIn('google')}
                        className="btn-primary w-full py-4 text-base justify-center"
                    >
                        <LogIn className="w-5 h-5 mr-2" />
                        Google로 로그인
                    </button>
                </div>
            </div>
        );
    }

    const season = userData?.season as Season | undefined;
    const bg = season ? SEASON_BG[season] : 'from-pink-50 to-purple-50';
    const grad = season ? SEASON_GRAD[season] : 'from-pink-400 to-purple-500';

    return (
        <div className={`min-h-screen bg-gradient-to-br ${bg} pb-16`}>
            {/* Header */}
            <div className={`bg-gradient-to-r ${grad} text-white py-14 px-4`}>
                <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
                    {session.user?.image ? (
                        <Image
                            src={session.user.image}
                            alt="Profile"
                            width={80}
                            height={80}
                            className="rounded-full border-4 border-white/50 mb-4 shadow-lg"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
                            <User className="w-10 h-10 text-white/80" />
                        </div>
                    )}
                    <h1 className="font-playfair text-3xl font-bold mb-1">{session.user?.name}</h1>
                    <p className="text-white/70 text-sm">{session.user?.email}</p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 -mt-6">
                {/* My Color Result */}
                {season ? (
                    <div className="card p-8 mb-6 text-center">
                        <p className="text-gray-500 text-sm mb-2">{t('myColor')}</p>
                        <div className="text-6xl mb-3">{SEASON_EMOJI[season]}</div>
                        <h2 className={`font-playfair text-3xl font-bold bg-gradient-to-r ${grad} bg-clip-text text-transparent mb-1`}>
                            {SEASON_NAME[season]}
                        </h2>
                        {userData?.testedAt && (
                            <div className="flex items-center justify-center gap-1.5 text-gray-400 text-xs mt-2">
                                <Calendar className="w-3.5 h-3.5" />
                                {t('testedAt')}: {new Date(userData.testedAt).toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US')}
                            </div>
                        )}

                        <div className="flex gap-3 mt-6">
                            <Link
                                href={`/${locale}/result?season=${season}`}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r ${grad} text-white font-semibold hover:shadow-lg transition-all`}
                            >
                                <Palette className="w-4 h-4" />
                                결과 다시 보기
                            </Link>
                            <Link
                                href={`/${locale}/test`}
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border-2 border-gray-200 text-gray-600 font-semibold hover:border-pink-300 hover:text-pink-600 transition-all"
                            >
                                <TestTube className="w-4 h-4" />
                                {t('retake')}
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="card p-8 mb-6 text-center">
                        <div className="text-5xl mb-4">🎨</div>
                        <p className="text-gray-600 mb-2 font-medium">{t('noResult')}</p>
                        <p className="text-gray-400 text-sm mb-6">테스트를 완료하면 나만의 퍼스널컬러를 알 수 있어요!</p>
                        <Link
                            href={`/${locale}/test`}
                            className="btn-primary inline-flex"
                        >
                            {t('takeTest')}
                        </Link>
                    </div>
                )}

                {/* Quick Links */}
                <div className="card p-5 mb-6">
                    <h3 className="font-playfair text-lg font-bold text-gray-800 mb-4">빠른 메뉴</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { href: `/${locale}/palette`, icon: '🎨', label: '컬러 팔레트' },
                            { href: `/${locale}/shop`, icon: '🛍️', label: '쇼핑 추천' },
                            { href: `/${locale}/test`, icon: '✏️', label: '테스트' },
                            { href: `/${locale}`, icon: '🏠', label: '홈으로' },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 hover:bg-pink-50 hover:text-pink-600 transition-all duration-200"
                            >
                                <span className="text-2xl">{item.icon}</span>
                                <span className="font-medium text-sm text-gray-700">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Sign Out */}
                <button
                    onClick={() => signOut({ callbackUrl: `/${locale}` })}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-red-100 text-red-400 font-semibold hover:bg-red-50 hover:border-red-200 transition-all duration-200"
                >
                    <LogOut className="w-4 h-4" />
                    {t('logout')}
                </button>
            </div>
        </div>
    );
}
