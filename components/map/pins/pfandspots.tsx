import React, { useEffect, useState } from 'react';
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { DivIcon, LatLngExpression } from 'leaflet';
// import { MerchantPopUpContent } from './merchantPopUpContent';
import { useLocalStorage } from 'usehooks-ts';
import { createClient } from '@supabase/supabase-js';

export const PfandSpotsOnMap = ({ onClick }: { onClick: Function }) => {
  
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "");
  const [data, setData] = useState<undefined | any[]>();

  const handleGetSpots = async (min_lon:number, min_lat:number, max_lon:number, max_lat:number) => {
    const {data, error} = await supabase.rpc('pfandspot_in_view', {
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
                    console.log("pin with id "+item.id+" has been clicked.")
                    onClick({...item, type: "pfandspot"})
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
      <div class="relative p-1 pr-2 pl-3 text-black dark:text-white bg-background shadow-md rounded-[100px] border hover:bg-zinc-100 border-zinc-300 flex flex-row items-center w-auto gap-2"> 
        <div class="h-5 w-3 rotate-45">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M120 0l80 0c13.3 0 24 10.7 24 24l0 40L96 64l0-40c0-13.3 10.7-24 24-24zM32 167.5c0-19.5 10-37.6 26.6-47.9l15.8-9.9C88.7 100.7 105.2 96 122.1 96l75.8 0c16.9 0 33.4 4.7 47.7 13.7l15.8 9.9C278 129.9 288 148 288 167.5c0 17-7.5 32.3-19.4 42.6C280.6 221.7 288 238 288 256c0 19.1-8.4 36.3-21.7 48c13.3 11.7 21.7 28.9 21.7 48s-8.4 36.3-21.7 48c13.3 11.7 21.7 28.9 21.7 48c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64c0-19.1 8.4-36.3 21.7-48C40.4 388.3 32 371.1 32 352s8.4-36.3 21.7-48C40.4 292.3 32 275.1 32 256c0-18 7.4-34.3 19.4-45.9C39.5 199.7 32 184.5 32 167.5zM96 240c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-96 0c-8.8 0-16 7.2-16 16zm16 112c-8.8 0-16 7.2-16 16s7.2 16 16 16l96 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-96 0z"/></svg>
        </div>
        <p class="whitespace-nowrap font-bold font-sans text-md">${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
          item.amount / 100,
        )}</p>
      </div>
    </div>
    `,
    popupAnchor: [0, 0],
  });
}
