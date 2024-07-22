import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { useAuth } from "@/contexts/auth"
import { Button } from "../ui/button"


export const Navigation = () => {
    const auth = useAuth()
    return (
        <div className="fixed top-0 right-0 left-0 z-[500] p-4 ">
            <Menubar className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                    <p className="text-sm ml-2 mr-3 text-muted-foreground hover:text-primary duration-200">PfandSpot</p>
                    <MenubarMenu>
                        <MenubarTrigger>Bearbeiten</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>
                                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem>New Window</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Share</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Print</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    
                    <MenubarMenu>
                        <MenubarTrigger>View</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>
                                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem>New Window</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Share</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Print</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </div>
                <div>
                    {auth.user ?
                        <MenubarMenu>
                            <MenubarTrigger>Account</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>New Window</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>Share</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>Print</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    :
                        <div>
                            <Button onClick={()=>{auth.toggleAuthUi(true)}} size="sm">Sign In</Button>
                        </div>
                    }
                </div>
            </Menubar>

        </div>
    )
}