import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import prismadb from "./prismadb";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  if (session && session.user && session.user.id) {
    const currentUser = await prismadb.user.findUnique({
      where: {
        id: session?.user.id as string,
      },
      
    });
  return currentUser

  }

  return null
}

export async function getSessionUser() {
  const session = await getServerSession(authOptions)

  return session?.user
}