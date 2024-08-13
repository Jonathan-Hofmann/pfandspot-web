import React, { useEffect, useState } from 'react';
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { DivIcon, LatLngExpression } from 'leaflet';
// import { MerchantPopUpContent } from './merchantPopUpContent';
import { useLocalStorage } from 'usehooks-ts';
import { createClient } from '@supabase/supabase-js';
import supabase from '@/lib/supabase';
import { useNavigation } from '@/contexts/resultsAndNavigation';

export const PfandSpotsOnMap = ({ onClick }: { onClick: Function }) => {
  
  const [data, setData] = useState<undefined | any[]>();
  const leftNav = useNavigation();

  const handleGetSpots = async (min_lon:number, min_lat:number, max_lon:number, max_lat:number) => {
    const {data, error} = await supabase.rpc('pfandspot_in_view', {
      min_lat: min_lat,
      min_long: min_lon,
      max_lat: max_lat,
      max_long: max_lon,
    })
    if(error){
      console.log(error);
    } else {
      setData(data)
      leftNav.setPfandSpotsInView(data)
    }
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
                  popupopen:(e)=>{
                    onClick({...item, type: "pfandspot"})
                  },
                  popupclose:(e)=>{
                    onClick(undefined)
                  }
                }}
              >
                <Popup></Popup>
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
      <div class="relative p-2 text-black dark:text-white bg-background shadow-md rounded-[12px] border hover:bg-zinc-100 border-zinc-300 flex flex-row items-center w-auto gap-2"> 
        <div class="h-4 w-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2c0 0 0 0 0 0s0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336l0-35.4c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4l0 3.4 0 5.7 0 26.3zm32 0l0-32 0-25.9c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 44.2-86 80-192 80S0 476.2 0 432l0-35.4c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"/></svg>
        </div>
      </div>
    </div>
    `,
    popupAnchor: [0, 0],
  });
}
