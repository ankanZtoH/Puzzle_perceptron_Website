"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// --- Game Configurations ---
const levels = [
    {
        id: 1,
        name: "Initialization",
        questions: [
            { id: 1, q: "What is the output of: console.log(typeof NaN)?", p: "Output?", a: "Number" }, // N
            { id: 2, q: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?", p: "Riddle...", a: "Map" }, // M
            { id: 3, q: "What is 2 + 2 in base 4?", p: "Calculate...", a: "10" }, // 1
            { id: 4, q: "The more you take, the more you leave behind. What am I?", p: "Riddle...", a: "Footsteps" }, // F
            { id: 5, q: "What protocol is used for secure web browsing?", p: "Acronym...", a: "HTTPS" }, // H
        ]
    },
    {
        id: 2,
        name: "Extraction",
        questions: [
            { id: 1, q: "Which data structure follows LIFO?", p: "Type...", a: "Stack" }, // S
            { id: 2, q: "What comes once in a minute, twice in a moment, but never in a thousand years?", p: "Riddle...", a: "M" }, // M
            { id: 3, q: "What converts high-level code to machine code all at once?", p: "Tool...", a: "Compiler" }, // C
            { id: 4, q: "Who is the 'father of the computer'?", p: "Name...", a: "Babbage" }, // B
            { id: 5, q: "I speak without a mouth and hear without ears. What am I?", p: "Riddle...", a: "Echo" }, // E
        ]
    },
    {
        id: 3,
        name: "Decryption",
        questions: [
            { id: 1, q: "What key is used to refresh a page?", p: "Key...", a: "F5" }, // F
            { id: 2, q: "What do you call a function that calls itself?", p: "Concept...", a: "Recursive" }, // R
            { id: 3, q: "Binary representation of 5?", p: "Bits...", a: "101" }, // 1
            { id: 4, q: "What is the main circuit board in a computer?", p: "Hardware...", a: "Motherboard" }, // M
            { id: 5, q: "I have keys but no locks. I have a space but no room. You can enter, but can't go outside. What am I?", p: "Device...", a: "Keyboard" }, // K
        ]
    },
    {
        id: 4,
        name: "Firewall Breach",
        questions: [
            { id: 1, q: "Protocol for sending emails?", p: "Acronym...", a: "SMTP" }, // S
            { id: 2, q: "What acts as a bridge between the OS and hardware?", p: "Concept...", a: "Kernel" }, // K
            { id: 3, q: "In OOP, what concept hides implementation details?", p: "Concept...", a: "Encapsulation" }, // E
            { id: 4, q: "Default HTTP port?", p: "Number...", a: "80" }, // 8
            { id: 5, q: "Language of the web?", p: "Language...", a: "HTML" }, // H
        ]
    },
    {
        id: 5,
        name: "System Core",
        questions: [
            { id: 1, q: "What does 'CPU' stand for (first word)?", p: "Word...", a: "Central" }, // C
            { id: 2, q: "Smallest unit of data in a computer?", p: "Unit...", a: "Bit" }, // B
            { id: 3, q: "What is the opposite of 'upload'?", p: "Action...", a: "Download" }, // D
            { id: 4, q: "Name of the first electronic general-purpose computer?", p: "Acronym...", a: "ENIAC" }, // E
            { id: 5, q: "Volatile memory is known as?", p: "Acronym...", a: "RAM" }, // R
        ]
    }
];

// --- Icons ---
const BrainIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.5h.5a3 3 0 0 1 3 3v.5a3 3 0 0 1 3 3v.5a3 3 0 0 1 3 3v.5a2.5 2.5 0 0 1-2.5 2.5H9.5a2.5 2.5 0 0 1-2.5-2.5v-11A2.5 2.5 0 0 1 9.5 2z" />
        <path d="M12 4.5A2.5 2.5 0 0 0 9.5 2a2.5 2.5 0 0 0-2.5 2.5v11a2.5 2.5 0 0 0 2.5 2.5h2.5" />
        <path d="M14.5 19.5A2.5 2.5 0 0 0 17 17v-8a3 3 0 0 0-3-3" />
    </svg>
);

const PuzzleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
        <path d="M19.5 14.25v-2.5a2.25 2.25 0 0 0-2.25-2.25H15v-1.5a2.25 2.25 0 0 0-2.25-2.25h-1.5a2.25 2.25 0 0 0-2.25 2.25v1.5H6.75A2.25 2.25 0 0 0 4.5 11.75v2.5a2.25 2.25 0 0 0 2.25 2.25h2.25v1.5a2.25 2.25 0 0 0 2.25 2.25h1.5a2.25 2.25 0 0 0 2.25-2.25v-1.5h2.25a2.25 2.25 0 0 0 2.25-2.25z" />
    </svg>
);

const NetworkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
        <rect x="16" y="16" width="6" height="6" rx="1" />
        <rect x="2" y="16" width="6" height="6" rx="1" />
        <rect x="9" y="2" width="6" height="6" rx="1" />
        <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
        <path d="M12 12V8" />
    </svg>
);

const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const KeyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
);

const ChipIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3" /><path d="M15 1v3" /><path d="M9 20v3" /><path d="M15 20v3" />
        <path d="M20 9h3" /><path d="M20 14h3" /><path d="M1 9h3" /><path d="M1 14h3" />
    </svg>
);


export default function QuestionsPage() {
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [passwordInput, setPasswordInput] = useState("");
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [timeLeft, setTimeLeft] = useState(5400); // 90 minutes
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // UI States
    const [shake, setShake] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showEmptyError, setShowEmptyError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isGameComplete, setIsGameComplete] = useState(false);

    const currentLevel = levels[currentLevelIndex];

    // Compute password dynamically
    const levelPassword = currentLevel.questions.map(q => q.a.charAt(0)).join("").toUpperCase();

    useEffect(() => {
        if (!isTimerRunning || timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(p => p - 1), 1000);
        return () => clearInterval(timer);
    }, [isTimerRunning, timeLeft]);

    // Reset inputs when level changes
    useEffect(() => {
        setAnswers({});
        setPasswordInput("");
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [currentLevelIndex]);

    const handleInputChange = (id: number, value: string) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const cleanString = (str: string) => str.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!passwordInput.trim()) {
            setShowEmptyError(true);
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setTimeout(() => setShowEmptyError(false), 1000);
            return;
        }

        if (cleanString(passwordInput) === levelPassword) {
            setShowSuccess(true);
            await new Promise(r => setTimeout(r, 3000)); // Show success animation for 3s
            setShowSuccess(false);

            if (currentLevelIndex < levels.length - 1) {
                setCurrentLevelIndex(prev => prev + 1);
            } else {
                setIsGameComplete(true);
                setIsTimerRunning(false);
            }
        } else {
            setShake(true);
            setShowError(true);
            setTimeout(() => {
                setShake(false);
                setShowError(false);
            }, 1000); // 1 second timeout
        }
    };

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60).toString().padStart(2, '0');
        const sec = (seconds % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };

    if (isGameComplete) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-mono">
                <h1 className="text-6xl text-green-500 font-bold mb-4 animate-bounce">SYSTEM HACKED</h1>
                <p className="text-xl text-zinc-400">Time Remaining: {formatTime(timeLeft)}</p>
                <p className="mt-8 text-2xl text-white">CONGRATULATIONS, USER.</p>
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-red-900 selection:text-white relative">

            {/* --- MODALS (Unblurred) --- */}

            {/* ACCESS DENIED */}
            {showError && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center font-mono animate-[fadeIn_0.1s_ease-out] bg-red-900/40 backdrop-blur-sm">
                    {/* Dark overlay specifically for the modal interaction */}
                    <div className="absolute inset-0 bg-black/60" onClick={() => setShowError(false)} />

                    <div className="relative z-20 text-center w-full max-w-3xl overflow-hidden p-8">
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                            <div className="text-[10rem] font-black text-red-600 animate-pulse">!</div>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-black text-red-600 mb-6 tracking-tighter uppercase glitch-text drop-shadow-[0_0_10px_rgba(220,38,38,0.8)] scale-100">
                            ACCESS DENIED
                        </h2>

                        <div className="space-y-2 font-bold text-red-400 text-lg tracking-[0.2em] animate-pulse">
                            <p>{`> ENCRYPTION KEY MISMATCH`}</p>
                            <p>{`> TRACING IP ADDRESS...`}</p>
                            <p>{`> LOCKING DOWN SYSTEM...`}</p>
                        </div>

                        <div className="mt-8">
                            <div className="inline-block border border-red-600 text-red-600 px-6 py-2 text-lg font-bold uppercase tracking-widest bg-black/80 animate-bounce">
                                SECURITY BREACH DETECTED
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ACCESS GRANTED */}
            {showSuccess && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center font-mono bg-black animate-[fadeIn_0.5s_ease-out]">
                    <div className="relative z-20 text-center w-full max-w-4xl p-8">
                        <div className="text-green-500 text-left mb-8 text-sm md:text-base opacity-70 font-bold font-mono space-y-2">
                            <p className="animate-[matrix-fade_2s_ease-in-out_infinite]">{`> ESTABLISHING SECURE CONNECTION...`}</p>
                            <p className="animate-[fadeIn_0.5s_ease-in_forwards_0.5s] opacity-0 text-blue-400">{`> BYPASSING FIREWALL... [DONE]`}</p>
                            <p className="animate-[fadeIn_0.5s_ease-in_forwards_1.0s] opacity-0 text-yellow-400">{`> INJECTING PAYLOAD... 0x4F3A`}</p>
                            <p className="animate-[fadeIn_0.5s_ease-in_forwards_1.5s] opacity-0 text-red-500">{`> SYSTEM OVERRIDE... SUCCESS.`}</p>
                        </div>

                        <h2 className="text-6xl md:text-9xl font-black text-green-500 mb-6 tracking-tighter animate-[pulse_0.1s_ease-in-out_infinite] scale-y-110 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)] glitch-text">
                            ACCESS GRANTED
                        </h2>

                        <h3 className="text-3xl md:text-5xl font-bold text-green-400 mb-8 tracking-[0.5em] animate-pulse drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
                            LEVEL {currentLevel.id} CLEARED
                        </h3>

                        <div className="w-full bg-green-900/30 h-4 mt-8 overflow-hidden rounded-none border border-green-500/50">
                            <div className="h-full bg-green-500 animate-[progress_2s_steps(20)_forwards] shadow-[0_0_10px_#22c55e]"></div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs font-mono text-green-400">
                            <span>UPLOAD RATE: 40TB/s</span>
                            <span>VIRUS UPLOAD... 99%</span>
                        </div>
                    </div>
                </div>
            )}

            {/* --- MAIN CONTENT (Blurred when modal active) --- */}
            <div className={`h-full w-full flex flex-col transition-all duration-500 ${showError || showSuccess ? 'blur-md brightness-50 scale-[0.99]' : ''}`}>

                {/* Timer & Level Indicator */}
                <div className="absolute top-4 right-10 z-50 pointer-events-none flex gap-4">
                    <div className="bg-black text-green-500 px-4 py-2 text-lg font-mono font-bold border-l-4 border-green-500">
                        LVL {currentLevel.id}/5
                    </div>
                    <div className="bg-black text-red-500 px-6 py-2 text-2xl font-mono font-bold border-l-4 border-red-500">
                        <span className="mr-2">T-MINUS</span>
                        {formatTime(timeLeft)}
                    </div>
                </div>

                <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                    <div className="max-w-5xl mx-auto pt-10 pb-20">
                        <header className="mb-20 text-center relative z-10">
                            <div className="inline-block mb-6 px-3 py-1 bg-red-900/20 text-red-500 text-sm font-medium animate-pulse font-mono tracking-widest">
                                SECURITY LAYER: {currentLevel.name.toUpperCase()}
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white drop-shadow-2xl">
                                THE GAUNTLET
                            </h1>
                            <p className="text-zinc-400 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
                                Solve the riddles. <span className="text-red-500 font-bold">First letter = Password.</span>
                            </p>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                            {currentLevel.questions.map((q) => (
                                <div key={q.id} className="group relative">
                                    <div className="relative bg-zinc-900/40 border-l-4 border-zinc-700 hover:border-white p-8 transition-all duration-300">
                                        <div className="flex items-start gap-6">
                                            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-black text-zinc-500 font-mono text-lg font-bold">
                                                0{q.id}
                                            </div>
                                            <div className="flex-grow space-y-4">
                                                <label htmlFor={`q-${q.id}`} className="block text-2xl font-bold text-gray-100 tracking-tight whitespace-pre-wrap font-mono">
                                                    {q.q}
                                                </label>
                                                <div className="relative group/input">
                                                    <input
                                                        type="text"
                                                        id={`q-${q.id}`}
                                                        placeholder={q.p}
                                                        value={answers[q.id] || ""}
                                                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                                                        className="w-full bg-transparent border-b border-zinc-800 px-0 py-3 text-lg text-white placeholder-zinc-700 focus:outline-none focus:border-red-600 transition-all duration-300 font-mono"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-12 pb-20 max-w-2xl mx-auto">
                                <div className={`relative p-8 bg-zinc-900/20 border-l-4 border-red-600 backdrop-blur-sm transition-all duration-100 ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
                                    <h3 className="text-xl font-bold text-center mb-6 text-red-500 uppercase tracking-widest font-mono">
                                        Security Checkpoint | Level {currentLevel.id}
                                    </h3>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <input
                                            type="text"
                                            placeholder="ENTER PASSWORD"
                                            value={passwordInput}
                                            onChange={(e) => setPasswordInput(e.target.value.toUpperCase())}
                                            className="flex-1 bg-black border border-zinc-800 px-6 py-4 text-center text-2xl font-mono tracking-[0.5em] text-white focus:outline-none focus:border-red-600 transition-colors uppercase"
                                        />
                                        <button
                                            type="submit"
                                            className="px-8 py-4 bg-white text-black font-bold text-lg hover:bg-red-600 hover:text-white transition-all duration-300 uppercase tracking-wider font-mono border-none outline-none"
                                        >
                                            Unlock
                                        </button>
                                    </div>
                                    {showEmptyError && (
                                        <div className="absolute left-0 right-0 -bottom-8 text-center text-red-500 font-mono font-bold text-sm animate-pulse tracking-wider">
                                            [ PLEASE ENTER PASSWORD ]
                                        </div>
                                    )}
                                </div>
                            </div>
                        </form>

                        {/* Puzzle Elements Background */}
                        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                            <div className="absolute top-10 left-10 text-zinc-800 text-9xl opacity-20 puzzle-float" style={{ animationDelay: '0s' }}>01</div>
                            <div className="absolute top-1/2 right-20 text-red-900/20 text-8xl opacity-30 puzzle-float font-mono" style={{ animationDelay: '2s' }}>{`{ }`}</div>
                            <div className="absolute bottom-20 left-1/3 text-zinc-800 text-9xl opacity-20 puzzle-float rotate-90" style={{ animationDelay: '4s' }}>∑</div>
                            <div className="absolute top-1/4 left-1/4 text-zinc-800/30 text-6xl puzzle-float" style={{ animationDelay: '1s' }}>π</div>
                            <div className="absolute bottom-10 right-10 text-red-900/10 text-[10rem] puzzle-float font-mono" style={{ animationDelay: '3s' }}>ERROR</div>

                            {/* SVG Icons */}
                            <BrainIcon className="absolute top-20 right-1/3 w-32 h-32 text-green-500/30 puzzle-float" />
                            <PuzzleIcon className="absolute bottom-1/4 left-10 w-40 h-40 text-blue-500/30 puzzle-float" />
                            <NetworkIcon className="absolute top-1/3 right-10 w-24 h-24 text-purple-500/30 puzzle-float" />

                            {/* New Icons */}
                            <LockIcon className="absolute top-40 left-1/4 w-28 h-28 text-red-500/20 puzzle-float" style={{ animationDelay: '1.5s' }} />
                            <KeyIcon className="absolute bottom-1/3 right-20 w-36 h-36 text-yellow-500/20 puzzle-float" style={{ animationDelay: '3.5s' }} />
                            <ChipIcon className="absolute top-10 right-1/4 w-20 h-20 text-cyan-500/20 puzzle-float" style={{ animationDelay: '2.5s' }} />
                            <BrainIcon className="absolute bottom-10 right-1/3 w-24 h-24 text-pink-500/20 puzzle-float" style={{ animationDelay: '4s' }} />
                            <PuzzleIcon className="absolute top-1/2 left-20 w-16 h-16 text-orange-500/20 puzzle-float" style={{ animationDelay: '0.5s' }} />
                        </div>

                        {/* Background decoration */}
                        <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #222 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.2 }}></div>
                        <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
