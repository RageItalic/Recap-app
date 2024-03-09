'use client'

import Image from "next/image"
import heartOutline from '@/public/heart-outline.svg'
import heartFilled from '@/public/heart-filled.svg'
import { useEffect, useState } from "react"
import { handleLikeToggle } from "@/lib/actions"
import { useFormState } from "react-dom"

export default function LikeButton({ count, user_id, recap_id, likedByUser /*handleLikeToggle*/ }: { count: string, user_id: string, recap_id: string, likedByUser: boolean /*handleLikeToggle: Function*/ }) {
    const [liked, setLiked] = useState(likedByUser)

    const initialState = {
        message: "",
        likesCount: null
    }
    const handleLikeToggleWithArgs = handleLikeToggle.bind(null, { liked: !liked, user_id, recap_id })
    const [state, dispatch] = useFormState(handleLikeToggleWithArgs, initialState)

    useEffect(() => {
        if (state.message === "success") {
            setLiked(old => !old)
        }
    }, [state])

    return (
        <div className="flex flex-row items-center">
            <form action={dispatch}>
                <button type="submit">
                    <Image src={liked ? heartFilled : heartOutline} alt='like outline icon' />
                </button>
            </form>
            <p>{state.message === "success" ? state.likesCount : count}</p>
        </div>
    )
}