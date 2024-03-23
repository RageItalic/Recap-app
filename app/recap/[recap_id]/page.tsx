import LikeButton from '@/components/likeButton';
import Map from '@/components/ui/map';
import { getRecap, getCommentsForRecap, findCenterCoordsOfRecap, LocationsVisited } from '@/lib/utils';
import { redirect } from 'next/navigation';

export default async function Page({ params, searchParams }: { params: { recap_id: string }, searchParams: { likedByUser: string } }) {
    const [recap, comments] = await Promise.all([getRecap(params.recap_id), getCommentsForRecap(params.recap_id)])

    const likedByUser = searchParams.likedByUser === "true"

    if (!recap) {
        redirect("/404")
    }

    const center = findCenterCoordsOfRecap(recap.json_agg) //{ lat: Number(recap.json_agg[0].locationCoordinates.split(",")[0]), lng: Number(recap.json_agg[0].locationCoordinates.split(",")[1]) } //findCenterCoordsOfRecap(recap.json_agg)


    return (
        <div className='flex flex-row h-screen'>
            <div className='flex flex-col w-7/12 overflow-y-scroll'>
                {/* <pre>
                    {JSON.stringify(recap, null, 2)}
                </pre>
                <p>comments will go at the bottom</p>
                <pre>{JSON.stringify(comments, null, 2)}</pre> */}

                <div className='m-4 flex-1 h-max'>
                    <div className='p-2'>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row gap-2 items-center'>
                                <div className='w-11 rounded-full'>
                                    <img className='rounded-full' src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                                <div>
                                    <h1>{recap.username}</h1>
                                </div>
                            </div>
                            <LikeButton count={recap.totallikes} user_id={recap.user_id} likedByUser={likedByUser} recap_id={recap.id} />
                        </div>

                        <div className='mt-4'>
                            <div className='flex flex-col'>
                                <div className='flex flex-row items-baseline gap-2'>
                                    <h1 className='text-xl font-semibold'>{recap.recaptitle}</h1>
                                    <div className='badge bg-slate-200 p-1 rounded-sm'>4/5</div>
                                </div>
                                <p>{recap.recapdescription}</p>
                            </div>
                        </div>

                        <div className='my-4 h-px w-full bg-gray-200'></div>

                        <ol className="relative border-s border-gray-200 dark:border-gray-700">
                            {recap.json_agg.map((location: any, index: number) => (
                                <li className="mb-10 ms-4">
                                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Stop {index + 1}</time>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{location.locationName}</h3>
                                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                        {location.userNotes}
                                    </p>
                                    {index === 0 &&
                                        <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                                            View on Google
                                            <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                        </a>
                                    }
                                </li>
                            ))}
                        </ol>

                    </div>

                </div>

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