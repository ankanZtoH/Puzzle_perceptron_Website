"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "../context/GameContext"; // Import Global State
import TokenModal from "@/components/TokenModal"; // Import Token Modal
import TokenStatus from "@/components/TokenStatus"; // Import TokenStatus
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

// --- Game Configurations ---
// --- Game Configurations ---
interface Question {
    id: number;
    type: string;
    q: string;
    p: string;
    a: string;
    easyClue: string | React.ReactNode;
    hardClue: string;
    visualComponent?: React.ReactNode;
    image?: string;
    options?: string[];
}

const levels: { id: number; name: string; questions: Question[] }[] = [
    {
        id: 1,
        name: "Level 1",
        questions: [
            {
                id: 1,
                type: "text",
                q: "What is the next term in this sequence: 1, 11, 21, 1211, 111221, ?",
                p: "Term...",
                a: "312211",
                easyClue: "Read the digits aloud.",
                hardClue: ""
            },
            {
                id: 2,
                type: "text",
                q: "What is the purple below?",
                p: "Answer...",
                a: "Colour",
                easyClue: "Ignore the meaning of the word.",
                hardClue: "",
                image: "/extracted_images-000.png"
            },
            {
                id: 3,
                type: "text",
                q: "At 3:20, what is the angle between the hour and minute hands? (Answer in degrees, e.g., 20)",
                p: "Degrees...",
                a: "20",
                easyClue: "Calculate angle for both hands keeping in mind the fact that both hands are moving continuously.",
                hardClue: ""
            },
            {
                id: 4,
                type: "text",
                q: "You have 5 lines and 10 balls and are asked to arrange them in such a way that each line has only 4 balls and not more or less. What is the name of the design?",
                p: "Design...",
                a: "Star Formation",
                easyClue: "If every requirement seems impossible, some things must be shared.",
                hardClue: ""
            },
            {
                id: 5,
                type: "text",
                q: "Cross out 10 digits from the number 1234512345123451234512345 so that the remaining no. is as large as possible.",
                p: "Number...",
                a: "55341234512345",
                easyClue: "We want as many 5's left as possible.",
                hardClue: ""
            },
        ]
    },
    {
        id: 2,
        name: "Level 2",
        questions: [
            {
                id: 6,
                type: "text",
                q: "On an island, every person either always tells truth or always lies. You meet two people, A and B. A says: \"At least one of us is a liar.\" B says: \"A is a liar.\" Who is who?",
                p: "Answer...",
                a: "A is truth-teller, B is liar",
                easyClue: "Test both possibilities for A.",
                hardClue: ""
            },
            {
                id: 7,
                type: "text",
                q: "3x4=8\n4x5=50\n5x6=30\n6x7=49\n7x8=?",
                p: "Number...",
                a: "228",
                easyClue: "Find gcd of product and 6.",
                hardClue: ""
            },
            {
                id: 8,
                type: "text",
                q: "(72, 99) -> 27\n(27, 45) -> 18\n(18, 39) -> 21\n(21, 36) -> ?\n(?, 28) -> 13\n(13, 21) -> 7. Find the missing no. based on the above pattern.",
                p: "Number...",
                a: "12",
                easyClue: "Think about fundamental mathematical operations and that each element will independently follow that pattern.",
                hardClue: ""
            },
            {
                id: 9,
                type: "text",
                q: "3 humans and 3 demons need to cross a river. There is only a single boat which can carry a maximum of 2 heads and the boat can't row without any head. Now what is the minimum number of boat rowing required to cross the river, provided if at any side, no. of demons are greater than that of no. of humans, demons will eat them and you lose.",
                p: "Number...",
                a: "11",
                easyClue: "Humans should never be left outnumbered.",
                hardClue: ""
            },
            {
                id: 10,
                type: "text",
                q: "Julius came to know that Brutus is going to assasinate him. But the doors to the Roman town hall has been locked and he has to decode this to escape – BQDOQBFDAZ. What is the real password?",
                p: "Password...",
                a: "Perceptron",
                easyClue: "Caesar cipher with shift > 10.",
                hardClue: ""
            },
        ]
    },
    {
        id: 3,
        name: "Level 3",
        questions: [
            {
                id: 11,
                type: "text",
                q: "A computer program searches for a secret number stored in memory. The number lies between 1 and 100, inclusive. The program follows a method where each comparison can only tell whether the guessed number is too high, too low, or correct. The programmer wants to guarantee that the correct number is found in the worst case, no matter what the number is. What is the minimum number of comparisons required to guarantee finding the number?",
                p: "Number...",
                a: "7",
                easyClue: "Each comparison reduces the range of possible values.",
                hardClue: ""
            },
            {
                id: 12,
                type: "text",
                q: "What is the minimum no. of weights which enable us to weigh any integer number of grams of gold from 1 to 100 on a standard balance with two pans? Weights may be placed only on the left pan.",
                p: "Number...",
                a: "63", // Keeping strictly to PDF solution, though technically it's usually 7 weights (1,2,4...64). PDF says 63.
                easyClue: "Think about the binary representation of integers.",
                hardClue: ""
            },
            {
                id: 13,
                type: "text",
                q: "Uvi and Arush sat in front of each other at a round table to play a game with coins. The rule of the game is very simple that both will place the coins simultaneously on the table, no one can place consecutive coins in a round. Also no coin can overlap other coins and the game ends if one can't place any more coin in the table. Who has the highest chance of winning the game if Uvi starts?",
                p: "Name...",
                a: "Uvi",
                easyClue: "The second player should not try to be creative - only consistent.",
                hardClue: ""
            },
            {
                id: 14,
                type: "text",
                q: "If you have a number of non uniform inflammable wire, which burns out in an hour, what would be the minimum no. of wires required to measure a time of about 75 mins. Point to note that non uniform inflammable means that if a wire burns out in an hour, it is not necessary that 50% of the wire is burnt out in half an hour, or quarter of the wire burns out in 15 mins.",
                p: "Number...",
                a: "3 wires",
                easyClue: "You can control how long a wire lasts only by choosing how many ends you light.",
                hardClue: ""
            },
            {
                id: 15,
                type: "text",
                q: "Vishal and Reddy met each other after a long time. When Reddy was asked by Vishal how he was doing after his marriage, Reddy answered that he is the father of his 3 siblings. When asked about their age, he answered that the product of their age is 72, and the sum of ages is the birth date of Vishal. When he asked for any more information, he answered that one of his sons is playing piano. What is the age of his youngest child?",
                p: "Number...",
                a: "3",
                easyClue: "The piano detail is not about music. It's about being able to point to one specific child.",
                hardClue: ""
            },
        ]
    },
    {
        id: 4,
        name: "Level 4",
        questions: [
            {
                id: 16,
                type: "text",
                q: "A house has 3 bulbs in 3 rooms whose switches are placed at the basement of the house. The switches are unmarked, i.e. one can't tell which switch lights which bulb. You decide to mark the switches for your convenience. But if you light a bulb, you can't tell which bulb lights. How many times you need to leave the basement in order to mark which switch is of which bulb, provided you can switch on any number of bulbs at a time.",
                p: "Number...",
                a: "1",
                easyClue: "Light is not the only thing a bulb can remember.",
                hardClue: "Use time. Leave one switch on long enough, then change the others before going upstairs."
            },
            {
                id: 17,
                type: "text",
                q: "There is a 100-story building from which I have to drop two eggs and do an experiment. And the test is that if I am standing on floor N, if I drop an egg from there, the egg will break, but if I drop an egg from floor N-1, the egg will not break. So how many minimum tests do I need to take to find this Nth floor?",
                p: "Number...",
                a: "14",
                easyClue: "Your first egg decides the size of your steps. Your second egg decides the exact place.",
                hardClue: "Don't test every floor equally. Reduce your jump size each time so that the worst case stays balanced."
            },
            {
                id: 18,
                type: "text",
                q: "You have a table of 100 coins, where 80 coins are faced heads up and 20 coins are faced tails up. You can't tell about the upper face of the coin by just looking or touching the coin. You need to distribute the coins in 2 sets such that each set has the same number of tails faced upwards. What would be the minimum number of coins in a set to make that happen.",
                p: "Number...",
                a: "20",
                easyClue: "You don't need to know which coins are tails to control how many tails you get.",
                hardClue: "Assume a fixed number of coins for the first set and let the second set be everything else."
            },
            {
                id: 19,
                type: "text",
                q: "In a certain year there were exactly four Fridays and exactly four Mondays in a January. On what day of the week did the 20th of January fall that year?",
                p: "Day...",
                a: "Sunday",
                easyClue: "Think if Jan 1 was a certain day of the week, when would that day of the week repeat.",
                hardClue: "Try to see that what days of Jan 1 would result in January having 5 Mondays and 5 Fridays."
            },
            {
                id: 20,
                type: "text",
                q: "Out of 2000 packets of food for an Annual NYPD Event, 1 packet is poisoned by a serial killer to kill an agent to create chaos. The man in the suit, John Reese, gets this information that the event will occur after 10 hours and the poison is slow, so the death will occur after 5 hrs during the party, through Finch’s machine. He reaches the place with Detective Fuesco to stop that. But Fuesco reminded him that to determine the poisoned food through forensic will take about 12 to 13 hours within which the poison will begin its effect. So Reese asked the manager to bring a number of Guinea pigs to determine the poisoned food. What would be the minimum number of Guinea pigs required to determine the poisoned food?",
                p: "Number...",
                a: "11",
                easyClue: "Not every detail is meant to be used. Decide first what information actually matters.",
                hardClue: "Each guinea pig can answer only one yes-or-no question."
            },
        ]
    },
    {
        id: 5,
        name: "Level 5",
        questions: [
            {
                id: 21,
                type: "text",
                q: "A game pays you $1 the first time you win, $2 the second time, $4 the third time and so on, doubling each win. The probability of winning each round is 1/2 . What is the expected total payout (calculate on average if MANY games are played, write the answer in words for eg.: Zero, One point Five, Infinity etc.)?",
                p: "Answer...",
                a: "Infinity",
                easyClue: (
                    <div className="flex flex-col items-center">
                        <p>Compute the expectation <span className="inline-block bg-white px-2 rounded text-black"><InlineMath math="\sum x p(x)" /></span> over N games as N {'->'} infinity.</p>
                    </div>
                ),
                hardClue: "The expectation diverges."
            },
            {
                id: 22,
                type: "text",
                q: "Three friends need to reach Kolkata from Purulia, which is about 300km away in such a way, that they reach Kolkata at the same time. They only have a bike where tripling is not allowed and can carry a maximum of 2 people. Now, the bike moves at a constant speed of 30kmph while they all walk at a constant speed of 10 kmph. What time would they reach Kolkata if they start their journey from Purulia at around 8am? (Write answer as in a 24-hr digital clock format, eg, 13:30, 07:50 etc)",
                p: "Time...",
                a: "12:40",
                easyClue: "If you assume the bike always moves forward, you've already made a mistake.",
                hardClue: "To keep all three together, the bike must sometimes travel in the opposite direction."
            },
            {
                id: 23,
                type: "text",
                q: "You have 25 horses and a race track and you want to find the top 3 fast horses among them. What minimum of race is required for finding that given that at a time only 5 horses can participate in the track and you are not provided with any race instrument except a pistol for starting and ribbon at the finish line. Provided all horses run at the same speed for all races.",
                p: "Number...",
                a: "7",
                easyClue: "Don't try to find the fastest horse directly. First, eliminate the slowest ones in batches.",
                hardClue: "Race the horses in fixed groups and remember the order within each group."
            },
            {
                id: 24,
                type: "text",
                q: "A circle has 3 points chosen uniformly at random on its circumference. What is the probability that the triangle formed contains the center of the circle? (Write answer in words, eg,: if answer is 0.5 write zero point five, if answer is 2.33 write two point three three etc.)",
                p: "Probability...",
                a: "Zero point two five",
                easyClue: "Think arcs.",
                hardClue: "No arc >= 180 degrees."
            },
            {
                id: 25,
                type: "text",
                q: "You have 50 people lined up in a room as given in the image. Each person is either a truth-teller, who always tells the truth, or a liar, who always lies. Each person knows the type of everyone else. The following image shows the statements of each person. Which of the person (s) is/are lying?",
                p: "Number...",
                a: "2",
                easyClue: "Is person 50 a liar? If yes, what does that tell us about person 49?",
                hardClue: "From the first clue can we find out if 47 is a liar?",
                image: "/extracted_images-002.png"
            },
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
    const { useToken, addReward, resetLevelTokens, disqualifyUser, isDisqualified, userName } = useGame(); // Use Global State
    const router = useRouter(); // Use Router
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [passwordInput, setPasswordInput] = useState("");
    const [answers, setAnswers] = useState<Record<number, string>>({});
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
    const [usedClues, setUsedClues] = useState<Record<number, ('easy' | 'hard' | 'skip')[]>>({});
    const [clueMessage, setClueMessage] = useState<React.ReactNode | null>(null);
    const [timeLeft, setTimeLeft] = useState(5400); // 90 minutes

    const currentLevel = levels[currentLevelIndex];

    // Compute password dynamically
    const levelPassword = currentLevel.questions.map(q => q.a.charAt(0)).join("").toUpperCase();

    // --- TAB SWITCH DETECTION (ANTI-CHEAT) ---
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                // User switched tabs or minimized window
                disqualifyUser();
                router.push("/result");
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [disqualifyUser, router]);

    // Check if already disqualified
    useEffect(() => {
        if (isDisqualified) {
            router.push("/result");
        }
    }, [isDisqualified, router]);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(p => p - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Reset inputs when level changes
    useEffect(() => {
        resetLevelTokens(currentLevelIndex); // Reset tokens for the new level
        setAnswers({});
        setUsedClues({}); // Reset used clues for the new level
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

                setCurrentLevelIndex(prev => prev + 1);
            } else {
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
            }

        } else {
            setShake(true);
            setShowError(true);

            // Increment guess count
            const newGuessCount = guessCount + 1;
            setGuessCount(newGuessCount);

            if (newGuessCount >= 10) {
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
        if (type === 'easy') cost = 50;
        if (type === 'hard') cost = 100;
        if (type === 'skip') cost = 250;

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
            setUsedClues(prev => ({
                ...prev,
                [activeTokenQuestion]: [...(prev[activeTokenQuestion] || []), type]
            }));
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
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-mono">
                <h1 className="text-6xl text-green-500 font-bold mb-4 animate-bounce">SYSTEM HACKED</h1>
                <p className="mt-8 text-2xl text-white">CONGRATULATIONS, USER.</p>
            </div>
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
                            <p>{`> LOCKING DOWN SYSTEM... ATTEMPT ${guessCount}/10`}</p>
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
            <div className={`h-full w-full flex flex-col transition-all duration-500 ${showError || showSuccess || showLockdown || activeTokenQuestion || clueMessage ? 'blur-md brightness-50 scale-[0.99]' : ''}`}>

                {/* Timer & Level Indicator */}
                <div className="absolute top-20 right-4 md:right-10 z-50 pointer-events-none flex flex-col md:flex-row gap-2 md:gap-4 items-end">
                    <div className="bg-black text-red-500 px-3 py-1 md:px-6 md:py-2 text-lg md:text-2xl font-mono font-bold border-l-2 md:border-l-4 border-red-500">
                        <span className="mr-2 text-xs md:text-base">T-MINUS</span>
                        {formatTime(timeLeft)}
                    </div>
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
                                                        <input
                                                            type="text"
                                                            id={`q-${q.id}`}
                                                            placeholder={q.p}
                                                            value={answers[q.id] || ""}
                                                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                                                            className="w-full bg-transparent border-b border-zinc-800 px-0 py-3 text-base md:text-lg text-white placeholder-zinc-700 focus:outline-none focus:border-red-600 transition-all duration-300 font-mono"
                                                        />
                                                    )}
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
                                        ATTEMPTS: {guessCount}/10
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
