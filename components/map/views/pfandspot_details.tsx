import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { format } from "date-fns"

export const PfandSpotDetails = ({ data }: { data: any }) => {
    return (
        <>
            <SheetHeader>
                <SheetTitle>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                    data.amount / 100,
                )}</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col justify-between h-[calc(100%_-_40px)]">
                <div>
                    <p className="text-muted-foreground mt-2">Erstellt am {format(new Date(data.created_at), "dd.MM.yyy, HH:mm:SS")} Uhr</p>
                    <Separator className="my-4" />

                    {Object.keys(data.items).map((key) => {
                        const item = data.items[key];
                        return (
                            <div className="py-1">
                                {key === "25Cent" &&
                                    <div className="flex flex-row justify-between">
                                        <div>
                                            <p>Einweg</p>
                                            <p className="text-muted-foreground text-sm">25 Cent pro Flasche</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-right">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                                                item.amount_money / 100,
                                            )}</p>
                                            <p className="text-muted-foreground text-xs text-right">{item.amount_bottles} x 25 Cent</p>
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
                                            <p className="font-semibold text-right">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                                                item.amount_money / 100,
                                            )}</p>
                                            <p className="text-muted-foreground text-xs text-right">{item.amount_bottles} x 15 Cent</p>
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
                                            <p className="font-semibold text-right">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                                                item.amount_money / 100,
                                            )}</p>
                                            <p className="text-muted-foreground text-xs text-right">{item.amount_bottles} x 8 Cent</p>
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
                                            <p className="font-semibold text-right">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                                                item.amount_money / 100,
                                            )}</p>
                                            <p className="text-muted-foreground text-xs text-right">{item.amount_bottles} x 3,50 EURO</p>
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })}
                    <Separator className="my-2" />
                    <div className="flex flex-row justify-between">
                        <div>
                            <p className="font-semibold">Gesamt</p>
                        </div>
                        <div>
                            <p className="font-bold text-right">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                                data.amount / 100,
                            )}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <Button className="w-full">
                        PfandSpot aufheben
                    </Button>
                    <Button variant={"link"} className="w-full mt-2">
                        Problem melden
                    </Button>
                </div>
            </div>
        </>
    )
}

const test = {
    "25Cent": {
        amount_money: 250,
        amount_bottles: 10
    },
    "15Cent": {
        amount_money: 60,
        amount_bottles: 4
    },
    "08Cent": {
        amount_money: 176,
        amount_bottles: 22
    },
    "crate": {
        amount_money: 350,
        amount_bottles: 1
    }
}