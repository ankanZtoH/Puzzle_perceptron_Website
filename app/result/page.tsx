"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '../context/GameContext';

export default function ResultPage() {
    const router = useRouter();
    const { isDisqualified } = useGame();

    useEffect(() => {
        // Optional: If not disqualified, maybe shouldn't be here? 
        // But for now, let's assume this page handles the display.
    }, []);

    return (
        <div className="min-h-screen bg-black text-red-600 font-mono flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
                style={{ backgroundImage: 'radial-gradient(circle at center, #300 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            <div className="z-10 text-center max-w-4xl border-4 border-red-600 p-10 bg-black/90 backdrop-blur shadow-[0_0_50px_rgba(220,38,38,0.5)] animate-in zoom-in duration-300">
                <h1 className="text-6xl md:text-9xl font-black mb-4 tracking-tighter glitch-text animate-pulse">
                    DISQUALIFIED
                </h1>

                <div className="w-full h-1 bg-red-600 my-8"></div>

                <div className="space-y-4 text-xl md:text-2xl tracking-widest font-bold">
                    <p className="typewriter-text">{`> EXTERNAL SIGNAL DETECTED`}</p>
                    <p className="typewriter-text delay-75">{`> TAB SWITCHING IS PROHIBITED`}</p>
                </div>

                <div className="mt-12 p-4 border border-red-800 bg-red-950/30 text-red-300 font-mono text-sm md:text-base">
                    SESSION TERMINATED. YOU WILL NOT BE ELIGIBLE FOR REWARD.
                </div>
            </div>
        </div>
    );
}
