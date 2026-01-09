"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type TokenType = 'easy' | 'hard' | 'skip';

interface GameContextType {
    rewards: number;
    tokens: {
        easy: number;
        hard: number;
        skip: number;
    };
    useToken: (type: TokenType, cost: number) => boolean;
    addReward: (amount: number) => void;
    resetLevelTokens: (levelIndex: number) => void;
    userName: string;
    setUserName: (name: string) => void;
    gameWon: boolean;
    setGameWon: (won: boolean) => void;
    finalTime: number;
    setFinalTime: (time: number) => void;
    levelsCleared: number;
    setLevelsCleared: (count: number) => void;
    usedClues: Record<number, ('easy' | 'hard' | 'skip')[]>;
    markClueUsed: (questionId: number, type: 'easy' | 'hard' | 'skip') => void;
    solvedQuestionIds: number[];
    markQuestionSolved: (questionId: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [rewards, setRewards] = useState(300); // Start with 300 points
    const [userName, setUserName] = useState("");
    const [tokens, setTokens] = useState({
        easy: 2,
        hard: 0,
        skip: 3, // 3 Global Skip tokens
    });

    const [gameWon, setGameWon] = useState(false);
    const [finalTime, setFinalTime] = useState(0);
    const [levelsCleared, setLevelsCleared] = useState(0);
    const [solvedQuestionIds, setSolvedQuestionIds] = useState<number[]>([]);

    const resetLevelTokens = useCallback((levelIndex: number) => {
        // Levels 1-3 (index 0-2): 2 Easy per page
        // Levels 4-5 (index 3-4): 2 Easy + 1 Hard per page
        // Skip is global, so we preserve its current value

        setTokens(prev => {
            const isHardLevel = levelIndex >= 3;
            return {
                easy: 2,
                hard: isHardLevel ? 2 : 0,
                skip: prev.skip // Preserve global skip count
            };
        });
    }, []);

    const useToken = useCallback((type: TokenType, cost: number): boolean => {
        if (tokens[type] > 0 && rewards >= cost) {
            setTokens(prev => ({
                ...prev,
                [type]: prev[type] - 1
            }));
            setRewards(prev => prev - cost);
            return true;
        }
        return false;
    }, [tokens, rewards]);

    const addReward = useCallback((amount: number) => {
        setRewards(prev => prev + amount);
    }, []);


    const [usedClues, setUsedClues] = useState<Record<number, ('easy' | 'hard' | 'skip')[]>>({});

    const markClueUsed = useCallback((questionId: number, type: 'easy' | 'hard' | 'skip') => {
        setUsedClues(prev => ({
            ...prev,
            [questionId]: [...(prev[questionId] || []), type]
        }));
    }, []);

    const markQuestionSolved = useCallback((questionId: number) => {
        setSolvedQuestionIds(prev => {
            if (prev.includes(questionId)) return prev;
            return [...prev, questionId];
        });
    }, []);

    return (
        <GameContext.Provider value={{
            rewards,
            tokens,
            useToken,
            addReward,
            resetLevelTokens,
            userName,
            setUserName,
            gameWon,
            setGameWon,
            finalTime,
            setFinalTime,
            levelsCleared,
            setLevelsCleared,
            usedClues,
            markClueUsed,
            solvedQuestionIds,
            markQuestionSolved
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
