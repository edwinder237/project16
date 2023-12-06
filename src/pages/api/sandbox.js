import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const projects = await prisma.projects.findUnique({
where:{
  id:22
},
select:{
  project_curriculums:{
   
      select:{
        curriculum:{
          select:{
            title:true,
            curriculum_courses:{
              select:{
                course:{
                  select:{
                    title:true
                  }
                }
              }
            }
          }
        }
      }
      
    
  }
}
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
