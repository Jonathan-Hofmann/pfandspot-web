import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useMemo, useRef, useState } from 'react';

export const MapLibreMap = () => {
    const divRef = useRef<any>()
    const [mapCore, setMap] = useState<any>(undefined)

    useEffect(()=>{
        const map = new maplibregl.Map({
            container: divRef.current, // container id
            style: "https://api.maptiler.com/maps/dataviz-dark/style.json?key=MSlAVBomEZujzU8Ua2kF", // style URL
            center: [9.986504772772838, 53.54872981950197], // starting position [lng, lat]
            zoom: 10 // starting zoom
        });
        setMap(map);
    }, [])

    return(
        <div>
            <div className='h-screen w-full' ref={divRef} id='map'>
            </div>
        </div>
    )
}