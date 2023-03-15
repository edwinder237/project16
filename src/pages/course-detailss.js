// material-ui
import { Typography,List, ListItem,IconButton,MoreOutlined,ListItemAvatar,ListItemText } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/Page';


import DashboardDefault from './dashboard/default'



//fake data for course details page
//import { data } from '../mock/courses'

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
  <Page title="Sample Page">
<DashboardDefault/>


  </Page>
);

SamplePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default SamplePage;
