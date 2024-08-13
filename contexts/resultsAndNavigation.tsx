import { PfandautomatDetails } from "@/components/map/views/pfandautomat_details";
import { PfandSpotDetails } from "@/components/map/views/pfandspot_details";
import { Input } from "@/components/ui/input";
import { createContext, useContext, useMemo, useState } from "react";

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

    const [selectedSpot, setSelectedSpot] = useState<undefined|any>(undefined)

    const vals = useMemo<Navigation>(() => ({
        setPfandSpotsInView: setCurrPfandSpotsInView,
        setRecycleSpotsInView: setCurrRecycleSpotsInView,
        selectSpot: setSelectedSpot
    }), [])

    return (
        <ResultsAndNavigationContext.Provider value={vals}>
            <div className="fixed left-0 top-0 w-[350px] p-4 flex flex-col gap-2 z-[501]">
                <div className="bg-background shadow-lg border rounded-xl p-4 w-full">
                    <p className="text-xl text-center font-semibold mb-2">PfandSpot (Open Source)</p>
                    <Input placeholder="Suche nach Stadt, PLZ und mehr ..." className="bg-background" />
                </div>
                <div className="bg-background shadow-lg border rounded-xl p-2 w-full grid grid-cols-2 gap-2">
                    <div className="p-2 hover:bg-zinc-100 rounded-md">
                        <p className="text-xl font-bold">{currPfandSpots.length}</p>
                        <p className="text-sm text-muted-foreground">PfandSpots</p>
                    </div>
                    <div className="p-2 hover:bg-zinc-100 rounded-md">
                        <p className="text-xl font-bold">{currRecycleSpots.length}</p>
                        <p className="text-sm text-muted-foreground">Pfandautomaten</p>
                    </div>
                </div>
                {selectedSpot &&
                    <div className="bg-background shadow-lg border rounded-xl p-4 w-full">
                        {selectedSpot.type === "pfandspot" && <PfandSpotDetails data={selectedSpot}/>}
                        {selectedSpot.type === "pfandautomat" && <PfandautomatDetails data={selectedSpot}/>}
                    </div>    
                }
            </div>
            {children}
        </ResultsAndNavigationContext.Provider>
    )
}

export const useNavigation = () => useContext(ResultsAndNavigationContext);