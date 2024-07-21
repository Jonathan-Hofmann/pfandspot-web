import React, { useEffect, useState } from 'react';
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { DivIcon, LatLngExpression } from 'leaflet';
// import { MerchantPopUpContent } from './merchantPopUpContent';
import { useLocalStorage } from 'usehooks-ts';
import { createClient } from '@supabase/supabase-js';

export const PfandautomatOnMap = ({ onClick }: { onClick: Function }) => {
  
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "");
  const [data, setData] = useState<undefined | any[]>();

  const handleGetSpots = async (min_lon:number, min_lat:number, max_lon:number, max_lat:number) => {
    const {data, error} = await supabase.rpc('recycle_machines_in_view', {
      min_lat: min_lat,
      min_long: min_lon,
      max_lat: max_lat,
      max_long: max_lon,
    })
    console.log(data);
    console.log(error);
    setData(data)
  }

  // When the user moves the map, we clear the query if necessary to only
  // refine on the new boundaries of the map.
  const onViewChange = ({ target }: { target: any }) => {

    handleGetSpots(target.getBounds().getNorthEast().lng, target.getBounds().getNorthEast().lat, target.getBounds().getSouthWest().lng, target.getBounds().getSouthWest().lat)
  };

  useMapEvents({
    zoomend: onViewChange,
    dragend: onViewChange
  });

  const map = useMap();

  useEffect(() => {
    if (map.getBounds().getNorthEast()) {
      // initial request
      handleGetSpots(map.getBounds().getSouthWest().lng, map.getBounds().getSouthWest().lat, map.getBounds().getNorthEast().lng, map.getBounds().getNorthEast().lat)
    }
  }, [map])

  return (
    <>
      {data &&
        <>
          {data.map((item) => {

            const geoLoc = {
              lat: item.lat,
              lng: item.long
            }

            return(
              <Marker
                key={item.id}
                position={geoLoc}
                icon={createAirportIcon(item)}
                eventHandlers={{
                  click: (e) => {
                    onClick({...item, type: "pfandautomat"})
                  },
                }}
              >
                {/* <Popup className='merchantPopUp [&>a]:text-white'>
                </Popup> */}
              </Marker>
            )
          })}
        </>
      }
    </>
  );
}

function createAirportIcon(item: any) {
  return new DivIcon({
    html: `
    <div class="absolute z-20 left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] flex flex-col items-center">
      <div class="relative p-1 px-2 text-black dark:text-white bg-background shadow-md hover:bg-zinc-100 rounded-[100px] border border-zinc-300 flex flex-row items-center w-auto gap-2"> 
        <div class="h-4 w-4 ">
          ${item.status === "open" ? `<svg xmlns="http://www.w3.org/2000/svg" class="fill-green-500" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>` : ""}
          ${item.status === "problem" ? `<svg xmlns="http://www.w3.org/2000/svg" class="fill-orange-500" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>` : ""}
          ${item.status === "closed" ? `<svg xmlns="http://www.w3.org/2000/svg" class="fill-red-500" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>` : ""}
        </div>
        <p class="whitespace-nowrap font-bold">${item.name}</p>
      </div>
    </div>
    `,
    popupAnchor: [0, 0],
  });
}
