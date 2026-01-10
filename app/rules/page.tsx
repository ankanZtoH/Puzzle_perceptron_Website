"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Orbitron, Rajdhani } from 'next/font/google';
import { useGame } from '../context/GameContext';

const orbitron = Orbitron({ subsets: ["latin"] });
const rajdhani = Rajdhani({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"] });

export default function RulesPage() {
    const router = useRouter();
    const [accepted, setAccepted] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { userName, setUserName, isTeamBanned } = useGame();

    const START_PASSWORD = "perceptron";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedName = name.trim();
        if (isTeamBanned(trimmedName)) {
            setError(`TEAM '${trimmedName.toUpperCase()}' IS DISQUALIFIED. ACCESS DENIED.`);
            return;
        }

        setError("");
        if (name.trim() && password === START_PASSWORD) {
            setUserName(name.trim());
            setIsLoading(true);

            // Wait for 1.2 seconds for animation
            await new Promise((resolve) => setTimeout(resolve, 1200));

            // Request Fullscreen
            try {
                await document.documentElement.requestFullscreen();
            } catch (err) {
                console.log("Full screen request denied or failed:", err);
            }

            router.push("/questions");
        } else if (password !== START_PASSWORD) {
            setError("Incorrect password. Please ask the organizer for the start password.");
        }
    };

    return (
        <div className={`min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden selection:bg-red-900 selection:text-white`}>

            {/* FULLSCREEN LOADING OVERLAY */}
            {isLoading && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80"></div>

                    {/* Stars background effect */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                        <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-75"></div>
                        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-white rounded-full animate-pulse delay-150"></div>
                        <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
                    </div>

                    <div className="relative z-10 animate-[flyUp_1s_ease-in_forwards]">
                        {/* Rocket SVG */}
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="w-24 h-24 md:w-32 md:h-32 text-white animate-[rumble_0.2s_linear_infinite]"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 2.5C12 2.5 7.5 8.5 7.5 13.5C7.5 17.5 9.5 19.5 12 19.5C14.5 19.5 16.5 17.5 16.5 13.5C16.5 8.5 12 2.5 12 2.5Z"
                                fill="currentColor"
                            />
                            <path
                                d="M7.5 13.5L5.5 15.5C4.5 16.5 5.5 18.5 7.5 18.5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M16.5 13.5L18.5 15.5C19.5 16.5 18.5 18.5 16.5 18.5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <circle cx="12" cy="10" r="2" fill="#ef4444" />
                        </svg>

                        {/* Flame */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-12 bg-gradient-to-b from-red-500 via-orange-500 to-transparent rounded-full blur-sm animate-[flame_0.1s_linear_infinite]"></div>
                    </div>

                    <h2 className="mt-8 text-xl md:text-2xl font-mono tracking-[0.5em] text-white animate-pulse z-10">
                        LAUNCHING...
                    </h2>

                    <style jsx>{`
                        @keyframes rumble {
                        0% { transform: translate(0, 0) rotate(0deg); }
                        25% { transform: translate(-1px, 1px) rotate(-1deg); }
                        50% { transform: translate(1px, -1px) rotate(1deg); }
                        75% { transform: translate(-1px, -1px) rotate(0deg); }
                        100% { transform: translate(1px, 1px) rotate(0deg); }
                        }
                        @keyframes flyUp {
                        0% { transform: translateY(0); opacity: 1; }
                        40% { transform: translateY(20px); }
                        100% { transform: translateY(-100vh); opacity: 0; }
                        }
                        @keyframes flame {
                        0% { height: 40px; opacity: 0.8; }
                        50% { height: 60px; opacity: 1; }
                        100% { height: 40px; opacity: 0.8; }
                        }
                    `}</style>
                </div>
            )}

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
                                    if (accepted) {
                                        setShowLoginModal(true);
                                    }
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

            {/* Login Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    {/* Close on click outside */}
                    <div className="absolute inset-0" onClick={() => setShowLoginModal(false)}></div>

                    <div className="relative w-full max-w-md p-8 bg-zinc-900/90 border border-green-500/30 rounded-2xl shadow-[0_0_50px_rgba(34,197,94,0.2)]" onClick={(e) => e.stopPropagation()}>
                        <h2 className={`${orbitron.className} text-2xl font-bold mb-6 text-center text-white`}>AGENTS LOGIN</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="space-y-2">
                                <label className="text-zinc-400 font-mono text-sm uppercase">Team Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter identity..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-6 py-4 bg-black/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-green-500 transition-all font-mono"
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-zinc-400 font-mono text-sm uppercase">Password</label>
                                <input
                                    type="password"
                                    placeholder="**********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-6 py-4 bg-black/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-green-500 transition-all font-mono"
                                    required
                                />
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm font-mono text-center animate-pulse bg-red-900/10 p-2 rounded border border-red-500/20">
                                    {'>'} ERROR: {error}
                                </p>
                            )}

                            <div className="flex gap-4 mt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowLoginModal(false)}
                                    className="flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-bold font-mono rounded-xl transition-all"
                                >
                                    CANCEL
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-4 bg-green-600 hover:bg-green-500 text-black font-bold font-mono rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-green-500/20"
                                >
                                    ENTER
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
