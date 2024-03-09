import { sql } from "@vercel/postgres";
import { UUID } from "crypto";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
export const { handlers, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            try {
                const user = await sql`select id from users where email = ${session.user.email}`
                if (user.rows.length === 0) {
                    const insertedUser = await sql`
                    insert into users (username, email) values (${session.user.name}, ${session.user.email})
                    `
                    session.user.id = insertedUser.rows[0].id
                } else {
                    session.user.id = user.rows[0].id
                }
            } catch (error) {
                console.log("something went wrong", error)
            }

            return session
        },

    }
});
