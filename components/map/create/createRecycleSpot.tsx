import { CreateRecycleSpot } from "@/components/create/recycleSpot";
import { Dialog } from "@/components/ui/dialog";
import { LatLng, LeafletMouseEvent } from "leaflet";
import { useState } from "react";
import { useMap, useMapEvent } from "react-leaflet";
import { useLocalStorage } from "usehooks-ts";

export const CreateRecycleSpotMapItem = () => {

    const [pos, setPos] = useState<LatLng|undefined>(undefined)
    const map = useMap();
    const [mode, setMode] = useLocalStorage("pfandspot_map_mode", "normal")

    useMapEvent("click", (event:LeafletMouseEvent)=>{
        setPos(event.latlng);
        map.flyTo(event.latlng, 16);
    })
    return(<>
        <Dialog open={pos ? true : false} onOpenChange={(open)=>{
            if(!open){
                setPos(undefined); 
                setMode("normal")
            } else {
                setPos(pos); 
            }
        }}>
            {pos && <CreateRecycleSpot coordinate={pos} closeDialog={()=>{setPos(undefined); setMode("normal")}} />}
        </Dialog>
    </>)
}