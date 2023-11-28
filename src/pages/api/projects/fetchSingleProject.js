import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.body;
  try {
    const project = await prisma.projects.findUnique({
      where: {
        id: id,
      },
      include: {
        participants: true,
        groups: true,
        events: {
          include: {
            course: {
              select: {
                id: true,
              },
            },
            event_attendees: {
              include: {
                project_participants:{
                  select:{
                    participant:true
                  }
                }
              }
            },
            event_groups:{
              include:{
                groups:{
                  include:{
                    participants:{
              
                    }
                  }
                }
              }
            }
          },
        },
      },
    });

    res.status(200).json({ project });
    console.log(`${project.title} project fetched successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
