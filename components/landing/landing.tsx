"use client"
import { AuthProvider } from "@/contexts/auth"
// import MapExplore from "../map/map"
import { Navigation } from "../menu/main_menu"
import dynamic from "next/dynamic"
import "@/styles/leaflet.css"
import { ResultsAndNavigationProvider } from "@/contexts/resultsAndNavigation"
import { LevelSystemProvider } from "@/contexts/levelSystem"

const MapExplore = dynamic(() => import("../map/map"), { ssr: false })

export const Landing = () => {
    return(
        <AuthProvider>
            <LevelSystemProvider>
                <ResultsAndNavigationProvider>
                    <MapExplore onChange={() => {}}/>
                    <Navigation/>
                </ResultsAndNavigationProvider>
            </LevelSystemProvider>
        </AuthProvider>
    )
}