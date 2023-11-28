export default function handler(req, res) {

    const { project } = req.body;

   // console.log(groups)

  
    const result = {
      groups: project.groups

    }
    return res.status(200).json({ ...result });
  }