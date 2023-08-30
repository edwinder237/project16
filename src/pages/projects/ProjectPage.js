import { useState} from 'react';


/// import sections 

import AgendaContainer from '../../sections/apps/project-manager/Schedule-tab/agendaContainer'

// material-ui
import {
  Box,
  Chip,
  Grid,
  Typography,
  Tabs,
  Tab
} from '@mui/material';

// project import
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import AnalyticActivityType from 'components/cards/statistics/AnalyticActivityType';
import CoursesList from './courses-list';
import ProductView from './ProductView';
import EnrolmentTAB from 'sections/apps/project-manager/Enrolment-tab/enrolment-TAB';



// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// sales report status
const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

// ==============================|| PROJECT-MANAGER - DEFAULT ||============================== //

const project_parentGroup = "Montreal Honda";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const ProjectPage = ({ Project, index, }) => {
  const {groups} = Project;
  const [tabValue, setTabValue] = useState(0);

  const activitiesAnalysis = {
    practical: 5,
    quiz: 6,
    passive: 5
  }

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (Project) {
    console.log('Hello From ProjectPAGE - ',Project.groups )
    return (

      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Project - {Project.title}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <AnalyticEcommerce title="Duration" count={`${60} min`} extra="35,000" />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <AnalyticEcommerce title="Modules" count={5} extra="8,900" />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <AnalyticActivityType title="Activities" count={activitiesAnalysis} isLoss color="warning" extra="1,943" />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <AnalyticEcommerce title="Success rate" count="89%" isLoss color="warning" extra="$20,395" />
        </Grid>

        <Grid bgcolor="grey" item xs={12} sm={12} md={12} sx={{ mt: 5, display: { sm: '', md: 'block', lg: '' } }} >

          {/* row 2 */}

          <Grid item xs={12} md={12} lg={12}>



            <Tabs value={tabValue} onChange={handleChange} aria-label="navigation tabs" >
              <Tab label="Overview"  {...a11yProps(0)} />
              <Tab label="Curriculum"  {...a11yProps(1)} />
              <Tab label="Enrollment"  {...a11yProps(2)} />
              <Tab label="Schedule"  {...a11yProps(3)} />
              <Tab label="Report" {...a11yProps(4)} />
            </Tabs>



            <TabPanel value={tabValue} index={0}>
              <Chip color='info' label={"Color please"}/>
                
             
              dashboard here
              -- daily reports
              -- attendance report by session/group/month etc
              -- learning progress
              -- the most misted questions
              --

            </TabPanel >
            <TabPanel value={tabValue} index={1}>
              <CoursesList curriculum={Project.curriculum} />

            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <EnrolmentTAB Project={Project} index={index} />

            </TabPanel>



            <TabPanel name='agenda' value={tabValue} index={3}>
              <Grid height={1}>

                <AgendaContainer Project={Project} groups={Project.groups} />

              </Grid>



            </TabPanel>







          </Grid>





        </Grid>
      </Grid>



    )
  } else return <div>Loading..</div>
}


export default ProjectPage;
