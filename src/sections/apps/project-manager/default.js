import { useState, useEffect } from 'react';
import { getUserStory, getUserStoryOrder, getProfiles, getComments, getItems, getColumns, getColumnsOrder } from 'store/reducers/kanban';
import { useDispatch, useSelector } from 'store';

// material-ui
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  MoreOutlined,
  Stack,
  TextField,
  Typography
} from '@mui/material';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import AnalyticActivityType from 'components/cards/statistics/AnalyticActivityType';
import IncomeAreaChart from 'sections/dashboard/default/IncomeAreaChart';
import MonthlyBarChart from 'sections/dashboard/default/MonthlyBarChart';
import ReportAreaChart from 'sections/dashboard/default/ReportAreaChart';
import SalesChart from 'sections/dashboard/SalesChart';
import OrdersTable from 'sections/dashboard/default/OrdersTable';
import Board from '../../sections/apps/kanban/Board';
import { data as courses } from '../../mock/courses';
import CourseDetails from '../course-details';
import TextEditor from './textEditor';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';

const avatar1 = '/assets/images/users/avatar-1.png';
const avatar2 = '/assets/images/users/avatar-2.png';
const avatar3 = '/assets/images/users/avatar-3.png';
const avatar4 = '/assets/images/users/avatar-4.png';

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

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = ({ courseIndex }) => {
  const [value, setValue] = useState('today');
  const [slot, setSlot] = useState('week');

  const dispatch = useDispatch();
  const { modules } = useSelector((state) => state.kanban);
  const course1 = courses[courseIndex];

  const totalDuration = modules.reduce((acc, section) => {
    return acc + section.duration;
  }, 0);
  const totalModules = modules.length.toString();

  const totalPractical = modules
    .map((module) => module.activities && module.activities.filter((activity) => activity.category === 'practical').length)
    .reduce((acc, section) => {
      return acc + section;
    }, 0)
    .toString();

  const totalQuiz = modules
    .map((module) => module.activities && module.activities.filter((activity) => activity.category === 'quiz').length)
    .reduce((acc, section) => {
      return acc + section;
    }, 0)
    .toString();
  const totalPassive = modules
    .map((module) => module.activities && module.activities.filter((activity) => activity.category === 'passive').length)
    .reduce((acc, section) => {
      return acc + section;
    }, 0)
    .toString();

  const activitiesAnalysis = {
    practical: totalPractical,
    quiz: totalQuiz,
    passive: totalPassive
  };

  useEffect(() => {
    dispatch(getItems());
    dispatch(getColumns());
    dispatch(getColumnsOrder());
    dispatch(getProfiles());
    dispatch(getComments());
    dispatch(getUserStory());
    dispatch(getUserStoryOrder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (courseIndex) {
    return (
      <Page title="Default Dashboard">
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          {/* row 1 */}
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Typography variant="h5">Dashboard</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce title="Duration" count={`${totalDuration} min`} extra="35,000" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce title="Modules" count={totalModules} extra="8,900" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticActivityType title="Activities" count={activitiesAnalysis} isLoss color="warning" extra="1,943" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce title="Success rate" count="89%" isLoss color="warning" extra="$20,395" />
          </Grid>

          <Grid bgcolor="" item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

          {/* row 2 */}

          <Grid item xs={12} md={5} lg={4}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid minWidth={1} item>
                <Typography variant="h5">Course</Typography>
              </Grid>
              <MainCard sx={{ mt: 2, width: 1 }} title="Info">
                <Stack alignItems="baseline" direction="row" spacing={0}>
                  <Box alignItems="center" minWidth="97px" bgcolor="">
                    <Typography color="primary" variant="body1">
                      Title
                    </Typography>
                  </Box>
                  <Box width={1} bgcolor="">
                    <Typography variant="body1">{course1.name}</Typography>
                  </Box>
                </Stack>

                <Stack alignItems="baseline" direction="row" spacing={0}>
                  <Box alignItems="center" minWidth="97px" bgcolor="">
                    <Typography color="primary" variant="body1">
                      Summary
                    </Typography>
                  </Box>
                  <Box width={1} bgcolor="">
                    <Typography color="secondary" variant="body1">
                      {course1.summary}
                    </Typography>
                  </Box>
                </Stack>

                <Stack alignItems="baseline" direction="row" spacing={0}>
                  <Box alignItems="center" minWidth="97px" bgcolor="">
                    <Typography color="primary" variant="body1">
                      Learning Objectives
                    </Typography>
                  </Box>
                  <Box width={1} bgcolor="">
                    <Typography variant="body2" component="div">
                      <ul>
                        <li>Discuss the basics of angular</li>
                        <li>Locate different vendors</li>
                        <li>Recite all terms</li>
                        <li>Recall their order</li>
                      </ul>
                    </Typography>
                  </Box>
                </Stack>

                <Box display="flex" justifyContent="center">
                  <Typography variant="body2" color="primary">
                    {' '}
                    <Link component="button" onClick={() => console.log('hehe')}>
                      Show More
                    </Link>
                  </Typography>
                </Box>
              </MainCard>
            </Grid>

            {/* courses */}
            <Grid item>
              <CourseDetails courseIndex={courseIndex} />
            </Grid>
          </Grid>

          {/* row 3 */}
          <Grid bgcolor="" item xs={12} md={7} lg={8}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">Content</Typography>
              </Grid>
            </Grid>

            <MainCard sx={{ mt: 2 }} title="Content Editor">
              <TextEditor text={course1.summary} />
            </MainCard>
          </Grid>
        </Grid>
      </Page>
    );
  }
};

DashboardDefault.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ProjectPage;
