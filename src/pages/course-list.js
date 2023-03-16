import Link from 'next/link'

// material-ui
import { Typography,List, ListItem,IconButton,MoreOutlined,ListItemAvatar,ListItemText } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/Page';

import CustomerCardPage from './apps/courses/card'

//fake data for course details page
import { data } from '../mock/courses'

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
  <Page title="Sample Page">
<CustomerCardPage/>

  </Page>
);

SamplePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default SamplePage;
