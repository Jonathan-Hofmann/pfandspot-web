"use client"
import { createContext, useContext, useMemo, useState } from "react";

interface LevelSystem_I {
}

const defaultData: LevelSystem_I = {
}

const LevelSystemContext = createContext(defaultData);

export const LevelSystemProvider = ({ children }: { children: any }) => {

   
    const vals = useMemo<LevelSystem_I>(() => ({

    }), [])

    return (
        <LevelSystemContext.Provider value={vals}>
            {children}
        </LevelSystemContext.Provider>
    )
}

export const useLevelSystem = () => useContext(LevelSystemContext);