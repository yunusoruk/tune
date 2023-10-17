import { PrismaClient } from "@prisma/client"

// declare global {
//   // eslint-disable-next-line no-var
//   var cachedPrisma: PrismaClient
// }

// let prisma: PrismaClient
// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient()
// } else {
//   if (!global.cachedPrisma) {
//     global.cachedPrisma = new PrismaClient()
//   }
//   prisma = global.cachedPrisma
// }

// export const prismadb = prisma


declare global {
  var prisma: PrismaClient | undefined
}

const prismadb = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb

export default prismadb;