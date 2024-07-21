// import { useDictionary } from "@/contexts/dictionary";
import L, { DivIcon } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import { toast } from "sonner";

export const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    // const lang = useDictionary();

    const map = useMap();

    useEffect(() => {
        map.locate().on("locationfound", function (e:any) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            const radius = e.accuracy;
            const circle = L.circle(e.latlng, radius);
            // circle.addTo(map);
            // setBbox(e.bounds.toBBoxString().split(","));
        }).on("locationerror", ()=>{
          toast.error("ERROR")
        });
    }, [map]);

    // return <></>
    return position === null ? null : (
        <Marker position={position} icon={createUserPosition()}>
        </Marker>
    );
}

function createUserPosition() {
    return new DivIcon({
      html: `
        <div class="absolute z-20 left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
          </svg>
        </div>
      `,
      popupAnchor: [0, 0],
    });
  }