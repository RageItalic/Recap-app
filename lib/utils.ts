//this file is for functions used in Server Components

import { Recap } from "@/app/feed/page"
import { sql } from "@vercel/postgres"
import { type ClassValue, clsx } from "clsx"
import { unstable_noStore } from "next/cache"
import { twMerge } from "tailwind-merge"

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
}


export type LocationsVisited = {
  locationCoordinates: string,
  userLocationRating: number,
  userAmountSpent: number,
  userDateVisited: string
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getUserFeed(userId: string): Promise<Recap[] | []> {
  unstable_noStore()

  try {
    const userFeed = await sql`
    select c.username, c.id, b.*,
    json_agg(json_build_object(
      'locationCoordinates', d.locationcoordinates, 
      'userLocationRating', d.userLocationRating, 
      'userAmountSpent', d.userAmountSpent,
      'userDateVisited', d.userDateVisited
    )),
    exists(select 1 from likes where user_id = ${userId} and recap_id=b.id) AS "liked_by_user"
    from followers a join
    users c on c.id = a.followed_user_id join
    recaps b on b.user_id = c.id join
    locationsvisited d on d.recap_id = b.id
    where a.follower_user_id = ${userId}
    group by c.username, c.id, b.id
    `
    return userFeed.rows.length > 0 ? userFeed.rows as Recap[] : []
  } catch (error) {
    console.error("fetching user feed went wrong", error)
  }
  return []
}

export async function getRecap(recapId: string) {
  try {
    const recapQueryResult = await sql`
    select users.*, recaps.*,
    json_agg(json_build_object(
      'locationCoordinates', locationsvisited.locationcoordinates, 
      'userLocationRating', locationsvisited.userLocationRating, 
      'userAmountSpent', locationsvisited.userAmountSpent,
      'userDateVisited', locationsvisited.userDateVisited,
      'userNotes', locationsvisited.userNotes,
      'locationName', locationsvisited.locationname
    ))
    from recaps join
    users on users.id = recaps.user_id join
    locationsvisited on locationsvisited.recap_id = recaps.id
    where recaps.id = ${recapId}
    group by users.id, recaps.id
    `

    return recapQueryResult.rows[0]
  } catch (error) {
    console.error(`something went wrong FETCHING RECAP with id ${recapId}`, error)
  }
}

export async function getCommentsForRecap(recapId: string) {
  try {
    const commentsQueryResult = await sql`
      select comments.*, users.* 
      from comments join
      users on users.id = comments.user_id
      where recap_id = ${recapId}`

    return commentsQueryResult.rows
  } catch (error) {
    console.error(`something went wrong FETCHING COMMENTS for recap with id ${recapId}`, error)
  }
}

export function findCenterCoordsOfRecap(locationsVisited?: LocationsVisited[], locationsAsStringArray?: string[]) {

  const lats = locationsVisited
    ? locationsVisited.map(coord => Number(coord.locationCoordinates.split(",")[0]))
    : locationsAsStringArray?.map(coord => Number(coord.split(",")[0]))
  const longs = locationsVisited
    ? locationsVisited.map(coord => Number(coord.locationCoordinates.split(",")[1]))
    : locationsAsStringArray?.map(coord => Number(coord.split(",")[1]))

  let latSum = 0
  let longSum = 0
  lats!.forEach(lat => latSum += lat)
  longs!.forEach(long => longSum += long)

  const latsMean = latSum / lats!.length
  const longsMean = longSum / longs!.length

  return { lat: latsMean, lng: longsMean }
}


export function findTotalAmountSpent(locationsVisited: LocationsVisited[]) {
  let amountSpent = locationsVisited.reduce((tot, cur) => {
    tot += cur.userAmountSpent
    return tot
  }, 0)

  return amountSpent
}

export function findOverallRecapRating(locationsVisited: LocationsVisited[]) {
  let rating = locationsVisited.reduce((tot, cur) => {
    tot += cur.userLocationRating
    return tot
  }, 0)


  return Math.round(((rating / locationsVisited.length) + Number.EPSILON) * 10) / 10
}