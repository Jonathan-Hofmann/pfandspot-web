import { useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export const RegisterUi = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    return(
        <div>
            <div>
                <Label>
                    Name
                </Label>
                <Input value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </div>
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
                <Input value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
        </div>
    )
}