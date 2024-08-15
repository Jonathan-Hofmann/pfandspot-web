import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import supabase from "@/lib/supabase"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export const VerifyRecycleMachines = ({id, verifySpot}:{id:string, verifySpot:Function}) => {

    const [isHidden, toggleIsHidden] = useState(false)

    const handleVerify = async () => {
        const {data, error} = await supabase.from("recycle_machines").update({verified: true}).eq("id", id).select();
    
        if(!error){
            toast.success("Vielen Dank für Deine Hilfe!", {description: "+ 100 XP"});
            toggleIsHidden(true)
            verifySpot()
        } else {
            toast.error("Es ist ein Fehler aufgetreten...", {description: error.message});
        }
    }

    const handleNotVerify = async () => {
        const {data:reports, error:reportError} = await supabase.from("recycle_machines_reports").select("*").eq("id", id);

        if(reportError){
            console.log(reportError);
            return
        }

        if(reports.length > 0){
            const {data, error} = await supabase.from("recycle_machines_reports").update({counter: (reports[0].counter+1)}).eq("id", id).select();
    
            if(!error){
                toast.success("Vielen Dank für Deine Hilfe!", {description: "+ 100 XP"});
                toggleIsHidden(true)
            } else {
                toast.error("Es ist ein Fehler aufgetreten...", {description: error.message});
            }
        } else {
            const {data, error} = await supabase.from("recycle_machines_reports").insert({id: id, counter:1}).select();
    
            if(!error){
                toast.success("Vielen Dank für Deine Hilfe!", {description: "+ 100 XP"});
                toggleIsHidden(true)
            } else {
                toast.error("Es ist ein Fehler aufgetreten...", {description: error.message});
            }
        }
    }

    useEffect(()=>{
        toggleIsHidden(false)
    }, [id])

    return(
        <div>
            {!isHidden &&
                <>
                    <Separator className="my-4"/>
                    <p className="text-muted-foreground mb-3">Standort bestätigen</p>
                    <div className="grid grid-cols-2 gap-4">
                        <Button onClick={()=>{handleNotVerify()}} variant={"destructive"}>
                            Falsch
                        </Button>
                        <Button variant={"secondary"} onClick={()=>{handleVerify()}} className="">
                            Bestätigen
                        </Button>
                    </div>
                </>
            }
        </div>
    )
}