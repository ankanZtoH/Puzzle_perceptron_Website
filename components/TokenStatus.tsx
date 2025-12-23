"use client";

import { useGame } from "@/app/context/GameContext";
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({ subsets: ["latin"] });

interface TokenStatusProps {
    showHardToken?: boolean;
    levelName?: string;
}

export default function TokenStatus({ showHardToken = true, levelName }: TokenStatusProps) {
    const { rewards, tokens } = useGame();

    return (
        <div className={`fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md border-b border-white/10 z-[100] px-4 py-2 flex justify-between items-center text-xs md:text-sm font-mono text-white`}>
            {/* Center Level Name */}
            {levelName && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 font-bold tracking-widest text-xs md:text-sm whitespace-nowrap">
                    SECURITY LAYER: {levelName}
                </div>
            )}

            <div className="flex items-center gap-6">
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                    <span className="text-yellow-500 font-bold tracking-widest">REWARDS</span>
                    <span className={`${orbitron.className} text-xl md:text-2xl text-white`}>{rewards}</span>
                </div>

                <div className="h-8 w-px bg-white/20 hidden md:block"></div>

                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] text-green-400 font-bold">EASY</span>
                        <span className={`${orbitron.className} text-lg`}>{tokens.easy}</span>
                    </div>
                    {showHardToken && (
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] text-orange-400 font-bold">HARD</span>
                            <span className={`${orbitron.className} text-lg`}>{tokens.hard}</span>
                        </div>
                    )}
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] text-red-500 font-bold">SKIP</span>
                        <span className={`${orbitron.className} text-lg`}>{tokens.skip}</span>
                    </div>
                </div>
            </div>

            <div className="hidden md:block text-right opacity-50 text-[10px]">
                <div>SYS.STATUS: ONLINE</div>
                <div>SEC_LEVEL: MAX</div>
            </div>
        </div>
    );
}
