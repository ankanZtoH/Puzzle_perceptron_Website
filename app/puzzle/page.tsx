"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from '../context/GameContext';

const START_PASSWORD = "perceptron";

export default function NamePage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { setUserName } = useGame();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        if (name.trim() && password === START_PASSWORD) {
            setUserName(name.trim());
            setIsLoading(true);
            // Simulate "Accessing" delay
            await new Promise((resolve) => setTimeout(resolve, 3000));
            router.push("/rules");
        } else if (password !== START_PASSWORD) {
            setError("Incorrect password. Please ask the organizer for the start password.");
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white z-50 overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80"></div>

                {/* Stars background effect */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-75"></div>
                    <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-white rounded-full animate-pulse delay-150"></div>
                    <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
                    {/* Moving stars/speed lines could be added here for extra effect */}
                </div>

                <div className="relative z-10 animate-[flyUp_2s_ease-in_forwards_1s]">
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

                <h2 className="mt-12 text-2xl font-mono tracking-[0.5em] text-white animate-pulse z-10">
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
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-black/50 backdrop-blur-sm text-white">
            <div className="w-full max-w-md p-8 bg-black/60 rounded-2xl shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-300">
                <h1 className="text-3xl font-bold mb-6 text-center">Identify Yourself</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                            required
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Enter start password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                            required
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm font-semibold text-center animate-pulse">
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-yellow-400/20 cursor-pointer"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
}
