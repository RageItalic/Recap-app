'use server'

//this file is for server actions used in Client Components

import { sql } from "@vercel/postgres"
import { revalidatePath, unstable_noStore } from "next/cache"

type TestType = {
    liked: boolean,
    user_id: string,
    recap_id: string
}

export async function handleLikeToggle(data: TestType) {
    unstable_noStore()

    if (data.liked === true) {
        try {
            //insert like in db
            await sql`
            insert into likes (recap_id, user_id) 
            values (${data.recap_id}, ${data.user_id})
            `
            //update like count on recap
            await sql`
            update recaps set totallikes = totallikes + 1 where id = ${data.recap_id}
            `
        } catch (error) {
            console.error("something went wrong adding like to db", error)
            return { message: "failure", likesCount: null }
        }
    } else {
        try {
            //remove like from db
            await sql`
            delete from likes where recap_id = ${data.recap_id} and user_id = ${data.user_id}
            `

            //update like count on recap
            await sql`
            update recaps set totallikes = totallikes - 1 where id = ${data.recap_id}
            `
        } catch (error) {
            console.error("something went wrong removing like from db", error)
            return { message: "failure", likesCount: null }
        }
    }

    //get updated like count
    const totallikes = await sql`
    select totallikes from recaps where id = ${data.recap_id}
    `

    revalidatePath("/feed")
    return { message: "success", likesCount: totallikes.rows[0].totallikes }
}