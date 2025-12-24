"use client";

import Link from "next/link";
import { useState } from "react";
import { Orbitron, Rajdhani } from 'next/font/google';

const orbitron = Orbitron({ subsets: ["latin"] });
const rajdhani = Rajdhani({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"] });

export default function RulesPage() {
    const [accepted, setAccepted] = useState(false);

    return (
        <div className={`min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden selection:bg-red-900 selection:text-white`}>

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>

            <div className="max-w-4xl w-full relative z-10 border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-6 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">

                {/* Header */}
                <header className="mb-10 text-center border-b border-zinc-700 pb-8">
                    <div className="inline-block px-3 py-1 bg-red-900/20 text-red-500 text-xs font-mono tracking-widest mb-4 border border-red-900/30">
                        READ CAREFULLY
                    </div>
                    <h1 className={`${orbitron.className} text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500`}>
                        RULES
                    </h1>
                </header>

                {/* Rules List */}
                <div className={`${rajdhani.className} space-y-6 text-lg md:text-2xl text-zinc-300 font-medium`}>
                    <RuleItem number="01" title="ZERO TOLERANCE" description="External assistance or AI collaboration is strictly prohibited. Violators will be disqualified." />
                    <RuleItem number="02" title="TIME CONSTRAINT" description="You have exactly 90 minutes to breach the system. The timer begins immediately upon entry." />
                    <RuleItem number="03" title="PRECISION" description="All answers are case-insensitive unless specified. Format matters. Read the clues carefully." />
                    <RuleItem number="04" title="RESOURCE MANAGEMENT" description="Tokens are limited. Use your skips and hints wisely. There is no turning back." />
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
                            <Link href="/questions" className="flex-1 md:flex-none">
                                <button className="w-full md:w-auto px-10 py-4 bg-green-600 hover:bg-green-500 text-black font-bold font-mono tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all animate-pulse">
                                    INITIATE SEQUENCE
                                </button>
                            </Link>
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

function RuleItem({ number, title, description }: { number: string, title: string, description: string }) {
    return (
        <div className="flex gap-4 md:gap-6 items-start group hover:bg-zinc-900/50 p-4 rounded-lg transition-colors border border-transparent hover:border-zinc-800">
            <span className="font-mono text-green-500/50 font-bold text-xl group-hover:text-green-500 transition-colors">
                {number}
            </span>
            <div>
                <h3 className="text-white font-bold tracking-wider mb-1 group-hover:text-green-400 transition-colors uppercase">{title}</h3>
                <p className="text-zinc-500 group-hover:text-zinc-400 transition-colors leading-relaxed">{description}</p>
            </div>
        </div>
    );
}
