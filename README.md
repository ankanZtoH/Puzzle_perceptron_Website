This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.






"use client";

import { useState } from "react";

// Questions configuration - Add or edit questions here
const questions = [
    {
        id: 1,
        question: "What has keys, but no locks; space, but no room; you can enter, but never go outside?",
        placeholder: "Type your answer...",
    },
    {
        id: 2,
        question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
        placeholder: "Type your answer...",
    },
    {
        id: 3,
        question: "The more you take, the more you leave behind. What am I?",
        placeholder: "Type your answer...",
    },
    {
        id: 4,
        question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
        placeholder: "Type your answer...",
    },
    {
        id: 5,
        question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
        placeholder: "Type your answer...",
    },
];

export default function QuestionsPage() {
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const handleInputChange = (id: number, value: string) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted Answers:", answers);
        // Add logic to validate answers here
    };

    return (
        <div className="h-screen w-full bg-black text-white overflow-hidden flex flex-col font-sans selection:bg-red-900 selection:text-white">
            <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                <div className="max-w-5xl mx-auto pt-10 pb-20">
                    <header className="mb-20 text-center relative z-10">
                        <div className="inline-block mb-6 px-3 py-1 border border-red-900/50 rounded-full bg-red-950/10 text-red-500 text-sm font-medium animate-pulse">
                            Warning: High Difficulty
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            THE GAUNTLET
                        </h1>
                        <p className="text-zinc-400 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
                            Five riddles stand between you and the truth. <br />
                            <span className="text-zinc-500">Crack the code to unlock the next dimension.</span>
                        </p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                        {questions.map((q) => (
                            <div
                                key={q.id}
                                className="group relative"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-900/20 to-zinc-800/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                <div className="relative bg-black border border-white/10 rounded-lg p-8 transition-all duration-300 hover:border-white/20">
                                    <div className="flex items-start gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900 border border-white/5 text-zinc-400 font-mono text-lg">
                                            0{q.id}
                                        </div>
                                        <div className="flex-grow space-y-4">
                                            <label htmlFor={`q-${q.id}`} className="block text-2xl font-bold text-gray-100 tracking-tight">
                                                {q.question}
                                            </label>
                                            <div className="relative group/input">
                                                <input
                                                    type="text"
                                                    id={`q-${q.id}`}
                                                    placeholder={q.placeholder}
                                                    value={answers[q.id] || ""}
                                                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                                                    className="w-full bg-black border-b border-zinc-700 px-0 py-3 text-lg text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-all duration-300"
                                                />
                                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-focus-within/input:w-full transition-all duration-500"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="pt-12 text-center pb-20">
                            <button
                                type="submit"
                                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-white px-8 font-medium text-black transition-all duration-300 hover:bg-gray-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                            >
                                <span className="mr-2 text-lg font-bold">Submit Answers</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-200 via-white to-gray-200 opacity-0 transition-opacity duration-500 group-hover:opacity-50"></div>
                            </button>
                        </div>
                    </form>

                    {/* Background decoration to match the 'grid' vibe of Next.js sites */}
                    <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #222 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.2 }}></div>
                    <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black"></div>
                </div>
            </div>
        </div>
    );
}
