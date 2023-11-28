import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const user = await prisma.users.findMany({
      where: {
        id: '7b701c0e-8d0a-4077-83c2-d4f93eeb3333' ,
      },


    });

    
    

    res.status(200).json({ user });
    console.log("user fetched successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
