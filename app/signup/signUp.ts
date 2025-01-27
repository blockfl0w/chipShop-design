"use server"

import { createAdminClient } from "@/lib/server/appwrite";
import { formSchema } from "./form";
import { cookies } from "next/headers";
import { z } from "zod";
import { ID } from "node-appwrite";
import { redirect } from "next/navigation";

export async function signUpUser(values: z.infer<typeof formSchema>) {
  const { account } = await createAdminClient();
  try {
    await account.create(ID.unique(), values.email, values.password, values.firstName)

    const session = await account.createEmailPasswordSession(values.email, values.password);

    cookies().set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

  } catch (e) {
    console.error(e)
  }

  redirect("/home")
}