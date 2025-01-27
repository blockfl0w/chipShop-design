import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { ProfileForm } from "./form";

export default async function Login() {
  const user = await getLoggedInUser()

  if (user) {
    redirect("/")
  }

  return (<div className="p-4"><ProfileForm /></div>)
}