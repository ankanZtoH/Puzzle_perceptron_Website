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
    resetLevelTokens: (levelIndex: number) => void;
    isDisqualified: boolean;
    disqualifyUser: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [rewards, setRewards] = useState(1000);
    const [tokens, setTokens] = useState({
        easy: 3,
        hard: 0,
        skip: 3,
    });

    const [isDisqualified, setIsDisqualified] = useState(false);

    const resetLevelTokens = (levelIndex: number) => {
        // Levels 1-3 (index 0-2): Easy only (3)
        // Levels 4-5 (index 3-4): Easy (3) + Hard (3)
        // Skip is global, so we preserve its current value

        setTokens(prev => {
            const isHardLevel = levelIndex >= 3;
            return {
                easy: 3,
                hard: isHardLevel ? 3 : 0,
                skip: prev.skip // Preserve global skip count
            };
        });
    };

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

    const disqualifyUser = () => {
        setIsDisqualified(true);
    };

    return (
        <GameContext.Provider value={{
            rewards,
            tokens,
            useToken,
            addReward,
            resetLevelTokens,
            isDisqualified,
            disqualifyUser
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
