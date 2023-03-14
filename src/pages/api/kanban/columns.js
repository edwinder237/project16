import {data} from './fakeCourses';

const itemIdsData = {
  item1: `1`,
  item2: `2`,
  item3: `3`,
  item4: `4`,
  item5: `5`,
  item6: `6`,
  item7: `7`,
  item8: `8`,
  item9: `9`,
  item10: `10`
};

const columnIdsData = {
  column1: 'column-1',
  column2: 'column-2',
  column3: 'column-3'
};
const columnsData = [
  {
    id: columnIdsData.column1,
    title: 'New',
    itemIds: data.map((item) => item.id)
  },

];
export default function handler(req, res) {
  return res.status(200).json({ columns: columnsData });
}
