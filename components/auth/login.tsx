import { useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useAuth } from "@/contexts/auth"
import { Button } from "../ui/button"

export const LoginUi = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("");

    const auth = useAuth()

    return(
        <div>
            <div>
                <Label>
                    Email
                </Label>
                <Input value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div>
                <Label>
                    Password
                </Label>
                <Input value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <Button onClick={()=>{auth.handleEmailSignIn(email, password)}}>
                Sign In
            </Button>
        </div>
    )
}