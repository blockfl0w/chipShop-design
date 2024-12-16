"use client"

import { signOut } from "@/lib/signOut"

export default function SignOutButton() {
    return (
        <button onClick={() => {signOut()}} className=" text-left">Sign out</button>
    )
}