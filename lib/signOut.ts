"use server"
import { createSessionClient } from "./server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut() {
  const { account } = await createSessionClient();
  cookies().delete("my-custom-session");

  console.log("hello")
  await account?.deleteSession("current");

  redirect("/signup");
}
