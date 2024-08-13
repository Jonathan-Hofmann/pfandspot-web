import React, { useEffect, useState } from 'react';
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { DivIcon, LatLngExpression } from 'leaflet';
// import { MerchantPopUpContent } from './merchantPopUpContent';
import { useLocalStorage } from 'usehooks-ts';
import { createClient } from '@supabase/supabase-js';
import supabase from '@/lib/supabase';
import { useNavigation } from '@/contexts/resultsAndNavigation';
import { RecycleSpot } from './spot/recycleSpot';

export const PfandautomatOnMap = ({ onClick }: { onClick: Function }) => {

  const [data, setData] = useState<undefined | any[]>();
  const leftNav = useNavigation();

  const handleGetSpots = async (min_lon:number, min_lat:number, max_lon:number, max_lat:number) => {
    const {data, error} = await supabase.rpc('recycle_machines_in_view', {
      min_lat: min_lat,
      min_long: min_lon,
      max_lat: max_lat,
      max_long: max_lon,
    })
    if(error){
      // console.log(error);
    } else {
      setData(data)
      leftNav.setRecycleSpotsInView(data);
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
          {data.map((item, i) => {
            return(
              <RecycleSpot key={"spot_"+i} item={item} onClick={onClick}/>
            )
          })}
        </>
      }
    </>
  );
}
