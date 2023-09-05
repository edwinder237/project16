import { useState } from 'react';


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
import { useTheme } from '@mui/material/styles';

// project import
import UserCountCard from 'components/cards/statistics/UserCountCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import AnalyticActivityType from 'components/cards/statistics/AnalyticActivityType';
import CoursesList from './courses-list';
import ProductView from './ProductView';
import EnrolmentTAB from 'sections/apps/project-manager/Enrolment-tab/enrolment-TAB';

// assets
import {
  AimOutlined,
  BarChartOutlined,
  CalendarOutlined,
  ContactsOutlined,
  DownloadOutlined,
  EyeOutlined,
  FacebookOutlined,
  FileTextOutlined,
  FileProtectOutlined,
  FieldTimeOutlined,
  LinkedinOutlined,
  RedditOutlined,
  TwitterOutlined,
  YoutubeOutlined
} from '@ant-design/icons';



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
  const { groups } = Project;
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
    const today = new Date();
    const startDateString = Project.start_date;
    const endDateString = Project.end_date;

    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

const daysLeft = Math.ceil((endDate - today) / millisecondsPerDay);
    console.log('Hello From ProjectPAGE - ', today -endDate)
    const theme = useTheme();
    return (

      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Project - {Project.title}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <UserCountCard primary="Participants" secondary={Project.participants.length} iconPrimary={ContactsOutlined} color={theme.palette.primary.light} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <UserCountCard primary="Groups" secondary={Project.groups.length} iconPrimary={FileProtectOutlined} color={theme.palette.primary.light} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <UserCountCard primary="Days left" secondary={daysLeft} iconPrimary={RedditOutlined} color={theme.palette.primary.light} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <UserCountCard primary="Events" secondary={Project.events.length} iconPrimary={FileProtectOutlined} color={theme.palette.secondary.light} />
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


              dashboard here
              <br />
              -- daily reports
              <br />
              -- attendance report by session/group/month etc
              <br />
              -- learning progress
              <br />
              -- the most misted questions
              <br />
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
