"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Orbitron, Rajdhani } from 'next/font/google';
import { useGame } from '../context/GameContext';

const orbitron = Orbitron({ subsets: ["latin"] });
const rajdhani = Rajdhani({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"] });

export default function RulesPage() {
    const router = useRouter();
    const [accepted, setAccepted] = useState(false);
    const { userName } = useGame();

    return (
        <div className={`min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden selection:bg-red-900 selection:text-white`}>

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>

            <div className="max-w-4xl w-full relative z-10 border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-6 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">

                {/* Header */}
                <header className="mb-10 text-center border-b border-zinc-700 pb-8">
                    <div className="inline-block px-3 py-1 bg-red-900/20 text-red-500 text-xs font-mono tracking-widest mb-4 border border-red-900/30">
                        Welcome to Puzzle Competition <span className="text-white font-bold">{userName || 'UNKNOWN'}</span>
                    </div>
                    <h1 className={`${orbitron.className} text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500`}>
                        RULES
                    </h1>
                </header>

                {/* Rules List */}
                {/* Rules List */}
                <div className={`${rajdhani.className} space-y-8 text-lg text-zinc-300 font-medium`}>
                    <RuleItem
                        number="01"
                        title="ZERO TOLERANCE"
                        description="External assistance, answer sharing, or Tab switch is strictly prohibited. Any violation will result in immediate disqualification."
                    />
                    <RuleItem
                        number="02"
                        title="TIME CONSTRAINT"
                        description="You have a strict 90-minute window to breach the system. The countdown begins immediately upon entry. Time is your scarcest resource."
                    />
                    <RuleItem
                        number="03"
                        title="PRECISION"
                        description="All answers are case-insensitive but spelling-sensitive. Read every clue with extreme care; details matter."
                    />

                    {/* Resource Grid for Better Readability */}
                    <div className="grid md:grid-cols-2 gap-4 my-2">
                        <RuleItem
                            number="04"
                            title="RESOURCE MANAGEMENT"
                            description={
                                <div className="space-y-1 mt-2 text-base">
                                    <div className="flex justify-between border-b border-zinc-700/50 pb-1"><span>Initial Balance:</span> <span className="text-green-400">300 Pts</span></div>
                                    <div className="flex justify-between border-b border-zinc-700/50 pb-1"><span>Correct Answer:</span> <span className="text-green-400">+80 Pts</span></div>
                                    <div className="flex justify-between text-zinc-400 pt-1"><span>Usage Costs:</span></div>
                                    <div className="pl-4 text-sm space-y-1">
                                        <div className="flex justify-between"><span>Easy Hint:</span> <span className="text-yellow-500">50 Pts</span></div>
                                        <div className="flex justify-between"><span>Hard Hint:</span> <span className="text-orange-500">100 Pts</span></div>
                                        <div className="flex justify-between"><span>Skip Level:</span> <span className="text-red-500">200 Pts</span></div>
                                    </div>
                                </div>
                            }
                        />
                        <RuleItem
                            number="05"
                            title="TOKEN LIMITS"
                            description={
                                <div className="space-y-1 mt-2 text-base">
                                    <div className="font-bold text-zinc-400">Level Allocations (Refreshes per Level):</div>
                                    <ul className="list-disc list-inside pl-2 space-y-1 text-zinc-300">
                                        <li><span className="text-zinc-500">Levels 1-3:</span> 2 Easy Tokens / Level</li>
                                        <li><span className="text-zinc-500">Levels 4-5:</span> 2 Easy + 2 Hard Tokens / level</li>
                                    </ul>
                                    <div className="border-t border-zinc-700/50 pt-2 mt-2">
                                        <span className="text-zinc-400">Global Limit:</span> 3 Auto-Solve (Skip) tokens total across the entire game.
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>

                {/* Action Area */}
                <div className="mt-12 flex flex-col items-center gap-6">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-6 h-6 border-2 flex items-center justify-center transition-all duration-300 ${accepted ? 'border-green-500 bg-green-500/20' : 'border-zinc-600 group-hover:border-zinc-400'}`}>
                            {accepted && <div className="w-3 h-3 bg-green-500"></div>}
                        </div>
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={accepted}
                            onChange={(e) => setAccepted(e.target.checked)}
                        />
                        <span className="font-mono text-sm md:text-base text-zinc-400 group-hover:text-white transition-colors uppercase tracking-wider">
                            I acknowledge and accept the terms
                        </span>
                    </label>

                    <div className="flex gap-4 w-full md:w-auto">
                        <Link href="/" className="flex-1 md:flex-none">
                            <button className="w-full md:w-auto px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-bold font-mono tracking-widest transition-all">
                                ABORT
                            </button>
                        </Link>

                        {accepted ? (
                            <button
                                onClick={() => {
                                    document.documentElement.requestFullscreen().catch((err) => {
                                        console.log("Full screen request denied:", err);
                                    });
                                    router.push("/questions");
                                }}
                                className="flex-1 md:flex-none w-full md:w-auto px-10 py-4 bg-green-600 hover:bg-green-500 text-black font-bold font-mono tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all animate-pulse cursor-pointer">
                                START
                            </button>
                        ) : (
                            <button disabled className="flex-1 md:flex-none w-full md:w-auto px-10 py-4 bg-zinc-900 border border-zinc-800 text-zinc-600 font-bold font-mono tracking-widest cursor-not-allowed opacity-50">
                                LOCATING USER...
                            </button>
                        )}
                    </div>
                </div>

                {/* Decorative Footer */}
                <div className="mt-8 text-center text-xs font-mono text-zinc-700">
                    SECURED CONNECTION :: IP_LOGGED :: {new Date().getFullYear()}
                </div>
            </div>
        </div>
    );
}

function RuleItem({ number, title, description }: { number: string, title: string, description: React.ReactNode }) {
    return (
        <div className="flex gap-4 md:gap-6 items-start group hover:bg-zinc-900/50 p-4 rounded-lg transition-colors border border-transparent hover:border-zinc-800">
            <span className="font-mono text-green-500/50 font-bold text-xl group-hover:text-green-500 transition-colors">
                {number}
            </span>
            <div>
                <h3 className="text-white font-bold tracking-wider mb-1 group-hover:text-green-400 transition-colors uppercase">{title}</h3>
                <div className="text-zinc-500 group-hover:text-zinc-400 transition-colors leading-relaxed">{description}</div>
            </div>
        </div>
    );
}
