

export default function handler(req, res) {
  const { index, removedParticipant } = req.body;

  const result = {
    projectIndex: index,
    removedParticipant: removedParticipant,
  };

  //console.log(allGroups);
  return res.status(200).json({ ...result });
}
