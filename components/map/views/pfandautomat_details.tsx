import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { format } from "date-fns"
import { FaCheckCircle, FaExclamationCircle, FaMinusCircle } from "react-icons/fa"
import {BsCheckCircle, BsCheckCircleFill, BsXCircle, BsXCircleFill} from "react-icons/bs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]

export const PfandautomatDetails = ({ data }: { data: any }) => {
    return (
        <>
            <SheetHeader>
                <SheetTitle>{data.name}</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col justify-between h-[calc(100%_-_40px)]">
                <div>
                    <p className="text-muted-foreground mt-2">Erstellt am {format(new Date(data.created_at), "dd.MM.yyy, HH:mm:SS")} Uhr</p>
                    <Separator className="my-4" />

                    {data.status === "open" &&
                        <div className="p-3 flex flex-row items-start justify-start bg-green-500 text-white gap-3 rounded-lg">
                            <FaCheckCircle className="h-4 w-4 mt-1" />
                            <div className="p-0">
                                <p className="font-bold mt-0">Geöffnet</p>
                                <p className="text-sm">Keine Probleme gemeldet</p>
                            </div>
                        </div>
                    }

                    {data.status === "problem" &&
                        <div className="p-3 flex flex-row items-start justify-start bg-orange-500 text-white gap-3 rounded-lg">
                            <FaExclamationCircle className="h-4 w-4 mt-1" />
                            <div className="p-0">
                                <p className="font-bold mt-0">Problem</p>
                                <p className="text-sm">Es liegt mind. ein Problem vor</p>
                            </div>
                        </div>
                    }

                    {data.status === "closed" &&
                        <div className="p-3 flex flex-row items-start justify-start bg-red-500 text-white gap-3 rounded-lg">
                            <FaMinusCircle className="h-4 w-4 mt-1" />
                            <div className="p-0">
                                <p className="font-bold mt-0">Geschlossen</p>
                                <p className="text-sm">Oder ein Problem verhindert die Annahme.</p>
                            </div>
                        </div>
                    }

                    <Separator className="my-4"/>
                    <p className="font-semibold mb-2">Annahme</p>
                    {Object.keys(data.accepted_items).map((key, i:number) => {
                        const item = data.accepted_items[key];
                        return (
                            <div key={"annahme_"+i} className="p-2 hover:bg-zinc-100 rounded-md my-1">
                                {key === "25Cent" &&
                                    <div className="flex flex-row justify-between">
                                        <div>
                                            <p>Einweg</p>
                                            <p className="text-muted-foreground text-sm">25 Cent pro Flasche</p>
                                        </div>
                                        <div>
                                        {item.usable ? <BsCheckCircleFill className="h-5 w-5"/> : <BsXCircle className="h-5 w-5"/>}
                                        </div>
                                    </div>
                                }
                                {key === "15Cent" &&
                                    <div className="flex flex-row justify-between">
                                        <div>
                                            <p>Einweg</p>
                                            <p className="text-muted-foreground text-sm">15 Cent pro Flasche</p>
                                        </div>
                                        <div>
                                        {item.usable ? <BsCheckCircleFill className="h-5 w-5"/> : <BsXCircle className="h-5 w-5"/>}
                                        </div>
                                    </div>
                                }
                                {key === "08Cent" &&
                                    <div className="flex flex-row justify-between">
                                        <div>
                                            <p>Einweg</p>
                                            <p className="text-muted-foreground text-sm">8 Cent pro Flasche</p>
                                        </div>
                                        <div>
                                        {item.usable ? <BsCheckCircleFill className="h-5 w-5"/> : <BsXCircle className="h-5 w-5"/>}
                                        </div>
                                    </div>
                                }
                                {key === "crate" &&
                                    <div className="flex flex-row justify-between">
                                        <div>
                                            <p>Kasten</p>
                                            <p className="text-muted-foreground text-sm">3,50 EURO pro Flasche</p>
                                        </div>
                                        <div>
                                        {item.usable ? <BsCheckCircleFill className="h-5 w-5"/> : <BsXCircle className="h-5 w-5"/>}
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })}

                    <Separator className="my-4"/>
                    <p className="font-semibold mb-2">Öffnungszeiten</p>
                    {data.open_times.map((day:any, i:number) => {
                        return (
                            <div key={"open_"+i} className={cn(["p-2 hover:bg-zinc-100 rounded-md my-1", i === new Date().getUTCDay() && "bg-zinc-100"])}>
                                <div className="flex flex-row justify-between">
                                    <div>
                                        <p className="text-sm">{days[i]}</p>
                                    </div>
                                    <div>
                                        {day.from === "00:00" ? 
                                            <Badge variant={"secondary"}>Geschlossen</Badge>
                                        :
                                            <p className="text-sm">{day.from} Uhr bis {day.to} Uhr</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div>
                    <Button variant={"secondary"} className="w-full">
                        Problem melden
                    </Button>
                </div>
            </div>
        </>
    )
}

// const test = {
//     "25Cent": {
//         amount_money: 250,
//         amount_bottles: 10
//     },
//     "15Cent": {
//         amount_money: 60,
//         amount_bottles: 4
//     },
//     "08Cent": {
//         amount_money: 176,
//         amount_bottles: 22
//     },
//     "crate": {
//         amount_money: 350,
//         amount_bottles: 1
//     }
// }

// const test = {
//     "25Cent": {
//         usable: true,
//         message: ""
//     },
//     "15Cent": {
//         usable: false,
//         message: ""
//     },
//     "08Cent": {
//         usable: false,
//         message: ""
//     },
//     "crate": {
//         usable: false,
//         message: ""
//     }
// }