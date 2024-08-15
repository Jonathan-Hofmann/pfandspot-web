"use client"

import { AppleMaps } from "@/components/apple-maps/main"
import { Navigation } from "@/components/menu/main_menu";
import { AuthProvider } from "@/contexts/auth";
import { ResultsAndNavigationProvider } from "@/contexts/resultsAndNavigation";

const Page = () => {
    return (

        <AuthProvider>
            <ResultsAndNavigationProvider>
                <AppleMaps />
                <Navigation />
            </ResultsAndNavigationProvider>
        </AuthProvider>
    )
}

export default Page;