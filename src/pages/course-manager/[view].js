import { useState,useEffect } from 'react';
import axios from 'utils/axios';

// material-ui
import { Typography, List, ListItem, IconButton, MoreOutlined, ListItemAvatar, ListItemText, Box, Grid, Tab, Tabs } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/Page';
import CustomerListPage from './listview'

import CustomerCardPage from './card'

//fake data for course details page
import { data } from '../../mock/courses'

import { useRouter } from 'next/router';


// ==============================|| SAMPLE PAGE ||============================== //


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
function SamplePage() {

  async function getItems() {
    return async () => {
    try {
      const response = await axios.get('/api/kanban/items');
      return response.data.items;
    } catch (error) {
      throw new Error(`Failed to retrieve items: ${error.message}`);
    }
  }
  }
  

    console.log(getItems());
  

 
  const [value, setValue] = useState(view);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    router.push(`/course-manager/${newValue}`);
  };

  const router = useRouter();
  const { view } = router.query;
  return (
    <Page title="Sample Page">
      <Box sx={{ display: 'flex' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Tabs value={view} variant="scrollable" onChange={handleChange}>
              <Tab value='list' label={value ==='listv'?'List':'view as list'} {...a11yProps('list')} />
              <Tab value='cards' label={value==='cards'?'Cards':'View Cards'} {...a11yProps('cards')} />

            </Tabs>
          </Grid>
          <Grid item xs={12}>

            {view === 'list' && <CustomerListPage />}
            {view === 'cards' && <CustomerCardPage />}

          </Grid>
        </Grid>
      </Box>
    </Page>
  )
};

SamplePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default SamplePage;
