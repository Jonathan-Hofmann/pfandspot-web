import { AuthWrapper } from '@/components/auth/wrapper';
import { Dialog } from '@/components/ui/dialog';
import supabase from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';
import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';

interface Auth_I {
    handleEmailSignIn: Function,
    handleEmailSignUp: Function,
    handleLogout: Function,
    user: undefined | any,
    toggleAuthUi: Function,
    isLoading: boolean
}

const default_vars: Auth_I = {
    handleEmailSignIn: () => { },
    handleEmailSignUp: () => { },
    handleLogout: () => { },
    user: undefined,
    toggleAuthUi: () => { },
    isLoading: false
}

// Create the Context
const AuthContext = createContext(default_vars);

// Create the Context Provider Component
export const AuthProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState<undefined | any>()
    const [showAuthUi, toggleAuthUi] = useState<boolean>(false)
    const [isLoading, toggleLoading] = useState(false);

    const handleEmailSignIn = async (email: string, pwd: string) => {
        toggleAuthUi(true)        
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: pwd,
        })
        toggleAuthUi(false)
        if (error) {
            console.log(error);
        }
    }

    const handleEmailSignUp = async (email: string, pwd: string, name: string) => {
        toggleAuthUi(true)       
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: pwd,
            options: {
                data: {
                    name: name, 
                }
            },
        })
        toggleAuthUi(false)
        if (error) {
            console.log(error);
        }
    }

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
    }

    const vals = useMemo(() => {
        return ({
            handleEmailSignIn,
            handleEmailSignUp,
            handleLogout,
            user,
            toggleAuthUi,
            isLoading
        })
    }, [user])

    useEffect(()=>{
        const {data} = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'INITIAL_SESSION') {
                // handle initial session
                toggleAuthUi(false)
                setUser(session?.user)
            } else if (event === 'SIGNED_IN') {
                // handle sign in event
                toggleAuthUi(false)
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
        return(()=>{
            data.subscription.unsubscribe();
        })
    }, [])


    

    return (
        <AuthContext.Provider value={vals}>
            {children}
            <Dialog open={showAuthUi} onOpenChange={(open) => { toggleAuthUi(open) }}>
                <AuthWrapper />
            </Dialog>
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};