import { useState } from "react";
import axios from "axios"
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BsArrowRightShort } from "react-icons/bs";
import { useLocalStorage } from "usehooks-ts";

export const AddressSearch = () => {

    const [results, setResults] = useState<any>();
    const [searchString, setSearchString] = useState("");
    const [position, setPosition] = useLocalStorage("map_pos", {lat:53.5818361971279, lng:9.988713141490866})
    let timeout: NodeJS.Timeout;

    const requestPostalCodeData = async (postalCode: string) => {
        const resp = await axios.get("https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-postal-code@public/records?select=*&where=%22" + postalCode + "%22&limit=30");
        setResults(resp.data);
    }

    return (
        <div>
            <Input placeholder="Suche nach einer Stadt, PLZ und mehr..." value={searchString} onChange={(e) => {
                setSearchString(e.target.value);

                if (timeout) {
                    clearTimeout(timeout)
                }

                timeout = setTimeout(() => {
                    requestPostalCodeData(e.target.value)
                }, 500)
            }} className="w-full" />

            {results?.total_count > 0 &&
                <ScrollArea className="h-[400px]">
                    {results?.results.map((result: any) => {
                        return (
                            <div key={result.place_name + "_" + result.latitude + "_" + result.longitude} onClick={() => {
                                setPosition({
                                    lat: result.latitude,
                                    lng: result.longitude
                                })
                                setResults(undefined);
                                setSearchString("")
                            }} className="py-1 px-2 my-1 flex flex-row items-center justify-between cursor-pointer hover:bg-zinc-100 hover:dark:bg-zinc-900 rounded-lg">
                                <p className="text-sm">{result.place_name}, {result.postal_code}, {result.country_code}</p>
                                {/* <BsArrowRightShort className="h-5 w-5" /> */}
                            </div>
                        )
                    })}
                </ScrollArea>
            }
            {results?.total_count === 0 &&
                <p>Keine Ergebnisse für {searchString}</p>
            }
        </div>
    )
}