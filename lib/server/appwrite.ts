// src/lib/server/appwrite.js
"use server";
import { Client, Account, Databases, Storage, Users } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string );

  const session = cookies().get("my-custom-session");

  if (!session || !session.value) {
    return {Account: null, Databases: null, Storage: null}
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client)
    },
    get storage() {
      return new Storage(client)
    }
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)
    .setKey(process.env.NEXT_APPWRITE_KEY as string);

  return {
    get account() {
      return new Account(client);
    },
    get users() {
      return new Users(client)
    }
  };
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account?.get();
  } catch (error) {
    console.error(error)
    return null;
  }
}

export async function getStock() {
  try {
    const {databases} = await createSessionClient()

    const res = await databases?.listDocuments(process.env.NEXT_APPWRITE_DB as string, process.env.NEXT_APPWRITE_STOCK_ID as string)

    return res
  } catch (e) {
    console.error(e)
  }
}

export async function getUser(userID: string) {
  try {
    const {users} = await createAdminClient()

    const user = await users.get(userID)

    if (user) {
      return user
    } else {
      return null
    }
  } catch (e) {
    console.error(e)
  }
}

export async function deleteUser(userID: string) {
  try {
    const {users} = await createAdminClient()

    await users.delete(userID)
  } catch (e) {
    console.error(e)
  }
}

export async function signOut() {
  console.log("attempt")
  try {
    const {account} = await createSessionClient()

    await account?.deleteSession("current")

    cookies().delete("my-custom-session")
  } catch (e) {
    console.error(e)
  }
}