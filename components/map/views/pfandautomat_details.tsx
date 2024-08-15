import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { format } from "date-fns"
import { FaCheckCircle, FaExclamationCircle, FaMinusCircle } from "react-icons/fa"
import { BsCheckCircle, BsCheckCircleFill, BsXCircle, BsXCircleFill } from "react-icons/bs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useEffect, useMemo, useState } from "react"
import { VerifyRecycleMachines } from "./src/verifyRecycleMachine"

export const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]

export const getRecycleSpotStatus = (data: any) => {
    let base = ({
        id: 0,
        title: "Keine Probleme",
        message: ""
    })

    if (data.status === "problem") {
        base = ({
            id: 1,
            title: "Problem",
            message: "Smth"
        })

        // Do more stuff for messages etc...

    }

    let today = new Date().getUTCDay();
    today -= 1;
    if (today === -1) {
        today = 6
    }

    const today_key = Object.keys(data.open_times)[today];
    const openingTimes = data.open_times[today_key];

    const now = new Date().getHours();
    const from_hour = openingTimes.from
    const to_hour = openingTimes.to
    if (now < from_hour || now > to_hour) {
        base = ({
            id: 2,
            title: "Geschlossen",
            message: ""
        })

        console.log("Closed...");
    }
    return (base)
}

export const PfandautomatDetails = ({ data }: { data: any }) => {

    const [spot, setSpot] = useState(data)

    const status = useMemo(() => {
        return (getRecycleSpotStatus(data))
    }, [spot])

    useEffect(()=>{
        setSpot(data)
    }, [data])

    return (
        <div className="flex flex-col relative">
            <p className="mb-2 text-xs text-muted-foreground">PFANDAUTOMAT</p>
            <p className="text-2xl font-bold">{spot.name}</p>

            {spot.verified === false && <Badge variant={"secondary"} className="absolute right-0 top-0">Nicht verifiziert</Badge>}

            <div>
                <p className="text-muted-foreground text-sm">Erstellt am {format(new Date(spot.created_at), "dd.MM.yyy, HH:mm:SS")} Uhr</p>

                <div className="mt-4">
                    {status.id === 0 &&
                        <div className="p-2.5 py-2 flex flex-row items-center justify-start bg-green-500 text-white gap-3 rounded-md">
                            <FaCheckCircle className="h-4 w-4" />
                            <p className="text-sm font-semibold">Keine Probleme</p>
                        </div>
                    }
                    {status.id === 1 &&
                        <div className="p-2.5 flex flex-row items-center justify-start bg-orange-500 text-white gap-3 rounded-lg">
                            <FaExclamationCircle className="h-4 w-4" />
                            <div className="p-0">
                                <p className="font-semibold mt-0">Problem</p>
                                <p className="text-sm">Es liegt mind. ein Problem vor</p>
                            </div>
                        </div>
                    }
                    {status.id === 2 &&
                        <div className="p-2.5 flex flex-row items-center justify-start bg-zinc-500 text-white gap-3 rounded-lg">
                            <FaMinusCircle className="h-4 w-4" />
                            <div className="p-0">
                                <p className="font-semibold mt-0">Geschlossen</p>
                            </div>
                        </div>
                    }
                </div>

                <Separator className="my-4" />
                <p className="font-semibold mb-2">Annahme</p>

                <div className="flex flex-col gap-2">
                    {spot.accepted_items["25Cent"]?.usable ?
                        <div className="flex flex-row justify-between">
                            <div>
                                <p>Einweg</p>
                            </div>
                            <div>
                                <BsCheckCircleFill className="h-5 w-5" />
                            </div>
                        </div>
                        :
                        <div className="flex flex-row justify-between">
                            <div>
                                <p>Einweg</p>
                            </div>
                            <div>
                                <BsXCircle className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </div>
                    }
                    {(spot.accepted_items["16Cent"]?.usable && spot.accepted_items["08Cent"]?.usable) ?
                        <div className="flex flex-row justify-between">
                            <div>
                                <p>Mehrweg</p>
                            </div>
                            <div>
                                <BsCheckCircleFill className="h-5 w-5" />
                            </div>
                        </div>
                        :
                        <div className="flex flex-row justify-between">
                            <div>
                                <p>Mehrweg</p>
                            </div>
                            <div>
                                <BsXCircle className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </div>
                    }
                    {spot.accepted_items["crate"]?.usable ?
                        <div className="flex flex-row justify-between">
                            <div>
                                <p>Kasten</p>
                            </div>
                            <div>
                                <BsCheckCircleFill className="h-5 w-5" />
                            </div>
                        </div>
                        :
                        <div className="flex flex-row justify-between">
                            <div>
                                <p>Kasten</p>
                            </div>
                            <div>
                                <BsXCircle className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </div>
                    }
                </div>

                <Separator className="my-4" />
                <p className="font-semibold mb-2">Öffnungszeiten</p>
                {spot.open_times.map((day: any, i: number) => {
                    let tmp_i = i + 1
                    console.log(tmp_i)
                    if (tmp_i < 6) {
                        return (
                            <div key={"open_" + i} className={cn(["p-2 py-1 hover:bg-zinc-100 hover:dark:bg-zinc-900 rounded-md my-1", tmp_i === new Date().getUTCDay() && "bg-zinc-200 dark:bg-zinc-800"])}>
                                <div className="flex flex-row justify-between items-center">
                                    <div>
                                        <p className="text-sm">{days[i]}</p>
                                    </div>
                                    <div>
                                        {day.from === "00:00" ?
                                            <Badge variant={"secondary"}>Geschlossen</Badge>
                                            :
                                            <p className="text-xs">{day.from} Uhr bis {day.to} Uhr</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div key={"open_" + 0} className={cn(["p-2 py-1 hover:bg-zinc-100 hover:dark:bg-zinc-900 rounded-md my-1", new Date().getUTCDay() === 0 && "bg-zinc-200 dark:bg-zinc-800"])}>
                                <div className="flex flex-row justify-between items-center">
                                    <div>
                                        <p className="text-sm">{days[6]}</p>
                                    </div>
                                    <div>
                                        {(day.from === 0 && day.to === 0) ?
                                            <Badge variant={"secondary"}>Geschlossen</Badge>
                                            :
                                            <p className="text-xs">{day.from} Uhr bis {day.to} Uhr</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>

            <Separator className="my-4" />

            <div>
                <Button variant={"secondary"} className="w-full">
                    Problem melden
                </Button>
            </div>

            {spot.verified === false &&
                <>
                    <VerifyRecycleMachines id={spot.id} verifySpot={()=>{setSpot((old:any)=>({...old, ...{verified:true}}))}}/>
                </>
            }
        </div>
    )
}