import { useState } from "react"
import { DialogContent } from "../ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { LoginUi } from "./login"
import { RegisterUi } from "./register"
import { Button } from "../ui/button"
import { useAuth } from "@/contexts/auth"

export const AuthWrapper = () => {
    const [authMode, setAuthMode] = useState("signin")
    const auth = useAuth();

    return (
        <DialogContent>

            <p className="text-2xl font-bold">PfandSpot</p>

            {authMode === "signin" && <LoginUi />}
            {authMode === "signup" && <RegisterUi />}

            {!auth.isLoading &&
                <>
                    {authMode === "signin" && 
                        <Button variant={"link"} onClick={()=>{setAuthMode("signup")}}>
                            Noch keinen Account?
                        </Button>
                    }
                    {authMode === "signup" && 
                        <Button variant={"link"} onClick={()=>{setAuthMode("signin")}}>
                            Hier anmelden
                        </Button>
                    }
                </>
            }
        </DialogContent>
    )
}