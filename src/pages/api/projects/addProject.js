export default function handler(req, res) {

    const { newProject,Projects } = req.body;

  console.log(Projects)
    const result = {
      Projects: [newProject,...Projects]

    }
    return res.status(200).json({ ...result });
  }