"use client"
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CircularProgressBar from "@/components/utils/circularProgress";
import supabase from "@/lib/supabase";
import { toast } from "sonner";

export const levels = [
    {
        id: 0,
        name: "Starter",
        xp_max: 100
    },
    {
        id: 1,
        name: "Pfa(n)dfinder",
        xp_max: 200
    },
    {
        id: 2,
        name: "PfandScout",
        xp_max: 300
    },
    {
        id: 3,
        name: "AutomatenScout",
        xp_max: 400
    },
    {
        id: 4,
        name: "KartenPfleger",
        xp_max: 500
    },
    {
        id: 5,
        name: "StadtScout",
        xp_max: 1000
    },
    {
        id: 6,
        name: "Nachbarschaftsheld",
        xp_max: 1500
    },
    {
        id: 7,
        name: "AutomatenHeld",
        xp_max: 2000
    },
    {
        id: 8,
        name: "PfandHeld",
        xp_max: 2500
    },
    {
        id: 9,
        name: "PfandMaster",
        xp_max: 3000
    }
]

interface LevelSystem_I {
    addXP:(xp:number)=>void,
    stats: {
        xp:number, 
        level:number,
        percent:number
    }
}

const defaultData: LevelSystem_I = {
    addXP:(xp:number)=>{},
    stats: {
        xp:0, 
        level:0,
        percent:0
    }
}


const LevelSystemContext = createContext(defaultData);

export const LevelSystemProvider = ({ children }: { children: any }) => {

    const auth = useAuth();

    const [showNewLevel, setShowNewLevel] = useState(false)

    const [level, setLevel] = useState(0)
    const [xp, setXP] = useState(0)

    const level_stats = useMemo(()=>{
        
        const curr_level = levels[level];
        const perc = (xp / curr_level.xp_max)*100

        return({
            percent: perc,
            xp: xp,
            level: level
        })
    }, [level, xp])

    const handleUpdateUsersXPAndLevel = async (new_xp:number, new_level:number) => {
        const {data, error} = await supabase.from("user_data").update({
            xp: new_xp,
            level: new_level
        }).eq("id", auth.user.id).select();

        if(error){
            toast.error("Error while saving XP and level in your account...", {description: error.message})
        }
    }

    const handleAddXP = (added_xp:number) => {
        console.log("Add XP to user");
        console.log(auth);
        if(!auth.user) return;

        const curr_level = levels[level]

        console.log("curr level:");
        console.log(curr_level)

        let curr_xp = xp;
        curr_xp+=added_xp;

        console.log(added_xp)
        console.log(curr_xp)

        setXP(curr_xp)

        let tmp_level = level;
        let tmp_xp = curr_xp;

        setTimeout(() => {
            if(curr_xp >= curr_level.xp_max){
                console.log("Next level.")

                tmp_level = tmp_level+1;
                tmp_xp = tmp_xp-curr_level.xp_max

                setLevel(tmp_level)
                setXP(tmp_xp)
                setShowNewLevel(true)
            }
            
            handleUpdateUsersXPAndLevel(tmp_xp, tmp_level)
        }, 500);
    }

    useEffect(()=>{
        if(auth.user){
            setLevel(auth.user.level);
            setXP(auth.user.xp)
        }
    }, [auth.user])
   
    const vals = useMemo<LevelSystem_I>(() => ({
        addXP:handleAddXP,
        stats: level_stats
    }), [auth.user, level_stats])

    return (
        <LevelSystemContext.Provider value={vals}>
            {children}

            <Dialog open={showNewLevel} onOpenChange={(o)=>{setShowNewLevel(o)}}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Neues Level erreicht!
                        </DialogTitle>
                    </DialogHeader>
                    <div>
                        <div className="flex flex-col items-center justify-center mt-8 mb-8">
                            <CircularProgressBar size={100} percentage={100} strokeWidth={8}>
                                <p className="text-3xl">{level}</p>
                            </CircularProgressBar>
                            <p className="text-3xl font-bold mt-4">{levels[level].name}</p>
                        </div>

                        <Button className="w-full" variant={"outline"} onClick={()=>{setShowNewLevel(false)}}>
                            Karte schließen
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

        </LevelSystemContext.Provider>
    )
}

export const useLevelSystem = () => useContext(LevelSystemContext);