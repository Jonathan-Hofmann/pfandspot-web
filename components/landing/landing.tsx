"use client"
import MapExplore from "../map/map"
import { Navigation } from "../menu/main_menu"

export const Landing = () => {
    return(
        <div>
            <MapExplore onChange={() => {}}/>
            <Navigation/>
        </div>
    )
}