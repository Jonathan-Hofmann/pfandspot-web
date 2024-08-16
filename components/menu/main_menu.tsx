import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { useAuth } from "@/contexts/auth"
import { Button } from "../ui/button"
import { useEffect } from "react"
import { FaGithub, FaUser } from "react-icons/fa"
import { BsChevronExpand } from "react-icons/bs"
import { useLocalStorage } from "usehooks-ts"
import { useTheme } from "next-themes"
import CircularProgressBar from "../utils/circularProgress"
import Link from "next/link"
import { useLevelSystem } from "@/contexts/levelSystem"


export const Navigation = () => {
    const { setTheme, theme } = useTheme();
    const auth = useAuth()
    const level = useLevelSystem()
    const [mode, setMode] = useLocalStorage("pfandspot_map_mode", "normal")
    return (
        <div className="fixed top-0 right-0 z-[500] p-4 rounded-xl">
            <Menubar className="rounded-lg p-0">
                {auth.user ?
                    <MenubarMenu>
                        <MenubarTrigger className="p-1 pl-1.5 pr-3 h-10 hover:bg-zinc-100 hover:dark:bg-zinc-900 rounded-md">
                            <div className="flex flex-row items-center gap-3">

                                <CircularProgressBar percentage={level.stats.percent} size={30} strokeWidth={4}>
                                    <p className="text-xs">{level.stats.level}</p>
                                </CircularProgressBar>

                                <p className="text-md">{auth.user.name}</p>
                                <BsChevronExpand className="h-4 w-4" />
                            </div>
                        </MenubarTrigger>
                        <MenubarContent align="end">
                            <MenubarItem>Einstellungen</MenubarItem>
                            <MenubarSeparator />
                            <MenubarSub>
                                <MenubarSubTrigger>Select theme</MenubarSubTrigger>
                                <MenubarSubContent>
                                    <MenubarRadioGroup value={theme} onValueChange={setTheme}>
                                        <MenubarRadioItem value="light">Light</MenubarRadioItem>
                                        <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
                                        <MenubarRadioItem value="system">System</MenubarRadioItem>
                                    </MenubarRadioGroup>
                                </MenubarSubContent>
                            </MenubarSub>
                            <MenubarItem onClick={() => { setMode("create_pfandautomat") }}>Neuer Pfandautomat</MenubarItem>
                            <MenubarItem disabled onClick={() => { setMode("create_pfandspot") }}>Neuer PfandSpot</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem onClick={() => { auth.handleLogout() }}>Logout</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    :
                    <div>
                        <Button variant={"secondary"} onClick={() => { auth.toggleAuthUi(true) }} size="sm">Anmelden</Button>
                    </div>
                }
            </Menubar>

            <div className="fixed bottom-0 right-0 z-[500] p-4 pb-8 ">
                <Link href={"https://github.com/Jonathan-Hofmann/pfandspot-web"} target="_blank" rel="noreferrer">
                    <div className="flex flex-row items-center gap-2 opacity-30 hover:opacity-100 px-4 py-2 rounded-md border bg-background">
                        <FaGithub/>
                        <p className="text-xs">Open Source on GitHub!</p>
                    </div>
                </Link>
            </div>

        </div>
    )
}