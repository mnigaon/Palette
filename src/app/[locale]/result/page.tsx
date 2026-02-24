import { Suspense } from 'react';
import ResultPage from './ResultPage';

export default function ResultPageWrapper() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
                <div className="text-center">
                    <div className="w-12 h-12 rounded-full border-4 border-pink-300 border-t-pink-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-500">결과를 분석하는 중...</p>
                </div>
            </div>
        }>
            <ResultPage />
        </Suspense>
    );
}
