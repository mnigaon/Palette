'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Palette, User, LogOut, LogIn, Globe } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { data: session } = useSession();
    const t = useTranslations('nav');
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLocale = () => {
        const newLocale = locale === 'ko' ? 'en' : 'ko';
        const segments = pathname.split('/');
        segments[1] = newLocale;
        router.push(segments.join('/'));
    };

    const navLinks = [
        { href: `/${locale}`, label: t('home') },
        { href: `/${locale}/test`, label: t('test') },
        { href: `/${locale}/palette`, label: t('palette') },
        { href: `/${locale}/shop`, label: t('shop') },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'glass shadow-medium py-3'
                    : 'bg-transparent py-4'
                }`}
        >
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href={`/${locale}`}
                    className="flex items-center gap-2 group"
                >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Palette className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-playfair font-bold text-xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        Palette
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${pathname === link.href
                                    ? 'bg-pink-100 text-pink-600'
                                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right side */}
                <div className="hidden md:flex items-center gap-3">
                    {/* Language toggle */}
                    <button
                        onClick={toggleLocale}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600 hover:text-pink-600 hover:bg-pink-50 transition-all duration-200 border border-gray-200"
                    >
                        <Globe className="w-3.5 h-3.5" />
                        {locale === 'ko' ? 'EN' : '한국어'}
                    </button>

                    {session ? (
                        <div className="flex items-center gap-2">
                            <Link
                                href={`/${locale}/profile`}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-pink-50 transition-all duration-200"
                            >
                                {session.user?.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt="Profile"
                                        width={28}
                                        height={28}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                                        <User className="w-3.5 h-3.5 text-white" />
                                    </div>
                                )}
                                <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                                    {session.user?.name?.split(' ')[0]}
                                </span>
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="p-2 rounded-full text-gray-400 hover:text-pink-500 hover:bg-pink-50 transition-all duration-200"
                                title={t('signout')}
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => signIn('google')}
                            className="btn-primary text-sm px-5 py-2"
                        >
                            <LogIn className="w-4 h-4 mr-1.5" />
                            {t('signin')}
                        </button>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden p-2 rounded-xl hover:bg-pink-50 transition-colors"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden glass shadow-medium mt-2 mx-4 rounded-2xl p-4 animate-fade-in">
                    <nav className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${pathname === link.href
                                        ? 'bg-pink-100 text-pink-600'
                                        : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="border-t border-gray-100 mt-2 pt-2 flex gap-2">
                            <button
                                onClick={toggleLocale}
                                className="flex-1 flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-pink-50 border border-gray-200"
                            >
                                <Globe className="w-4 h-4" />
                                {locale === 'ko' ? 'English' : '한국어'}
                            </button>

                            {session ? (
                                <button
                                    onClick={() => signOut()}
                                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-red-50 hover:text-red-500 border border-gray-200"
                                >
                                    <LogOut className="w-4 h-4" />
                                    {t('signout')}
                                </button>
                            ) : (
                                <button
                                    onClick={() => signIn('google')}
                                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl text-sm bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                                >
                                    <LogIn className="w-4 h-4" />
                                    {t('signin')}
                                </button>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
