"use client";

import { signOut } from "@/lib/server/appwrite";
import { cn } from "@/lib/utils";

export default function SignOutButton({ className }: { className?: string }) {
  return (
    <button
      onClick={() => signOut()}
      className={cn(className, "hover:bg-neutral-800 cursor-pointer w-full")}
    >
      Sign out
    </button>
  );
}
