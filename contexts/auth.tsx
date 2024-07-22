// ThemeContext.js
import { AuthWrapper } from '@/components/auth/wrapper';
import { Dialog } from '@/components/ui/dialog';
import { createClient } from '@supabase/supabase-js';
import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';

interface Auth_I {
    handleEmailSignIn: Function,
    handleEmailSignUp: Function,
    handleLogout: Function,
    user: undefined|any,
    toggleAuthUi: Function
}

const default_vars:Auth_I = {
    handleEmailSignIn: ()=>{},
    handleEmailSignUp: ()=>{},
    handleLogout: ()=>{},
    user: undefined,
    toggleAuthUi: ()=>{}
}

// Create the Context
const AuthContext = createContext(default_vars);

// Create the Context Provider Component
export const AuthProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState<undefined|any>()
    const [showAuthUi, toggleAuthUi] = useState<boolean>(false)
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "");

    const handleEmailSignIn = async (email: string, pwd: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: pwd,
        })
    }

    const handleEmailSignUp = async (email: string, pwd: string, name: string) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: pwd,
            options: {
                data: {
                    name: name,
                }
            },
        })
    }

    const handleLogout = async (email: string, pwd: string, name: string) => {
        await supabase.auth.signOut()
    }

    const vals = useMemo(() => {
        return ({
            handleEmailSignIn,
            handleEmailSignUp,
            handleLogout,
            user,
            toggleAuthUi
        })
    }, [user])

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'INITIAL_SESSION') {
                // handle initial session
                setUser(session?.user)
            } else if (event === 'SIGNED_IN') {
                // handle sign in event
                setUser(session?.user)
            } else if (event === 'SIGNED_OUT') {
                // handle sign out event
                setUser(undefined)
            } else if (event === 'PASSWORD_RECOVERY') {
                // handle password recovery event
            } else if (event === 'TOKEN_REFRESHED') {
                // handle token refreshed event
            } else if (event === 'USER_UPDATED') {
                // handle user updated event
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={vals}>
            {children}
            <Dialog open={showAuthUi} onOpenChange={(open)=>{toggleAuthUi(open)}}>
                <AuthWrapper/>
            </Dialog>
        </AuthContext.Provider>
    );
};

// Create a custom hook to use the ThemeContext
export const useAuth = () => {
    return useContext(AuthContext);
};