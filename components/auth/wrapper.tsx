import { DialogContent } from "../ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { LoginUi } from "./login"
import { RegisterUi } from "./register"

export const AuthWrapper = () => {
    return(
        <DialogContent>
            <Tabs>
                <TabsList>
                    <TabsTrigger value="signin">
                        Sign In
                    </TabsTrigger>
                    <TabsTrigger value="signup">
                        Sign Up
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                    <LoginUi/>
                </TabsContent>
                <TabsContent value="signup">
                    <RegisterUi/>
                </TabsContent>
            </Tabs>
        </DialogContent>
    )
}