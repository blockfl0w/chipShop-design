"use server";

import { createSessionClient } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { ID } from "node-appwrite";

export default async function submit(
  fileURL: string,
  name: string,
  description: string
) {
  const { databases, account } = await createSessionClient();

  try {
    const user = await account?.get();
    await databases?.createDocument(
      process.env.NEXT_APPWRITE_DB_ID as string,
      process.env.NEXT_APPWRITE_STOCK as string,
      ID.unique(),
      {
        createdBy: user?.$id,
        name: name,
        description:
          description !== "" && description ? description : undefined,
        imageSrc: fileURL !== "" && fileURL ? fileURL : undefined,
        amount: 0,
      }
    );
  } catch (e) {
    console.error(e);
  }
  redirect("/stock");
}
