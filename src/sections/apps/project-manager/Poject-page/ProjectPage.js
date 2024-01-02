import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "store";
import { getProjectCurriculums } from "store/reducers/projects";

//Breadcrumbs imports
import Link from "next/link";

// material-ui
import {
  Box,
  Breadcrumbs,
  Chip,
  Grid,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project import
import Loader from "components/Loader";
import HeaderCountCard from "components/cards/statistics/HeaderCountCard";
import LabelledTasks from "./Header/LabelledTasks";
import TabSettings from "./Settings-tab/TabSettings";
import SearchContainer from "./Curriculum-tab/SearchContainer";
import AgendaContainer from "./Schedule-tab";

// assets
import {
  ContactsOutlined,
  FileProtectOutlined,
  RedditOutlined,
} from "@ant-design/icons";
import { dispatch } from "store";

// ==============================|| PROJECT PAGE ||============================== //

const EnrolmentTAB = dynamic(() =>
  import("sections/apps/project-manager/Poject-page/Enrolment-tab").catch(
    (err) => console.error(err)
  )
);


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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProjectPage = () => {
  const dispatch = useDispatch();
  const { singleProject: Project, project_curriculums } = useSelector(
    (state) => state.projects
  );
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    dispatch(getProjectCurriculums(parseInt(Project.id)));
  }, []);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  console.log(project_curriculums);
  if (Project) {
    const today = new Date();
    const startDateString = Project.startDate;
    const endDateString = Project.endDate;

    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

    const daysLeft = Math.ceil((endDate - today) / millisecondsPerDay);
    console.log("Hello From ProjectPAGE - ", Project);
    const theme = useTheme();
    return (
      <Grid container columnSpacing={2.75}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link href="/projects">
                <Box
                  sx={{
                    height: 40,
                    cursor: "pointer",
                    ":hover": { textDecoration: "underline" },
                  }}
                >
                  <Typography> Back to projects</Typography>
                </Box>
              </Link>
            </Breadcrumbs>
          </Grid>

          <Grid item xs={12} sx={{ pb: 7 }}>
            <Typography variant="h5">Project - {Project.title}</Typography>
          </Grid>
        </Grid>
        {/* HEADER */}
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <HeaderCountCard
              primary="Participants"
              secondary={Project.participants.length}
              iconPrimary={ContactsOutlined}
              color={theme.palette.primary.light}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <HeaderCountCard
              primary="Groups"
              secondary={Project.groups.length}
              iconPrimary={FileProtectOutlined}
              color={theme.palette.primary.light}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={3}>
            <HeaderCountCard
              primary="Events"
              secondary={Project.events.length}
              iconPrimary={FileProtectOutlined}
              color={theme.palette.secondary.light}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <LabelledTasks color={theme.palette.primary.light} />
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            bgcolor: "#1c1c1b",
            mt: 5,
            display: { sm: "", md: "block", lg: "" },
          }}
        >
          {/* row 2 */}

          <Grid item xs={12} md={12} lg={12}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="navigation tabs"
            >
              <Tab label="Overview" {...a11yProps(0)} />
              <Tab
                label="Curriculum"
                icon={
                  !project_curriculums?.length > 0 && (
                    <Chip
                      label={"!"}
                      variant="light"
                      color="primary"
                      size="small"
                    />
                  )
                }
                iconPosition="end"
                {...a11yProps(1)}
              />
              <Tab label="Enrollment" {...a11yProps(2)} />
              <Tab label="Schedule" {...a11yProps(3)} />
              <Tab label="Checklist" {...a11yProps(4)} />
              <Tab label="Settings" {...a11yProps(5)} />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              Main --- number of courses created vs courses delivered using the
              Sales profit dashboard here - MVP
              <br />
              -- Daily reports - Use GPT to summerize event notes - Attendance
              Report - assesment Report - completion report - Checklist Report
              <br />
              -- attendance report by session/group/month etc
              <br />
              -- learning progress
              <br />
              -- the most misted questions
              <br />
              --
              <br />
              <br />
              <br />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <SearchContainer />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <EnrolmentTAB Project={Project} index={0} />
            </TabPanel>

            <TabPanel name="agenda" value={tabValue} index={3}>
              <Grid height={1}>
                <AgendaContainer Project={Project} />
              </Grid>
            </TabPanel>
            <TabPanel value={tabValue} index={5}>
              <TabSettings />
            </TabPanel>
          </Grid>
        </Grid>
      </Grid>
    );
  } else return <Loader />;
};

export default ProjectPage;
