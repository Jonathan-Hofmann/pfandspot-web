"use client"

import { MapLibreMap } from "@/components/maplibre/map";
import { Navigation } from "@/components/menu/main_menu";
import { AuthProvider } from "@/contexts/auth";
import { ResultsAndNavigationProvider } from "@/contexts/resultsAndNavigation";

const Page = () => {
    return (

        <AuthProvider>
            <ResultsAndNavigationProvider>
                <MapLibreMap />
                <Navigation />
            </ResultsAndNavigationProvider>
        </AuthProvider>
    )
}

export default Page;