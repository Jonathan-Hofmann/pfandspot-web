"use client"
import { AuthProvider } from "@/contexts/auth"
// import MapExplore from "../map/map"
import { Navigation } from "../menu/main_menu"
import dynamic from "next/dynamic"

const MapExplore = dynamic(() => import("../map/map"), { ssr: false })

export const Landing = () => {
    return(
        <AuthProvider>
            <MapExplore onChange={() => {}}/>
            <Navigation/>
        </AuthProvider>
    )
}