import { LatLng } from "leaflet"
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { days } from "../map/views/pfandautomat_details"
import { Button } from "../ui/button"
import { useState } from "react"
import supabase from "@/lib/supabase"

export const CreateRecycleSpot = ({ coordinate, closeDialog }: { coordinate: LatLng, closeDialog:Function }) => {

    const [name, setName] = useState("")
    const [isLoading, toggleLoading] = useState(false)

    const [openingHours, updateOpeningHours] = useState([
        {
            from: 7,
            to: 21
        },
        {
            from: 7,
            to: 21
        },
        {
            from: 7,
            to: 21
        },
        {
            from: 7,
            to: 21
        },
        {
            from: 7,
            to: 21
        },
        {
            from: 7,
            to: 21
        },
        {
            from: 0,
            to: 0
        }
    ])

    const [accepts, updateAccepts] = useState(
        {
            "25Cent": {
                "usable": true,
                "message": ""
            },
            "16Cent": {
                "usable": true,
                "message": ""
            },
            "08Cent": {
                "usable": true,
                "message": ""
            },
            "crate": {
                "usable": true,
                "message": ""
            }
        }
    )

    const handleCreateRecycleSpot = async () => {
        toggleLoading(true)
        const { data, error } = await supabase
            .from('recycle_machines')
            .insert([
                { 
                    status: "open",
                    name: name,
                    accepted_items: accepts,
                    verified: false,
                    open_times: openingHours,
                    location: `POINT(${coordinate.lng} ${coordinate.lat})`
                },
            ])
            .select()

            if(!error){
                closeDialog()
            } else {
                toggleLoading(false)
                console.log(error)
            }

    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Pfandautomat erstellen
                </DialogTitle>
            </DialogHeader>
            <div>
                <Label>Name des Standorts</Label>
                <Input value={name} onChange={(e) => { setName(e.target.value) }} className="mt-1" placeholder="Standort (Oder Laden)" />

                <div className="mt-4">
                    <p>Öffnungszeiten</p>
                    <p className="text-sm text-muted-foreground mb-2">Wenn geschlossen, dann auf <i>Von 0 bis 0</i> setzen</p>
                    {days.map((day, i) => {
                        return (
                            <div key={"hours_"+day} className="my-2">
                                <div className="flex flex-row items-center gap-2">
                                    <p className="flex flex-row items-center w-full">{day} von</p>
                                    <Input value={openingHours[i].from} onChange={(e) => {
                                        updateOpeningHours((old) => {
                                            const tmp = [...old];
                                            old[i].from = parseInt(e.target.value)
                                            return ([...tmp])
                                        })
                                    }} type="number" />
                                    <p>bis</p>
                                    <Input value={openingHours[i].to} onChange={(e) => {
                                        updateOpeningHours((old) => {
                                            const tmp = [...old];
                                            old[i].to = parseInt(e.target.value)
                                            return ([...tmp])
                                        })
                                    }} type="number" />
                                </div>
                            </div>
                        )
                    })}

                </div>

                <div className="my-4">
                    <p>Pfandautomat akzeptiert:</p>
                    <div className="flex flex-col gap-2 mt-2">
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox id="25" checked={accepts["25Cent"].usable} onCheckedChange={(checked: boolean) => updateAccepts((old) => ({ ...old, ...{ ["25Cent"]: { ...old["25Cent"], ...{ usable: checked } } } }))} />
                            <Label htmlFor="25">Einweg (25 Cent)</Label>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox id="16" checked={accepts["16Cent"].usable} onCheckedChange={(checked: boolean) => updateAccepts((old) => ({ ...old, ...{ ["16Cent"]: { ...old["16Cent"], ...{ usable: checked } }, ["08Cent"]: { ...old["08Cent"], ...{ usable: checked } } } }))} />
                            <Label htmlFor="16">Mehrweg (16 & 8 Cent)</Label>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox id="crate" checked={accepts["crate"].usable} onCheckedChange={(checked: boolean) => updateAccepts((old) => ({ ...old, ...{ ["crate"]: { ...old["crate"], ...{ usable: checked } } } }))} />
                            <Label htmlFor="crate">Kasten</Label>
                        </div>
                    </div>
                </div>

                <Button disabled={isLoading || name === ""} className="w-full" onClick={()=>{
                    handleCreateRecycleSpot()
                }}>
                    Pfandautomat erstellen
                </Button>

            </div>
        </DialogContent>
    )
}