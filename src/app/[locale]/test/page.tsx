'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Season, SeasonScores } from '@/types';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Answer {
    questionId: number;
    optionId: string;
    scores: Partial<SeasonScores>;
}

function calculateResult(answers: Answer[]): Season {
    const totals: SeasonScores = { spring: 0, summer: 0, autumn: 0, winter: 0 };

    answers.forEach((answer) => {
        Object.entries(answer.scores).forEach(([season, score]) => {
            totals[season as Season] += score as number;
        });
    });

    const best = Object.entries(totals).reduce((a, b) => (a[1] > b[1] ? a : b));
    return best[0] as Season;
}

export default function TestPage() {
    const t = useTranslations('test');
    const locale = useLocale();
    const router = useRouter();
    const { data: session } = useSession();

    const questions = t.raw('questions') as any[];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex) / questions.length) * 100;
    const isLastQuestion = currentIndex === questions.length - 1;
    const existingAnswer = answers.find((a) => a.questionId === currentQuestion.id);

    const handleSelect = (optionId: string) => {
        setSelectedOption(optionId);
    };

    const handleNext = async () => {
        if (!selectedOption && !existingAnswer) return;

        const option = currentQuestion.options.find(
            (o: any) => o.id === (selectedOption || existingAnswer?.optionId)
        );

        const newAnswer: Answer = {
            questionId: currentQuestion.id,
            optionId: selectedOption || existingAnswer!.optionId,
            scores: option.scores,
        };

        const updatedAnswers = [
            ...answers.filter((a) => a.questionId !== currentQuestion.id),
            newAnswer,
        ];
        setAnswers(updatedAnswers);

        if (isLastQuestion) {
            const result = calculateResult(updatedAnswers);

            // Save to Firestore if logged in
            if (session?.user?.email) {
                try {
                    const totals: SeasonScores = { spring: 0, summer: 0, autumn: 0, winter: 0 };
                    updatedAnswers.forEach((a) => {
                        Object.entries(a.scores).forEach(([s, score]) => {
                            totals[s as Season] += score as number;
                        });
                    });

                    await setDoc(
                        doc(db, 'users', session.user.email),
                        {
                            name: session.user.name,
                            email: session.user.email,
                            image: session.user.image,
                            season: result,
                            seasonScores: totals,
                            testedAt: new Date().toISOString(),
                        },
                        { merge: true }
                    );
                } catch (e) {
                    console.error('Failed to save result:', e);
                }
            }

            router.push(`/${locale}/result?season=${result}`);
            return;
        }

        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prev) => prev + 1);
            const nextQuestion = questions[currentIndex + 1];
            const nextAnswer = answers.find((a) => a.questionId === nextQuestion?.id);
            setSelectedOption(nextAnswer?.optionId || null);
            setIsTransitioning(false);
        }, 300);
    };

    const handlePrev = () => {
        if (currentIndex === 0) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prev) => prev - 1);
            const prevQuestion = questions[currentIndex - 1];
            const prevAnswer = answers.find((a) => a.questionId === prevQuestion?.id);
            setSelectedOption(prevAnswer?.optionId || null);
            setIsTransitioning(false);
        }, 300);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50/30 to-blue-50/50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        {t('title')}
                    </h1>
                    <p className="text-gray-500">{t('subtitle')}</p>
                </div>

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>{t('question')} {currentIndex + 1} {t('of')} {questions.length}</span>
                        <span>{Math.round((currentIndex / questions.length) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full progress-bar"
                            style={{ width: `${((currentIndex + (selectedOption || existingAnswer ? 1 : 0)) / questions.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <div
                    className={`card p-8 mb-6 transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                        }`}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                            {currentIndex + 1}
                        </div>
                        <h2 className="text-gray-800 text-lg md:text-xl font-semibold leading-relaxed">
                            {currentQuestion.text}
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {currentQuestion.options.map((option: any) => {
                            const isSelected =
                                selectedOption === option.id ||
                                (!selectedOption && existingAnswer?.optionId === option.id);
                            return (
                                <button
                                    key={option.id}
                                    onClick={() => handleSelect(option.id)}
                                    className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 ${isSelected
                                            ? 'border-pink-400 bg-gradient-to-r from-pink-50 to-purple-50 shadow-sm'
                                            : 'border-gray-100 bg-white hover:border-pink-200 hover:bg-pink-50/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all duration-200 flex items-center justify-center ${isSelected
                                                    ? 'border-pink-500 bg-pink-500'
                                                    : 'border-gray-300'
                                                }`}
                                        >
                                            {isSelected && (
                                                <div className="w-2 h-2 rounded-full bg-white" />
                                            )}
                                        </div>
                                        <span className={`${isSelected ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>
                                            {option.text}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-3">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 font-medium transition-all duration-200 ${currentIndex === 0
                                ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                                : 'border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-600'
                            }`}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t('prev')}
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!selectedOption && !existingAnswer}
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 ${selectedOption || existingAnswer
                                ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:from-pink-500 hover:to-purple-600 shadow-md hover:shadow-lg hover:scale-[1.02]'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {isLastQuestion ? (
                            <>
                                <CheckCircle className="w-4 h-4" />
                                {t('submit')}
                            </>
                        ) : (
                            <>
                                {t('next')}
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>

                {/* Question dots */}
                <div className="flex justify-center gap-1.5 mt-6">
                    {questions.map((_, i) => (
                        <div
                            key={i}
                            className={`rounded-full transition-all duration-300 ${i === currentIndex
                                    ? 'w-6 h-2 bg-gradient-to-r from-pink-400 to-purple-500'
                                    : i < currentIndex
                                        ? 'w-2 h-2 bg-pink-300'
                                        : 'w-2 h-2 bg-gray-200'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
