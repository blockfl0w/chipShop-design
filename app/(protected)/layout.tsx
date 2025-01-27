import { getLoggedInUser } from "@/lib/server/appwrite"
import { redirect } from "next/navigation"
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const user = await getLoggedInUser()

    if (!user) {
        redirect("/signin")
    }

    return (
        <>
            {children}
        </>
    )
}