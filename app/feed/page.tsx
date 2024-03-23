import React from 'react';
import Map from '@/components/ui/map';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { LocationsVisited, findCenterCoordsOfRecap, findOverallRecapRating, findTotalAmountSpent, getUserFeed } from '@/lib/utils';
import Image from 'next/image';
import LikeButton from '@/components/likeButton';
import { handleLikeToggle } from '@/lib/actions';
import RecapCard from '@/components/ui/recapCard';

export type Recap = {
    username: string,
    id: string,
    user_id: string,
    totallikes: number,
    totalcomments: number,
    recaptitle: string,
    recapdescription: string,
    json_agg: LocationsVisited[],
    liked_by_user: boolean
}


export default async function Page() {
    const zoom = 12.5;

    const session = await auth();
    const loggedInUser = session?.user;
    if (!loggedInUser) {
        redirect("/")
    }

    const loggedInUserFeed = await getUserFeed(loggedInUser.id!)

    if (!loggedInUserFeed) {
        return (
            <div className='flex flex-row h-screen'>
                <div className='flex flex-col w-7/12 overflow-y-scroll'>
                    <p>Your feed is empty! Try following some people first! TAKSH WE FORGOT ABOUT BUILDING THE FUNCTIONALITY TO ALLOW PEOPLE TO FOLLOW EACH OTHER!</p>
                </div>
                <div className='flex w-5/12'>
                    {/* <Map apiKey={process.env.GOOGLE_MAPS_API_KEY!} center={center} locations={locationCoordsFromFirstRecap} zoom={zoom} /> */}
                    <p>Insert a gif here or smth for "not found" or some funnny confused gif here</p>
                </div>
            </div>
        )
    }

    const locationsVisitedFromFirstRecap = loggedInUserFeed[0].json_agg
    const center = findCenterCoordsOfRecap(locationsVisitedFromFirstRecap)
    const locationCoordsFromFirstRecap = locationsVisitedFromFirstRecap.map((location: LocationsVisited) => ({
        lat: Number(location.locationCoordinates.split(",")[0]),
        lng: Number(location.locationCoordinates.split(",")[1])
    }))


    return (
        <div className='flex flex-row h-screen'>
            <div className='flex flex-col w-7/12 overflow-y-scroll'>
                {loggedInUserFeed.length > 0
                    ? loggedInUserFeed.map((recap) => (
                        <RecapCard recap={recap as Recap} key={recap.id} loggedInUser={loggedInUser} />
                    ))
                    : <p>Your feed is empty! Try following some people first! TAKSH WE FORGOT ABOUT BUILDING THE FUNCTIONALITY TO ALLOW PEOPLE TO FOLLOW EACH OTHER!</p>
                }
            </div>
            <div className='flex w-5/12'>
                <Map apiKey={process.env.GOOGLE_MAPS_API_KEY!} center={center} locations={locationCoordsFromFirstRecap} zoom={zoom} />
            </div>
        </div>
    );
};

