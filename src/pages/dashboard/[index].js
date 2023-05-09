import React from 'react'
import { useRouter } from 'next/router'
import DashboardDefault from 'pages/dashboard/default'


// material-ui
import { Typography,List, ListItem,IconButton,MoreOutlined,ListItemAvatar,ListItemText } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/Page';


// ==============================|| SAMPLE PAGE ||============================== //


function CourseDetailsPage() {
  const router = useRouter()
const { index } = router.query
  return (
    <Page title="Course Details Page">
    <DashboardDefault courseIndex={index}/>
      </Page>
  )
}

CourseDetailsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default CourseDetailsPage;




