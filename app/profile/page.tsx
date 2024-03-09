import { auth } from "@/auth";
import { redirect } from "next/navigation";


export default async function Page() {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        alert("no user found. show this person a version of the profile page with some buttons disabled")
    }
    return (
        <p>User Profile Page</p>
    )
}