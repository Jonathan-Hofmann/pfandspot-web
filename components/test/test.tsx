
import { createClient } from "@/utils/supabase/server";

export const DBTest = async () => {
    const supabase = createClient();
    // const { data: notes } = await supabase.from("PfandSpot").select();

    const { data, error } = await supabase.rpc('restaurants_in_view', {
        min_lat: 40.807,
        min_long: -73.946,
        max_lat: 40.808,
        max_long: -73.945,
    })

    return (
        <pre>{JSON.stringify(data, null, 2)}</pre>
    )
}