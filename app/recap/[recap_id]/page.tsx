import Map from '@/components/ui/map';
import { getRecap, getCommentsForRecap, findCenterCoordsOfRecap, LocationsVisited } from '@/lib/utils';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { recap_id: string } }) {
    const [recap, comments] = await Promise.all([getRecap(params.recap_id), getCommentsForRecap(params.recap_id)])

    if (!recap) {
        redirect("/404")
    }

    const center = findCenterCoordsOfRecap(recap.json_agg) //{ lat: Number(recap.json_agg[0].locationCoordinates.split(",")[0]), lng: Number(recap.json_agg[0].locationCoordinates.split(",")[1]) } //findCenterCoordsOfRecap(recap.json_agg)


    return (
        <div className='flex flex-row h-screen'>
            <div className='flex flex-col w-7/12 overflow-y-scroll'>
                <p>individual recap goes here</p>
                <pre>
                    {JSON.stringify(recap, null, 2)}
                </pre>
                <p>comments will go at the bottom</p>
                <pre>{JSON.stringify(comments, null, 2)}</pre>
            </div>
            <div className='flex w-5/12'>
                <Map
                    apiKey={process.env.GOOGLE_MAPS_API_KEY!}
                    center={center}
                    locations={recap.json_agg.map((location: LocationsVisited) =>
                    ({
                        lat: Number(location.locationCoordinates.split(",")[0]),
                        lng: Number(location.locationCoordinates.split(",")[1])
                    })
                    )}
                    zoom={12.5}
                />
            </div>
        </div>
    )
}