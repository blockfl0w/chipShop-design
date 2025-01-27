import { createSessionClient } from "@/lib/server/appwrite"

export async function getData() {
  const {databases} = await createSessionClient()

  const res = await databases?.listDocuments(process.env.NEXT_APPWRITE_DB as string, process.env.NEXT_APPWRITE_STOCK_ID as string)

  return res
}