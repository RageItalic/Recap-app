'use server'

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  if (user) {
    redirect('/feed');
  }

  return (
    <section className="bg-white flex h-screen w-screen">
      <div className="h-screen flex-initial w-5/12 bg-cover bg-no-repeat bg-[url(https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?q=80&h=5000&w=2454&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
        <h1 className="p-6 text-4xl text-white">Recap</h1>
      </div>
      <div className="h-screen flex-initial w-7/12">
        <nav className="p-2 flex flex-row w-full justify-between">
          <p>logo</p>

          <DropdownMenu>
            <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Get Started</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>FAQ</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>About</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Contact</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </nav>
        <section className="mt-12 pl-2 pr-2 ml-32 mr-9">
          <h1 className="text-4xl uppercase">Share authentic experiences of the places you&apos;ve visited with the world. Be it next door, or across the ocean.</h1>
          <div className="pt-4">
            <Link href={"/login"}>
              <Button variant={"customGreen"}>Get Started</Button>
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
