"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "../context/GameContext"; // Import Global State
import TokenModal from "@/components/TokenModal"; // Import Token Modal
import TokenStatus from "@/components/TokenStatus"; // Import TokenStatus
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import ResultPage from "../result/page";

import { levels } from "../data/levels";


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
    const {
        useToken,
        addReward,
        resetLevelTokens,
        userName,
        setGameWon,
        setFinalTime,
        usedClues,
        markClueUsed,
        setLevelsCleared,
        markQuestionSolved,
        solvedQuestionIds,
        disqualifyUser
    } = useGame(); // Use Global State
    const router = useRouter(); // Use Router
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [passwordInput, setPasswordInput] = useState("");
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [validationStatus, setValidationStatus] = useState<Record<number, 'correct' | 'incorrect' | null>>({});
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // UI States
    const [shake, setShake] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showEmptyError, setShowEmptyError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isGameComplete, setIsGameComplete] = useState(false);

    // New States
    const [guessCount, setGuessCount] = useState(0);
    const [showLockdown, setShowLockdown] = useState(false);
    const [activeTokenQuestion, setActiveTokenQuestion] = useState<number | null>(null);
    // const [usedClues, setUsedClues] = useState<Record<number, ('easy' | 'hard' | 'skip')[]>>({}); // MOVED TO CONTEXT
    const [clueMessage, setClueMessage] = useState<React.ReactNode | null>(null);
    const [timeLeft, setTimeLeft] = useState(5400); // 90 minutes
    const [showRules, setShowRules] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(true);

    const currentLevel = levels[currentLevelIndex];

    // Compute password dynamically
    const levelPassword = currentLevel.questions.map(q => q.a.charAt(0)).join("").toUpperCase();

    // --- TAB SWITCH DETECTION (ANTI-CHEAT) ---
    // --- NAVIGATION & FULLSCREEN LOCKDOWN ---
    useEffect(() => {
        // Prevent back navigation
        window.history.pushState(null, "", window.location.href);
        const handlePopState = () => {
            window.history.pushState(null, "", window.location.href);
        };
        window.addEventListener("popstate", handlePopState);

        // Block Refresh Shortcuts (F5, Ctrl+R, Cmd+R) & Escape
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                e.key === 'F5' ||
                (e.ctrlKey && e.key === 'r') ||
                (e.metaKey && e.key === 'r') ||
                e.key === 'Escape'
            ) {
                e.preventDefault();
                if (!isGameComplete && !showLockdown) {
                    disqualifyUser(userName);
                    setShowLockdown(true);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        // Tab Switch / Minimize Detection
        const handleVisibilityChange = () => {
            if (document.hidden && !isGameComplete && !showLockdown) {
                disqualifyUser(userName);
                setShowLockdown(true);
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Warn on unload (Standard Browser Warning)
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = '';
        };
        window.addEventListener("beforeunload", handleBeforeUnload);

        // Check fullscreen
        const checkFullscreen = () => {
            if (!document.fullscreenElement) {
                // If they exit fullscreen manually (without Escape somehow, or browser UI), warn them.
                // Escape key is caught above.
                setIsFullscreen(false);
            } else {
                setIsFullscreen(true);
                // Attempt to lock keyboard (Chrome/Edge only)
                const nav = navigator as any;
                if (nav.keyboard && typeof nav.keyboard.lock === 'function') {
                    nav.keyboard.lock(['Escape'])
                        .catch((err: any) => console.log("Keyboard lock failed:", err));
                }
            }
        };

        // Listen for fullscreen change
        document.addEventListener('fullscreenchange', checkFullscreen);

        // Initial check
        checkFullscreen();

        return () => {
            window.removeEventListener("popstate", handlePopState);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener("beforeunload", handleBeforeUnload);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.removeEventListener('fullscreenchange', checkFullscreen);
        };
    }, [userName, disqualifyUser, isGameComplete, showLockdown]);

    // Check if already disqualified


    useEffect(() => {
        if (isGameComplete) return; // Prevent re-execution loop

        if (timeLeft <= 0) {
            // Calculate pending rewards for current level before timeout
            let currentLevelReward = 0;
            currentLevel.questions.forEach(q => {
                const isSolved = solvedQuestionIds.includes(q.id);
                const isSkipped = usedClues[q.id]?.includes('skip');

                if (isSolved && !isSkipped) {
                    currentLevelReward += 80;
                }
            });

            if (currentLevelReward > 0) {
                addReward(currentLevelReward);
            }

            setFinalTime(0); // Time is up
            setIsGameComplete(true);

            // Allow state updates to propagate
            setTimeout(() => {
                router.push('/result');
            }, 500);
            return;
        }
        const timer = setInterval(() => setTimeLeft(p => p - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, router, setFinalTime, currentLevel, solvedQuestionIds, usedClues, addReward, isGameComplete]);

    // Reset inputs when level changes
    useEffect(() => {
        resetLevelTokens(currentLevelIndex); // Reset tokens for the new level
        setAnswers({});
        // usedClues is now global and persistent, so we don't reset it here
        setPasswordInput("");
        setGuessCount(0); // Reset guess count
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [currentLevelIndex]);

    const handleInputChange = (id: number, value: string) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const cleanString = (str: string) => str.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    const normalizeAnswer = (str: string) => str.trim().toLowerCase();



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (showLockdown) return;

        if (!passwordInput.trim()) {
            setShowEmptyError(true);
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setTimeout(() => setShowEmptyError(false), 1000);
            return;
        }

        if (cleanString(passwordInput) === levelPassword) {
            setShowSuccess(true);

            await new Promise(r => setTimeout(r, 1500)); // Show success animation for 1.5s
            setShowSuccess(false);

            if (currentLevelIndex < levels.length - 1) {
                // Calculate rewards: 80 points per manually solved question
                // Exclude questions where 'skip' token was used
                let skippedCount = 0;
                currentLevel.questions.forEach(q => {
                    if (usedClues[q.id]?.includes('skip')) {
                        skippedCount++;
                    }
                });

                const manualSolvedCount = currentLevel.questions.length - skippedCount;
                const reward = manualSolvedCount * 80;

                if (reward > 0) {
                    addReward(reward);
                }

                setLevelsCleared(currentLevelIndex + 1); // Track completion
                setCurrentLevelIndex(prev => prev + 1);
            } else {
                // Determine rewards for the final level
                let skippedCount = 0;
                currentLevel.questions.forEach(q => {
                    if (usedClues[q.id]?.includes('skip')) {
                        skippedCount++;
                    }
                });
                const manualSolvedCount = currentLevel.questions.length - skippedCount;
                const reward = manualSolvedCount * 80;
                if (reward > 0) {
                    addReward(reward);
                }

                // 🔴 FINAL LEVEL COMPLETED — CALL BACKEND HERE 🔴

                // try {
                //     const contestantId = localStorage.getItem("contestantId");

                //     if (contestantId) {
                //         await fetch("http://localhost:8000/api/finish/", {
                //             method: "POST",
                //             headers: {
                //                 "Content-Type": "application/json",
                //             },
                //             body: JSON.stringify({
                //                 id: contestantId,
                //             }),
                //         });

                //         // optional: prevent re-submission
                //         localStorage.removeItem("contestantId");
                //     }
                // } catch (err) {
                //     console.error("Finish API failed", err);
                // }

                setIsGameComplete(true);
                setGameWon(true);
                setFinalTime(timeLeft);
                setLevelsCleared(levels.length); // All levels cleared

                // Allow state updates to propagate before navigating
                setTimeout(() => {
                    router.push("/result");
                }, 500);
            }

        } else {
            setShake(true);
            setShowError(true);

            // VALIDATE ALL ANSWERS ON WRONG PASSWORD
            const newValidationStatus: Record<number, 'correct' | 'incorrect' | null> = {};

            currentLevel.questions.forEach(q => {
                const userAnswer = answers[q.id];
                if (userAnswer) {
                    const isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(q.a);
                    newValidationStatus[q.id] = isCorrect ? 'correct' : 'incorrect';

                    if (isCorrect) {
                        markQuestionSolved(q.id);
                    }
                }
            });

            setValidationStatus(prev => ({ ...prev, ...newValidationStatus }));

            // Increment guess count
            const newGuessCount = guessCount + 1;
            setGuessCount(newGuessCount);

            if (newGuessCount >= 5) {
                disqualifyUser(userName); // Permanent disqualification
                setShowLockdown(true);
                // Wait for error animation to finish before showing lockdown
            } else {
                setTimeout(() => {
                    setShake(false);
                    setShowError(false);
                }, 1000); // 1 second timeout
            }
        }
    };

    const handleGameOver = () => {
        router.push("/"); // Redirect to Home
    };

    const handleTokenSelect = (type: 'easy' | 'hard' | 'skip') => {
        if (activeTokenQuestion === null) return;

        // Check if already used
        // Check if already used or if skip has been used
        if (usedClues[activeTokenQuestion]?.includes(type)) return;
        if (usedClues[activeTokenQuestion]?.includes('skip')) return; // If skip used, nothing else allowed
        if (type !== 'skip' && usedClues[activeTokenQuestion]?.includes('skip')) return; // Redundant but safe

        let cost = 0;
        if (type === 'easy') cost = 40;
        if (type === 'hard') cost = 60;
        if (type === 'skip') cost = 150;

        const success = useToken(type, cost);

        if (success) {
            const question = currentLevel.questions.find(q => q.id === activeTokenQuestion);
            if (!question) return;

            if (type === 'easy') {
                setClueMessage(<div className="flex flex-col items-center gap-2"><span className="font-bold text-blue-400">EASY CLUE:</span> <div>{question.easyClue}</div></div>);
            } else if (type === 'hard') {
                setClueMessage(<div className="flex flex-col items-center gap-2"><span className="font-bold text-red-400">HARD CLUE:</span> <div>{question.hardClue}</div></div>);
            } else if (type === 'skip') {
                if (!usedClues[activeTokenQuestion]?.includes('skip')) {
                    // Ensure no other tokens are used, or just override?
                    // User rule: "if user uses skip token then any other token can't be use for that question"
                    // This implies Skip is exclusive.
                    // But if they ALREADY used easy/hard, can they use skip? Usually yes, skip is the bailout.
                    // The rule probably means "Once Skip is used, disable others".
                    // AND "If Skip is used, you can't use others". 
                    // So we just track it. The Modal/UI should disable buttons if 'skip' is present in usedClues.
                }
                handleInputChange(activeTokenQuestion, question.a);
                setClueMessage("QUESTION BYPASSED. ANSWER INJECTED.");
            }

            // Track used clue
            markClueUsed(activeTokenQuestion, type);
        }

        setActiveTokenQuestion(null);
    };




    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60).toString().padStart(2, '0');
        const sec = (seconds % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };

    if (isGameComplete) {
        return (
            // <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-mono">
            //     <h1 className="text-6xl text-green-500 font-bold mb-4 animate-bounce">SYSTEM HACKED</h1>
            //     <p className="mt-8 text-2xl text-white">CONGRATULATIONS, USER.</p>
            // </div>
            <ResultPage />
        );
    }

    return (
        <div className="h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-red-900 selection:text-white relative">

            <TokenStatus
                showHardToken={currentLevelIndex >= 3}
                levelName={currentLevel.name.toUpperCase()}
            />

            <TokenModal
                isOpen={activeTokenQuestion !== null}
                onClose={() => setActiveTokenQuestion(null)}
                onSelect={handleTokenSelect}
                showHardToken={currentLevelIndex >= 3} // Only show Hard Token for Level 4+ (Index 3+)
                usedTokens={activeTokenQuestion ? usedClues[activeTokenQuestion] || [] : []}
            />

            {/* CLUE MODAL */}
            {clueMessage && (
                <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
                    <div className="bg-zinc-900 border border-blue-500/50 p-8 rounded-xl max-w-lg w-full text-center shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                        <h3 className="text-2xl font-bold text-blue-400 mb-4 font-mono">INTELLIGENCE RECEIVED</h3>
                        <div className="text-white text-lg font-mono mb-8">{clueMessage}</div>
                        <button
                            onClick={() => setClueMessage(null)}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded font-bold tracking-wider"
                        >
                            ACKNOWLEDGE
                        </button>
                    </div>
                </div>
            )}

            {/* RULES MODAL */}
            {showRules && (
                <div className="fixed inset-0 z-[260] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in">
                    <div className="bg-zinc-900 border border-zinc-700 p-8 rounded-xl max-w-4xl w-full h-[80vh] flex flex-col shadow-[0_0_50px_rgba(255,255,255,0.1)] relative">
                        <button
                            onClick={() => setShowRules(false)}
                            className="absolute top-4 right-4 text-zinc-400 hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>

                        <h2 className="text-3xl font-bold mb-6 text-center text-white border-b border-zinc-700 pb-4 font-mono">MISSION PARAMETERS</h2>

                        <div className="overflow-y-auto flex-1 pr-2 space-y-6 text-zinc-300 font-mono">
                            <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800">
                                <h3 className="text-green-500 font-bold mb-2">01. ZERO TOLERANCE</h3>
                                <p>External assistance, answer sharing, or Tab switch is strictly prohibited. Any violation will result in immediate disqualification.</p>
                            </div>

                            <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800">
                                <h3 className="text-green-500 font-bold mb-2">02. TIME CONSTRAINT</h3>
                                <p>You have a strict 90-minute window to breach the system. The countdown begins immediately upon entry. Time is your scarcest resource.</p>
                            </div>

                            <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800">
                                <h3 className="text-green-500 font-bold mb-2">03. PRECISION</h3>
                                <p>All answers are case-insensitive but spelling-sensitive. Read every clue with extreme care; details matter.</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800">
                                    <h3 className="text-green-500 font-bold mb-2">04. RESOURCE MANAGEMENT</h3>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between border-b border-zinc-700/50 pb-1"><span>Initial Balance:</span> <span className="text-green-400">300 Pts</span></div>
                                        <div className="flex justify-between border-b border-zinc-700/50 pb-1"><span>Correct Answer:</span> <span className="text-green-400">+80 Pts</span></div>
                                        <div className="flex justify-between text-zinc-400 pt-1"><span>Usage Costs:</span></div>
                                        <div className="pl-4 space-y-1">
                                            <div className="flex justify-between"><span>Easy Hint:</span> <span className="text-yellow-500">50 Pts</span></div>
                                            <div className="flex justify-between"><span>Hard Hint:</span> <span className="text-orange-500">100 Pts</span></div>
                                            <div className="flex justify-between"><span>Skip Level:</span> <span className="text-red-500">200 Pts</span></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800">
                                    <h3 className="text-green-500 font-bold mb-2">05. TOKEN LIMITS</h3>
                                    <div className="space-y-1 text-sm">
                                        <div className="font-bold text-zinc-400">Level Allocations:</div>
                                        <ul className="list-disc list-inside pl-2 space-y-1 text-zinc-300">
                                            <li><span className="text-zinc-500">Levels 1-3:</span> 2 Easy / Level</li>
                                            <li><span className="text-zinc-500">Levels 4-5:</span> 2 Easy + 2 Hard / Level</li>
                                        </ul>
                                        <div className="border-t border-zinc-700/50 pt-2 mt-2">
                                            <span className="text-zinc-400">Global Limit:</span> 3 Skip tokens total.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowRules(false)}
                            className="mt-6 w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold font-mono tracking-widest rounded transition-all"
                        >
                            CLOSE
                        </button>
                    </div>
                </div>
            )}

            {/* LOCKDOWN MODAL (GAME OVER) */}
            {showLockdown && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center bg-red-950/90 backdrop-blur-md p-4 animate-in zoom-in duration-300">
                    <div className="text-center max-w-2xl w-full border-4 border-red-600 p-10 bg-black shadow-[0_0_50px_rgba(220,38,38,0.5)]">
                        <h1 className="text-5xl md:text-7xl font-black text-red-600 mb-6 glitch-text">SYSTEM FAILURE</h1>
                        <p className="text-red-400 text-xl font-mono mb-8 uppercase tracking-widest">
                            CRITICAL SECURITY VIOLATION.<br />
                            USER SESSION TERMINATED.
                        </p>
                        <button
                            onClick={handleGameOver}
                            className="bg-red-600 hover:bg-red-500 text-black px-10 py-4 text-xl font-bold tracking-[0.2em] animate-pulse rounded-sm"
                        >
                            TERMINATE SESSION
                        </button>
                    </div>
                </div>
            )}

            {/* FULLSCREEN WARNING MODAL */}
            {!isFullscreen && !isGameComplete && !showLockdown && (
                <div className="fixed inset-0 z-[400] bg-black/95 flex items-center justify-center backdrop-blur-xl p-4">
                    <div className="text-center max-w-xl w-full border border-red-500/50 p-8 rounded-lg bg-zinc-900/50">
                        <h1 className="text-red-500 font-mono font-bold text-3xl mb-4 animate-pulse">SECURITY VIOLATION</h1>
                        <p className="text-zinc-300 font-mono mb-8">
                            FULL SCREEN MODE IS MANDATORY.<br />
                            RETURN TO SECURE VIEW IMMEDIATELY.
                        </p>
                        <button
                            onClick={() => document.documentElement.requestFullscreen().catch(console.error)}
                            className="bg-red-600 hover:bg-red-500 text-black px-8 py-3 font-bold font-mono tracking-widest rounded transition-all"
                        >
                            RESTORE SECURE VIEW
                        </button>
                    </div>
                </div>
            )}

            {/* --- MODALS (Unblurred) --- */}

            {/* ACCESS DENIED */}
            {showError && !showLockdown && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center font-mono animate-[fadeIn_0.1s_ease-out] bg-red-900/40 backdrop-blur-sm p-4">
                    {/* Dark overlay specifically for the modal interaction */}
                    <div className="absolute inset-0 bg-black/60" onClick={() => setShowError(false)} />

                    <div className="relative z-20 text-center w-full max-w-3xl overflow-hidden p-6 md:p-8">
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                            <div className="text-[5rem] md:text-[10rem] font-black text-red-600 animate-pulse">!</div>
                        </div>

                        <h2 className="text-4xl md:text-7xl font-black text-red-600 mb-6 tracking-tighter uppercase glitch-text drop-shadow-[0_0_10px_rgba(220,38,38,0.8)] scale-100">
                            ACCESS DENIED
                        </h2>

                        <div className="space-y-2 font-bold text-red-400 text-sm md:text-lg tracking-[0.2em] animate-pulse">
                            <p>{`> ENCRYPTION KEY MISMATCH`}</p>
                            <p>{`> LOCKING DOWN SYSTEM... ATTEMPT ${guessCount}/5`}</p>
                        </div>

                        <div className="mt-8">
                            <div className="inline-block border border-red-600 text-red-600 px-4 py-2 md:px-6 md:py-2 text-sm md:text-lg font-bold uppercase tracking-widest bg-black/80 animate-bounce">
                                ENTER CORRECT PASSWORD
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ACCESS GRANTED */}
            {showSuccess && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center font-mono bg-black animate-[fadeIn_0.5s_ease-out] p-4">
                    <div className="relative z-20 text-center w-full max-w-4xl p-6 md:p-8">
                        <div className="text-green-500 text-left mb-8 text-xs md:text-base opacity-70 font-bold font-mono space-y-2">
                            <p className="animate-[matrix-fade_2s_ease-in-out_infinite]">{`> ESTABLISHING SECURE CONNECTION...`}</p>
                            <p className="animate-[fadeIn_0.5s_ease-in_forwards_0.5s] opacity-0 text-blue-400">{`> BYPASSING FIREWALL... [DONE]`}</p>
                            <p className="animate-[fadeIn_0.5s_ease-in_forwards_1.0s] opacity-0 text-yellow-400">{`> INJECTING PAYLOAD... 0x4F3A`}</p>
                            <p className="animate-[fadeIn_0.5s_ease-in_forwards_1.5s] opacity-0 text-red-500">{`> SYSTEM OVERRIDE... SUCCESS.`}</p>
                        </div>

                        <h2 className="text-4xl md:text-9xl font-black text-green-500 mb-6 tracking-tighter animate-[pulse_0.1s_ease-in-out_infinite] scale-y-110 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)] glitch-text">
                            ACCESS GRANTED
                        </h2>

                        <h3 className="text-xl md:text-5xl font-bold text-green-400 mb-8 tracking-[0.5em] animate-pulse drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
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
            <div className={`h-full w-full flex flex-col transition-all duration-500 ${showError || showSuccess || showLockdown || activeTokenQuestion || clueMessage || (!isFullscreen && !isGameComplete) ? 'blur-md brightness-50 scale-[0.99]' : ''}`}>

                {/* Timer & Level Indicator */}
                <div className="absolute top-20 right-4 md:right-10 z-50 pointer-events-none flex flex-col md:flex-row gap-2 md:gap-4 items-end">
                    <div className="bg-black text-red-500 px-3 py-1 md:px-6 md:py-2 text-lg md:text-2xl font-mono font-bold border-l-2 md:border-l-4 border-red-500">
                        <span className="mr-2 text-xs md:text-base">T-MINUS</span>
                        {formatTime(timeLeft)}
                    </div>
                </div>

                {/* RULES BUTTON (Top Left) */}
                <div className="absolute top-20 left-4 md:left-10 z-[60] flex flex-col md:flex-row gap-2 md:gap-4 items-start">
                    <button
                        onClick={() => setShowRules(true)}
                        className="bg-black/80 hover:bg-zinc-900 text-zinc-300 hover:text-white px-4 py-2 text-sm md:text-base font-mono font-bold border border-zinc-700 hover:border-zinc-500 rounded transition-all flex items-center gap-2 backdrop-blur-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        RULES
                    </button>
                </div>

                <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide">
                    <div className="max-w-5xl mx-auto pt-16 md:pt-10 pb-20">
                        <header className="mb-20 text-center relative z-10">
                            <h1 className="text-4xl md:text-7xl font-black mb-3 tracking-tighter text-white drop-shadow-2xl">
                                THE GAUNTLET
                            </h1>
                            <div className="text-red-500 font-mono text-xl tracking-[0.3em] mb-4 animate-pulse">
                                USER:{userName || 'UNKNOWN'}
                            </div>
                            <p className="text-zinc-400 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed">
                                Solve the riddles. <span className="text-red-500 font-bold">First letter = Password.</span>
                            </p>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                            {currentLevel.questions.map((q) => (
                                <div key={q.id} className="group relative">
                                    <div className="relative bg-zinc-900/40 border-l-4 border-zinc-700 hover:border-white p-4 md:p-8 transition-all duration-300">
                                        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                                            <div className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center bg-black text-zinc-500 font-mono text-sm md:text-lg font-bold">
                                                0{q.id}
                                            </div>
                                            <div className="flex-grow space-y-4 w-full">
                                                <div className="flex justify-between items-start">
                                                    <label htmlFor={`q-${q.id}`} className="block text-sm md:text-xl font-bold text-gray-100 tracking-tight whitespace-pre-wrap font-mono">
                                                        {q.q}
                                                    </label>


                                                    {/* PROMPT: TOKEN BUTTON */}
                                                    <button
                                                        type="button"
                                                        onClick={() => setActiveTokenQuestion(q.id)}
                                                        className="ml-4 w-15 px-3 py-1 bg-blue-900/30 text-blue-400 border border-blue-500/30 rounded text-xs md:text-xs font-mono hover:bg-blue-500 hover:text-black transition-colors"
                                                    >
                                                        USE TOKEN
                                                    </button>
                                                </div>

                                                {/* VISUAL COMPONENT (e.g. Q2) */}
                                                {q.visualComponent}

                                                {/* IMAGE (e.g. Q25) */}
                                                {q.image && (
                                                    <div className="w-full max-w-lg mx-auto my-6 border border-zinc-700 rounded-lg overflow-hidden">
                                                        <img src={q.image} alt="Puzzle Image" className="w-full h-auto" />
                                                    </div>
                                                )}

                                                <div className="relative group/input">
                                                    {q.type === 'mcq' && q.options ? (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-4">
                                                            {q.options.map((option) => (
                                                                <button
                                                                    key={option}
                                                                    type="button"
                                                                    onClick={() => handleInputChange(q.id, option)}
                                                                    className={`px-4 py-3 md:px-6 md:py-4 text-left font-mono text-sm md:text-lg transition-all duration-300 border rounded-xl ${answers[q.id] === option
                                                                        ? 'bg-red-900/40 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                                                                        : 'bg-zinc-900/50 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:bg-zinc-800'
                                                                        }`}
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full border flex items-center justify-center ${answers[q.id] === option ? 'border-red-500' : 'border-zinc-600'
                                                                            }`}>
                                                                            {answers[q.id] === option && (
                                                                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500" />
                                                                            )}
                                                                        </div>
                                                                        {option}
                                                                    </div>
                                                                </button>
                                                            ))}

                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col gap-2">
                                                            <input
                                                                type="text"
                                                                id={`q-${q.id}`}
                                                                placeholder={q.p}
                                                                value={answers[q.id] || ""}
                                                                onChange={(e) => handleInputChange(q.id, e.target.value)}
                                                                className="w-full bg-transparent border-b border-zinc-800 px-0 py-3 text-base md:text-lg text-white placeholder-zinc-700 focus:outline-none focus:border-red-600 transition-all duration-300 font-mono"
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* UNIFIED BOTTOM FOOTER: Clues (Left) + Validate (Right) */}
                                                <div className="flex flex-col md:flex-row justify-between items-end mt-6 gap-4">

                                                    {/* CLUES DISPLAY - Left Side */}
                                                    <div className="flex-1 w-full flex flex-col gap-2">
                                                        {usedClues[q.id]?.includes('easy') && (
                                                            <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded text-blue-400 font-mono text-sm backdrop-blur-sm self-start max-w-xl">
                                                                <strong className="block text-xs uppercase tracking-wider mb-1 text-blue-300">Easy Clue:</strong>
                                                                {q.easyClue}
                                                            </div>
                                                        )}
                                                        {usedClues[q.id]?.includes('hard') && (
                                                            <div className="p-3 bg-red-900/20 border border-red-500/30 rounded text-red-400 font-mono text-sm backdrop-blur-sm self-start max-w-xl">
                                                                <strong className="block text-xs uppercase tracking-wider mb-1 text-red-300">Hard Clue:</strong>
                                                                {q.hardClue}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* VALIDATE BUTTON AREA - Right Side (REMOVED BUTTON, ONLY STATUS) */}
                                                    <div className="flex flex-col items-end gap-2 flex-shrink-0 min-h-[40px] justify-center">
                                                        {validationStatus[q.id] === 'correct' && (
                                                            <div className="flex items-center gap-2 text-green-500 font-bold font-mono text-sm uppercase tracking-wider animate-pulse bg-green-500/10 px-3 py-1 rounded border border-green-500/30">
                                                                <span>✓ Right Answer</span>
                                                            </div>
                                                        )}
                                                        {validationStatus[q.id] === 'incorrect' && (
                                                            <div className="flex items-center gap-2 text-red-500 font-bold font-mono text-sm uppercase tracking-wider animate-pulse bg-red-500/10 px-3 py-1 rounded border border-red-500/30">
                                                                <span>✗ Wrong Answer</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-8 md:pt-12 pb-20 max-w-2xl mx-auto">
                                <div className={`relative p-6 md:p-8 bg-zinc-900/20 border-l-4 border-red-600 backdrop-blur-sm transition-all duration-100 ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
                                    <h3 className="text-lg md:text-xl font-bold text-center mb-6 text-red-500 uppercase tracking-widest font-mono">
                                        Security Checkpoint | Level {currentLevel.id}
                                    </h3>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <input
                                            type="text"
                                            placeholder="ENTER PASSWORD"
                                            value={passwordInput}
                                            onChange={(e) => setPasswordInput(e.target.value.toUpperCase())}
                                            className="flex-1 bg-black border border-zinc-800 px-4 py-3 md:px-6 md:py-4 text-center text-xl md:text-2xl font-mono tracking-[0.3em] md:tracking-[0.5em] text-white focus:outline-none focus:border-red-600 transition-colors uppercase w-full"
                                        />
                                        <button
                                            type="submit"
                                            className="px-6 py-3 md:px-8 md:py-4 bg-white text-black font-bold text-base md:text-lg hover:bg-red-600 hover:text-white transition-all duration-300 uppercase tracking-wider font-mono border-none outline-none"
                                        >
                                            Unlock
                                        </button>
                                    </div>
                                    <div className="text-center mt-2 text-red-800 font-mono text-xs">
                                        ATTEMPTS: {guessCount}/5
                                    </div>
                                    {showEmptyError && (
                                        <div className="absolute left-0 right-0 -bottom-8 text-center text-red-500 font-mono font-bold text-xs md:text-sm animate-pulse tracking-wider">
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
