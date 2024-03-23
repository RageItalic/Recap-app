'use client'

import { findTotalAmountSpent, findOverallRecapRating, LocationsVisited } from "@/lib/utils";
import LikeButton from "../likeButton";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Recap } from "@/app/feed/page";

const RecapCard = ({ recap, loggedInUser }: { recap: Recap, loggedInUser: any }) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleTitleClick = () => {
        const params = new URLSearchParams(searchParams)

        const locationsVisited = recap.json_agg.map((location: LocationsVisited) => location.locationCoordinates)
        params.set("locationsVisited", JSON.stringify(locationsVisited))
        replace(`${pathname}?${params}`)
    }

    const handleDetailsClick = () => {
        const params = new URLSearchParams(searchParams)
        if (params.get("locationsVisited")) {
            params.delete("locationsVisited")
        }
        params.set("likedByUser", recap.liked_by_user.toString())
        replace(`/recap/${recap.id}?${params}`)
    }


    return (
        <div className="p-4 min-w-full" key={recap.id}>
            <figure className="md:flex flex-row gap-1 bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
                <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                    <time
                        dateTime="2022-10-10"
                        className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
                    >
                        <span>2022</span>
                        <span className="w-px flex-1 bg-gray-900/10"></span>
                        <span>Oct 10</span>
                    </time>
                </div>
                <img className="aspect-[3/4] md:w-48 md:h-auto md:rounded-none rounded-full " src="https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?q=80&h=5000&w=2454&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <div className="pt-6 md:p-8 space-y-4 flex flex-col text-wrap">
                    <div className='flex flex-row justify-between'>
                        <p className="text-lg font-medium" onClick={handleTitleClick}>
                            {recap.recaptitle}
                        </p>
                        <LikeButton count={recap.totallikes.toString()} user_id={loggedInUser.id!} recap_id={recap.id} likedByUser={recap.liked_by_user} /*handleLikeToggle={handleLikeToggle}*/ />
                    </div>
                    <figcaption className="font-medium">
                        <div className="text-slate-700 dark:text-slate-500 text-wrap">
                            {recap.recapdescription}
                        </div>
                    </figcaption>
                    <div className='flex flex-row gap-4 text-sm'>
                        <div className='border rounded-md border-[#12664f] max-w-fit px-2'>{recap.json_agg[0].userDateVisited}</div>
                        <div className='border rounded-md border-[#12664f] max-w-fit px-2'>${findTotalAmountSpent(recap.json_agg)} Spent</div>
                        <div className='border rounded-md border-[#12664f] max-w-fit px-2'>{findOverallRecapRating(recap.json_agg)}/5</div>
                    </div>
                    <div className="text-xs font-bold uppercase text-gray-900 flex flex-row flex-1 items-end">
                        <p onClick={handleDetailsClick}>View Details</p>
                    </div>
                </div>
                <div className="rotate-180 p-2 [writing-mode:_vertical-lr] flex-grow justify-self-end">
                    <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900">
                        <span>{recap.username.split(" ")[0]}</span>
                        <span className="w-px flex-1 bg-gray-900/10"></span>
                        <span>{recap.username.split(" ")[1]}</span>
                    </div>
                </div>
            </figure>
        </div>
    );
};

export default RecapCard;