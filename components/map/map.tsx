"use client"

import { MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import { PfandSpotsOnMap } from "./pins/pfandspots";
import { LocationMarker } from "./pins/user-marker";
import { useEffect, useState } from "react";
// import { FindMoreMerchantsOnMap } from "./findMoreMerchants";
import { useLocalStorage } from "usehooks-ts";
import { LatLngExpression } from "leaflet";
import { PfandautomatOnMap } from "./pins/recyclespots";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { PfandSpotDetails } from "./views/pfandspot_details";
import { DialogTitle } from "../ui/dialog";
import { PfandautomatDetails } from "./views/pfandautomat_details";
import { useNavigation } from "@/contexts/resultsAndNavigation";
import { CreateRecycleSpotMapItem } from "./create/createRecycleSpot";

const MapExplore = ({ onChange }: { onChange: Function }) => {
    const leftNav = useNavigation();

    const [selectedPin, setSelection] = useState<any>();
    const [showDetails, toggleShowDetails] = useState(false);
    const [showMarker, setShowMarker] = useLocalStorage("filter_pins", {
        recyclespots: true,
        pfandspots: true
    })
    const [mode, setMode] = useLocalStorage("pfandspot_map_mode", "normal")

    const [loc, setCenterLoc] = useState<LatLngExpression>([53.549614800521056, 9.987383427533725]);

    useEffect(() => {
        console.log(selectedPin)
        // if (selectedPin) {
        //     console.log("Show sheet.")
        //     toggleShowDetails(true)
        // } else {
        //     toggleShowDetails(false)
        // }
        leftNav.selectSpot(selectedPin)
    }, [selectedPin])

    return (
        <MapContainer
            className=" shadow-inner w-full"
            center={loc}
            zoom={12}
            minZoom={4}
            scrollWheelZoom={true}
            style={{ height: "100vh" }}
            zoomControl={false}
        >
            <TileLayer className="block dark:hidden"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                // attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                // url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TileLayer className="hidden dark:block"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                // url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />


            {mode === "normal" ? 
                <>
                    {showMarker.pfandspots && <PfandSpotsOnMap onClick={setSelection} />}
                    {showMarker.recyclespots && <PfandautomatOnMap onClick={setSelection} />}
                </>
            :
                <>
                    {mode === "create_pfandautomat" && <CreateRecycleSpotMapItem/>}
                </>
            }

            <Sheet open={showDetails} onOpenChange={(open) => { toggleShowDetails(open); setSelection(undefined) }}>
                <SheetContent>
                    {(selectedPin && selectedPin.type === "pfandspot") && <PfandSpotDetails data={selectedPin} />}
                    {(selectedPin && selectedPin.type === "pfandautomat") && <PfandautomatDetails data={selectedPin} />}
                </SheetContent>
            </Sheet>

        </MapContainer>
    )
}

export default MapExplore;