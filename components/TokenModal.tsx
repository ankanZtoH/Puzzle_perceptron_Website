"use client";

import React from 'react';
import { useGame } from "@/app/context/GameContext";

interface TokenModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (type: 'easy' | 'hard' | 'skip') => void;
    showHardToken?: boolean;
    usedTokens?: ('easy' | 'hard' | 'skip')[];
}

export default function TokenModal({ isOpen, onClose, onSelect, showHardToken = true, usedTokens = [] }: TokenModalProps) {
    const { tokens, rewards } = useGame();

    if (!isOpen) return null;

    const handleSelect = (type: 'easy' | 'hard' | 'skip', cost: number) => {
        if (tokens[type] > 0 && rewards >= cost) {
            onSelect(type);
        }
    };

    const getButtonState = (type: 'easy' | 'hard' | 'skip', cost: number) => {
        const hasToken = tokens[type] > 0;
        const canAfford = rewards >= cost;
        const isUsed = usedTokens.includes(type);
        const isSkipped = usedTokens.includes('skip');

        if (isUsed) return { disabled: true, text: "ALREADY USED" };
        if (isSkipped) return { disabled: true, text: "SKIPPED" }; // Disable others if skipped
        if (!hasToken) return { disabled: true, text: "NO TOKENS" };
        if (!canAfford) return { disabled: true, text: "INSUFFICIENT FUNDS" };
        return { disabled: false, text: "SELECT" };
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-zinc-900 border border-white/20 p-6 md:p-8 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                >
                    ✕
                </button>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-orbitron text-center">
                    DEPLOY COUNTERMEASURE
                </h2>
                <p className="text-zinc-400 text-center mb-8 font-mono text-sm">
                    Select a token to bypass security protocols.
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                    {/* Easy Token */}
                    <div className="w-full md:w-1/3 bg-green-900/10 border border-green-500/30 p-4 rounded-lg flex flex-col items-center gap-4 hover:border-green-500 transition-colors">
                        <div className="text-4xl">🧩</div>
                        <div className="text-center">
                            <h3 className="text-green-500 font-bold text-lg">EASY CLUE</h3>
                            <p className="text-zinc-400 text-xs mt-1">Reveal a simple hint.</p>
                        </div>
                        <div className="mt-auto w-full space-y-2">
                            <div className="flex justify-between text-xs font-mono text-zinc-300">
                                <span>COST:</span> <span className="text-yellow-400">50 PTS</span>
                            </div>
                            <div className="flex justify-between text-xs font-mono text-zinc-300">
                                <span>REMAINING:</span> <span className="text-white">{tokens.easy}</span>
                            </div>
                            <button
                                onClick={() => handleSelect('easy', 50)}
                                disabled={getButtonState('easy', 50).disabled}
                                className={`w-full py-2 font-bold text-sm rounded ${getButtonState('easy', 50).disabled ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 text-black'}`}
                            >
                                {getButtonState('easy', 50).text}
                            </button>
                        </div>
                    </div>

                    {/* Hard Token */}
                    {showHardToken && (
                        <div className="w-full md:w-1/3 bg-orange-900/10 border border-orange-500/30 p-4 rounded-lg flex flex-col items-center gap-4 hover:border-orange-500 transition-colors">
                            <div className="text-4xl">🔍</div>
                            <div className="text-center">
                                <h3 className="text-orange-500 font-bold text-lg">HARD CLUE</h3>
                                <p className="text-zinc-400 text-xs mt-1">Reveal a specific detail.</p>
                            </div>
                            <div className="mt-auto w-full space-y-2">
                                <div className="flex justify-between text-xs font-mono text-zinc-300">
                                    <span>COST:</span> <span className="text-yellow-400">100 PTS</span>
                                </div>
                                <div className="flex justify-between text-xs font-mono text-zinc-300">
                                    <span>REMAINING:</span> <span className="text-white">{tokens.hard}</span>
                                </div>
                                <button
                                    onClick={() => handleSelect('hard', 100)}
                                    disabled={getButtonState('hard', 100).disabled}
                                    className={`w-full py-2 font-bold text-sm rounded ${getButtonState('hard', 100).disabled ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-500 text-black'}`}
                                >
                                    {getButtonState('hard', 100).text}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Skip Token */}
                    <div className="w-full md:w-1/3 bg-red-900/10 border border-red-500/30 p-4 rounded-lg flex flex-col items-center gap-4 hover:border-red-500 transition-colors">
                        <div className="text-4xl">⏩</div>
                        <div className="text-center">
                            <h3 className="text-red-500 font-bold text-lg">AUTO-SOLVE</h3>
                            <p className="text-zinc-400 text-xs mt-1">Skip this question.</p>
                        </div>
                        <div className="mt-auto w-full space-y-2">
                            <div className="flex justify-between text-xs font-mono text-zinc-300">
                                <span>COST:</span> <span className="text-yellow-400">250 PTS</span>
                            </div>
                            <div className="flex justify-between text-xs font-mono text-zinc-300">
                                <span>REMAINING:</span> <span className="text-white">{tokens.skip}</span>
                            </div>
                            <button
                                onClick={() => handleSelect('skip', 250)}
                                disabled={getButtonState('skip', 250).disabled}
                                className={`w-full py-2 font-bold text-sm rounded ${getButtonState('skip', 250).disabled ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 text-black'}`}
                            >
                                {getButtonState('skip', 250).text}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
