"use server"

import { createAdminClient } from "@/lib/server/appwrite";
import { formSchema } from "./form";
import { cookies } from "next/headers";
import { z } from "zod";

export async function signInUser(values: z.infer<typeof formSchema>) {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailPasswordSession(values.email, values.password);

    console.log(session)

    cookies().set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    console.log(session)
  } catch (e) {
    console.error(e)
  }


}