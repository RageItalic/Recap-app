import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const { handlers, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ]
});