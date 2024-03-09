import { auth } from "@/auth";
import { redirect } from "next/navigation";


export default async function Page() {

    const session = await auth();
    const user = session?.user;

    if (!user) {
        redirect("/")
    }

    return (
        <p>Create Recap Page.</p>
    )
}