import { auth } from "@/auth";
import { redirect } from "next/navigation";


export default async function Page() {

    const session = await auth();
    const user = session?.user;

    if (!user) {
        redirect("/")
    }

    return (
        <p>Edit Recap Page. Make sure only the owner of the recap can edit it.</p>
    )
}