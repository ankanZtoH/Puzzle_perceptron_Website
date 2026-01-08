"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '../context/GameContext';

import { levels } from '../data/levels';

export default function ResultPage() {
    const router = useRouter();
    const { isDisqualified, gameWon, userName, rewards, finalTime, tokens, usedClues } = useGame();

    useEffect(() => {
        // If arrived here without playing (no disqualification, no win), redirect home
        if (!isDisqualified && !gameWon) {
            // Optional: could allow accessing /result for debugging, but typically should redirect
            // router.push('/');
        }
    }, [isDisqualified, gameWon, router]);

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60).toString().padStart(2, '0');
        const sec = (seconds % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };

    if (isDisqualified) {
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

    // if (gameWon) {
    //     return (

    //     );
    // }

    // Default Fallback (e.g., direct access)
    return (
        // <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">
        //     <div className="text-center opacity-50">
        //         <p>INITIALIZING...</p>
        //     </div>
        // </div>
        <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Matrix/Cyber Background */}
            <div className="fixed inset-0 pointer-events-none opacity-10"
                style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(34, 197, 94, .3) 25%, rgba(34, 197, 94, .3) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, .3) 75%, rgba(34, 197, 94, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(34, 197, 94, .3) 25%, rgba(34, 197, 94, .3) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, .3) 75%, rgba(34, 197, 94, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}>
            </div>

            <div className="max-w-5xl w-full z-10 border border-green-500/30 bg-black/80 backdrop-blur-md p-8 md:p-12 shadow-[0_0_100px_rgba(34,197,94,0.2)] animate-in slide-in-from-bottom duration-700">

                <header className="text-center mb-12 border-b border-green-900/50 pb-8">
                    <div className="inline-block px-4 py-1 bg-green-900/20 text-green-400 text-xs font-mono tracking-[0.3em] mb-4 border border-green-500/30 rounded-full">
                        OPERATION SUCCESSFUL
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(34,197,94,0.8)] mb-2">
                        REPORT
                    </h1>
                    <p className="text-red-500 font-bold uppercase tracking-widest text-sm md:text-lg">
                        TEAM: <span className="text-green-400 font-bold">{userName || 'UNKNOWN'}</span>
                    </p>
                </header>

                <div className="">
                    {/* Primary Stats */}
                    <div className="space-y-8 flex justify-center gap-40">
                        <div className="mb-0 bg-zinc-900/30 border-l-4 border-green-500 p-6 relative overflow-hidden group hover:bg-zinc-900/50 transition-colors">
                            <div className="absolute top-0 right-0 p-2 text-green-800 opacity-20">
                                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                            </div>
                            <div className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-1">Time Remaining</div>
                            <div className="text-5xl md:text-6xl font-black text-white font-mono tracking-tight">
                                {formatTime(finalTime)}
                            </div>
                            <div className="text-green-600 text-lg mt-2 font-mono">
                                {Math.floor((5400 - finalTime) / 60)} MIN {(5400 - finalTime) % 60} SEC ELAPSED
                            </div>
                        </div>

                        <div className="bg-zinc-900/30 border-l-4 border-yellow-500 p-6 relative overflow-hidden group hover:bg-zinc-900/50 transition-colors">
                            <div className="absolute top-0 right-0 p-2 text-yellow-800 opacity-20">
                                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            </div>
                            <div className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-1">Final Score</div>
                            <div className="text-5xl md:text-6xl font-black text-yellow-500 font-mono tracking-tight">
                                {rewards}
                            </div>
                            <div className="text-yellow-600/60 text-xs mt-2 font-mono">
                                POINTS ACCUMULATED
                            </div>
                        </div>
                    </div>

                    {/* Detailed Analysis */}
                    <div className="mt-16 max-w-4xl mx-auto">
                        <h3 className="text-white font-bold tracking-widest uppercase mb-8 border-b border-zinc-800 pb-4 text-center text-2xl">
                            Tactical Breakdown
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {levels.flatMap(l => l.questions).map((q) => {
                                const clues = usedClues[q.id] || [];
                                let status = "CLEAN SOLVE";
                                let color = "text-green-500";
                                let bg = "bg-green-900/10 border-green-900/30";

                                if (clues.includes('skip')) {
                                    status = "BYPASSED";
                                    color = "text-red-500";
                                    bg = "bg-red-900/10 border-red-900/30";
                                } else if (clues.includes('hard')) {
                                    status = "HEAVY ASSIST";
                                    color = "text-orange-500";
                                    bg = "bg-orange-900/10 border-orange-900/30";
                                } else if (clues.includes('easy')) {
                                    status = "MINOR ASSIST";
                                    color = "text-yellow-500";
                                    bg = "bg-yellow-900/10 border-yellow-900/30";
                                }

                                return (
                                    <div key={q.id} className={`flex justify-between items-center p-3 border rounded ${bg}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="font-mono text-zinc-500 font-bold text-sm">Q{q.id.toString().padStart(2, '0')}</div>
                                            <div className="text-zinc-300 text-sm truncate max-w-[200px]" title={q.q}>
                                                {q.q.substring(0, 30)}...
                                            </div>
                                        </div>
                                        <div className={`font-mono font-bold text-xs uppercase tracking-wider ${color}`}>
                                            {status}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>


                    {/* Secondary Details */}
                    {/* <div className="bg-zinc-900/20 border border-zinc-800 p-6 md:p-8 flex flex-col justify-between">
                        <div>
                            <h3 className="text-white font-bold tracking-widest uppercase mb-6 border-b border-zinc-800 pb-2">Inventory Status</h3>
                            <div className="space-y-4 font-mono text-sm md:text-base">
                                <div className="flex justify-between items-center text-zinc-400">
                                    <span>Easy Hints Remaining:</span>
                                    <span className="text-white font-bold">{tokens.easy}</span>
                                </div>
                                <div className="flex justify-between items-center text-zinc-400">
                                    <span>Hard Hints Remaining:</span>
                                    <span className="text-white font-bold">{tokens.hard}</span>
                                </div>
                                <div className="flex justify-between items-center text-zinc-400">
                                    <span>Skip Tokens Remaining:</span>
                                    <span className="text-white font-bold">{tokens.skip}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-zinc-800">
                            <div className="text-center">
                                <button
                                    disabled
                                    className="w-full py-4 bg-zinc-800 text-zinc-500 font-bold uppercase tracking-[0.2em] cursor-not-allowed border border-zinc-700"
                                >
                                    AWAITING EXTRACTION...
                                </button>
                                <p className="mt-4 text-xs text-zinc-600 font-mono">
                                    DO NOT CLOSE THIS TERMINAL. <br />
                                    YOUR SCORE HAS BEEN LOGGED.
                                </p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
