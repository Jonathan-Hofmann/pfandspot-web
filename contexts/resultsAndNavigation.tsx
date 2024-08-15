"use client"
import { AddressSearch } from "@/components/map/address/addressSearch";
import { PfandautomatDetails } from "@/components/map/views/pfandautomat_details";
import { PfandSpotDetails } from "@/components/map/views/pfandspot_details";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { createContext, useContext, useMemo, useState } from "react";
import { BsEyeSlash } from "react-icons/bs";
import { useLocalStorage } from "usehooks-ts";

interface Navigation {
    setPfandSpotsInView: (val: any[]) => void,
    setRecycleSpotsInView: (val: any[]) => void,
    selectSpot: (val: any|undefined) => void
}

const defaultData: Navigation = {
    setPfandSpotsInView: (val: any[]) => { },
    setRecycleSpotsInView: (val: any[]) => { },
    selectSpot: (val: any[]) => { },
}

const ResultsAndNavigationContext = createContext(defaultData);

export const ResultsAndNavigationProvider = ({ children }: { children: any }) => {

    const [currPfandSpots, setCurrPfandSpotsInView] = useState<any[]>([]);
    const [currRecycleSpots, setCurrRecycleSpotsInView] = useState<any[]>([]);
    const [showMarker, setShowMarker] = useLocalStorage("filter_pins", {
        recyclespots: true,
        pfandspots: true
    })

    const [selectedSpot, setSelectedSpot] = useState<undefined|any>(undefined)

    const vals = useMemo<Navigation>(() => ({
        setPfandSpotsInView: setCurrPfandSpotsInView,
        setRecycleSpotsInView: setCurrRecycleSpotsInView,
        selectSpot: setSelectedSpot
    }), [])

    return (
        <ResultsAndNavigationContext.Provider value={vals}>
            <div className="fixed left-0 top-0 w-[350px] p-4 group hover:pr-0 flex flex-col gap-2 z-[501]">
                <div className="group-hover:pr-4">
                    <div className="bg-background shadow-lg border rounded-xl p-4 w-full mr-4">
                        <p className="text-xl text-center font-semibold mb-2">PfandSpot</p>
                        <AddressSearch/>
                    </div>
                </div>
                <div className="max-h-[calc(100vh_-_150px)] hover:overflow-y-scroll flex flex-col gap-2">
                    <div className="bg-background shadow-lg border rounded-xl p-2 w-full grid grid-cols-2 gap-2">
                        <div onClick={()=>{
                            setShowMarker((old)=>(
                                {...old, ...{"pfandspots": !old["pfandspots"]}}
                            ))
                        }} className={cn(["p-2 hover:bg-zinc-100 hover:dark:bg-zinc-900 rounded-md relative",!showMarker.pfandspots ? "bg-zinc-100 dark:bg-zinc-900" : ""])}>
                            <p className="text-xl font-bold">{currPfandSpots.length}</p>
                            <p className="text-sm text-muted-foreground">PfandSpots</p>
                            {!showMarker.pfandspots && <BsEyeSlash className=" absolute top-3 right-3"/>}
                        </div>
                        <div onClick={()=>{
                            setShowMarker((old)=>(
                                {...old, ...{"recyclespots": !old["recyclespots"]}}
                            ))
                        }} className={cn(["p-2 hover:bg-zinc-100 hover:dark:bg-zinc-900 rounded-md relative",!showMarker.recyclespots ? "bg-zinc-100 dark:bg-zinc-900" : ""])}>
                            <p className="text-xl font-bold">{currRecycleSpots.length}</p>
                            <p className="text-sm text-muted-foreground">Pfandautomaten</p>
                            {!showMarker.recyclespots && <BsEyeSlash className=" absolute top-3 right-3"/>}
                        </div>
                    </div>
                    {selectedSpot &&
                        <div className="bg-background shadow-lg border rounded-xl p-4 w-full">
                            {selectedSpot.type === "pfandspot" && <PfandSpotDetails data={selectedSpot}/>}
                            {selectedSpot.type === "pfandautomat" && <PfandautomatDetails data={selectedSpot}/>}
                        </div>    
                    }
                </div>
            </div>
            {children}
        </ResultsAndNavigationContext.Provider>
    )
}

export const useNavigation = () => useContext(ResultsAndNavigationContext);