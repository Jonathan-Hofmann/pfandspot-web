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
import { useEffect } from "react"
import { FaUser } from "react-icons/fa"
import { BsChevronExpand } from "react-icons/bs"
import { useLocalStorage } from "usehooks-ts"


export const Navigation = () => {
    const auth = useAuth()
    const [mode, setMode] = useLocalStorage("pfandspot_map_mode", "normal")
    return (
        <div className="fixed top-0 right-0 z-[500] p-4 rounded-xl">
            <Menubar className="rounded-lg p-0">
                {/* <div className="flex flex-row items-center">
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
                </div> */}
                {auth.user ?
                    <MenubarMenu>
                        <MenubarTrigger className="p-1 pl-1.5 pr-3 h-10 hover:bg-zinc-100 rounded-md">
                            <div className="flex flex-row items-center gap-3">
                                <div className="h-7 w-7 flex flex-col items-center justify-center bg-zinc-200 rounded-md">
                                    <FaUser className="h-3 w-3"/> 
                                </div>
                                
                                <p>{auth.user.user_metadata.name}</p>
                                <BsChevronExpand className="h-4 w-4"/>
                            </div>
                        </MenubarTrigger>
                        <MenubarContent align="end">
                            <MenubarItem>Einstellungen</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem onClick={()=>{setMode("create_pfandautomat")}}>Neuer Pfandautomat</MenubarItem>
                            <MenubarItem disabled onClick={()=>{setMode("create_pfandspot")}}>Neuer PfandSpot</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem onClick={()=>{auth.handleLogout()}}>Logout</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                :
                    <div>
                        <Button variant={"secondary"} onClick={()=>{auth.toggleAuthUi(true)}} size="sm">Anmelden</Button>
                    </div>
                }
            </Menubar>

        </div>
    )
}