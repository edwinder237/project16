import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const projects = await prisma.organizations.delete({
      where: {
        id: '5600a0c2-be25-493c-b87e-ccba064574ab' ,
      },


    });

    
    

    res.status(200).json({ projects });
    console.log("projects fetched successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
