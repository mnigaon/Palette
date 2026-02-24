import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Playfair_Display, Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SessionProvider from '@/components/providers/SessionProvider';
import Header from '@/components/layout/Header';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import '@/app/globals.css';

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const viewport: Viewport = {
    themeColor: '#F9C5D1',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'home.hero' });

    return {
        title: 'Palette — 퍼스널컬러 진단',
        description: t('subtitle'),
        manifest: '/manifest.json',
        icons: {
            apple: '/icons/icon.png',
        },
        openGraph: {
            title: 'Palette — 나만의 퍼스널컬러를 발견하세요',
            description: '10분 안에 당신의 퍼스널컬러를 알아보세요',
            images: ['/og-image.png'],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Palette — 나만의 퍼스널컬러를 발견하세요',
            description: '10분 안에 당신의 퍼스널컬러를 알아보세요',
            images: ['/og-image.png'],
        },
    };
}

export default async function LocaleLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();
    const session = await getServerSession(authOptions);

    return (
        <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
            </head>
            <body className="font-inter antialiased bg-white text-gray-900 min-h-screen">
                <SessionProvider session={session}>
                    <NextIntlClientProvider messages={messages}>
                        <ServiceWorkerRegister />
                        <Header />
                        <main className="pt-16 min-h-screen">
                            {children}
                        </main>
                    </NextIntlClientProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
