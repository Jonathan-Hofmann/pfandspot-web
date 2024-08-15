import { useMemo } from "react"
import { getRecycleSpotStatus } from "../../views/pfandautomat_details"
import { Marker, Popup } from "react-leaflet"
import { DivIcon } from "leaflet"

export const RecycleSpot = ({ item, onClick }: { item: any, onClick: Function }) => {
    const status = useMemo(() => {
        return (getRecycleSpotStatus(item))
    }, [item])


    const geoLoc = {
        lat: item.lat,
        lng: item.long
    }

    return (
        <Marker
            key={item.id}
            position={geoLoc}
            icon={recycleMachineIcon(item, status)}
            eventHandlers={{
                popupopen: (e) => {
                    onClick({ ...item, type: "pfandautomat" })
                },
                popupclose: (e) => {
                    onClick(undefined)
                }
            }}
        >
            <Popup></Popup>
        </Marker>
    )
}


function recycleMachineIcon(item: any, status:any) {
    return new DivIcon({
        html: `
      <div class="absolute z-20 left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] flex flex-col items-center">
        <div class="relative p-2 fill-black dark:fill-white bg-background shadow-md hover:bg-zinc-100 hover:dark:bg-zinc-800 rounded-[12px] border border-zinc-300 dark:border-zinc-700 flex flex-row items-center w-auto gap-2"> 
          <div class="h-4 w-4 ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M174.7 45.1C192.2 17 223 0 256 0s63.8 17 81.3 45.1l38.6 61.7 27-15.6c8.4-4.9 18.9-4.2 26.6 1.7s11.1 15.9 8.6 25.3l-23.4 87.4c-3.4 12.8-16.6 20.4-29.4 17l-87.4-23.4c-9.4-2.5-16.3-10.4-17.6-20s3.4-19.1 11.8-23.9l28.4-16.4L283 79c-5.8-9.3-16-15-27-15s-21.2 5.7-27 15l-17.5 28c-9.2 14.8-28.6 19.5-43.6 10.5c-15.3-9.2-20.2-29.2-10.7-44.4l17.5-28zM429.5 251.9c15-9 34.4-4.3 43.6 10.5l24.4 39.1c9.4 15.1 14.4 32.4 14.6 50.2c.3 53.1-42.7 96.4-95.8 96.4L320 448l0 32c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-64-64c-9.4-9.4-9.4-24.6 0-33.9l64-64c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 32 96.2 0c17.6 0 31.9-14.4 31.8-32c0-5.9-1.7-11.7-4.8-16.7l-24.4-39.1c-9.5-15.2-4.7-35.2 10.7-44.4zm-364.6-31L36 204.2c-8.4-4.9-13.1-14.3-11.8-23.9s8.2-17.5 17.6-20l87.4-23.4c12.8-3.4 26 4.2 29.4 17L182 241.2c2.5 9.4-.9 19.3-8.6 25.3s-18.2 6.6-26.6 1.7l-26.5-15.3L68.8 335.3c-3.1 5-4.8 10.8-4.8 16.7c-.1 17.6 14.2 32 31.8 32l32.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32.2 0C42.7 448-.3 404.8 0 351.6c.1-17.8 5.1-35.1 14.6-50.2l50.3-80.5z"/></svg>
          </div>
          ${status.id === 0 ? `<div class="absolute top-[-5px] right-[-5px] h-4 w-4 rounded-full border-2 border-background bg-green-500"></div>` : ""}
          ${status.id === 1 ? `<div class="absolute top-[-5px] right-[-5px] h-4 w-4 rounded-full border-2 border-background bg-orange-500"></div>` : ""}
          ${status.id === 2 ? `<div class="absolute top-[-5px] right-[-5px] h-4 w-4 rounded-full border-2 border-background bg-zinc-500"></div>` : ""}
        
          <!-- <p class="whitespace-nowrap font-bold">${item.name}</p> -->
        </div>
      </div>
      `,
        popupAnchor: [0, 0],
    });
}
