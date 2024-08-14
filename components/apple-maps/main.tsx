import { useEffect, useMemo, useState } from "react";
import { Annotation, Map, Marker } from 'mapkit-react';
import { PfandautomatOnMapApple } from "./pins/recyclespots";
import { useNavigation } from "@/contexts/resultsAndNavigation";

export const AppleMaps = () => {
    const leftNav = useNavigation();
    const [selectedPin, setSelection] = useState<any>();

    const [viewRect, setViewRect] = useState({
        NorthEast: {
            lat: 0,
            lng: 0
        },
        SouthWest: {
            lat: 0,
            lng: 0
        }
    })

    useEffect(() => {
        console.log(selectedPin)
        leftNav.selectSpot(selectedPin)
    }, [selectedPin])

    return (
        <div className="relative h-screen">
            <Map
                showsUserLocation
                tracksUserLocation
                token="eyJraWQiOiIyQVVGR0FWNlc2IiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiI0OUs1R1ZZNFE0IiwiaWF0IjoxNzIzNjI2MTU3LCJleHAiOjE3MjQzMDk5OTl9.1eY-Ht7UmtwwlayqvpZCw5FuvJm2X1GKyu47ILRXWQfITkwYquWtxvnLSWer_cH-V1tUTOh2ILCgRQvmvjHZbA"
                colorScheme={1}
                initialRegion={{
                    // Delta = Zoom
                    centerLatitude: 53.5699,
                    centerLongitude: 10.0003,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.11
                }}
                isZoomEnabled
                showsPointsOfInterest={false}
                allowWheelToZoom
                onRegionChangeEnd={(coordinates)=>{
                    const NorthEast = {
                        lat: coordinates.centerLatitude+coordinates.latitudeDelta,
                        lng: coordinates.centerLongitude+coordinates.longitudeDelta
                    }
                    const SouthWest = {
                        lat: coordinates.centerLatitude-coordinates.latitudeDelta,
                        lng: coordinates.centerLongitude-coordinates.longitudeDelta
                    }
                    setViewRect({
                        NorthEast:NorthEast,
                        SouthWest:SouthWest
                    })
                }}
            >
                <PfandautomatOnMapApple onClick={setSelection} currRect={viewRect}/>
            </Map>
        </div>
    )
}