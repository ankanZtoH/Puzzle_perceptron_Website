"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

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
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [rewards, setRewards] = useState(1000);
    const [tokens, setTokens] = useState({
        easy: 5,
        hard: 3,
        skip: 1,
    });

    const useToken = (type: TokenType, cost: number): boolean => {
        if (tokens[type] > 0 && rewards >= cost) {
            setTokens(prev => ({
                ...prev,
                [type]: prev[type] - 1
            }));
            setRewards(prev => prev - cost);
            return true;
        }
        return false;
    };

    const addReward = (amount: number) => {
        setRewards(prev => prev + amount);
    };

    return (
        <GameContext.Provider value={{ rewards, tokens, useToken, addReward }}>
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
