import { Suspense } from 'react';
import PaletteContent from './PaletteContent';

export default function PalettePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
                <div className="w-10 h-10 rounded-full border-4 border-pink-300 border-t-pink-600 animate-spin" />
            </div>
        }>
            <PaletteContent />
        </Suspense>
    );
}
