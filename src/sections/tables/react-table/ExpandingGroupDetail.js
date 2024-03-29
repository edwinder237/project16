import PropTypes from 'prop-types';
import NextLink from 'next/link';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  useMediaQuery,
  Grid,
  Chip,
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';

// third-party
import { PatternFormat } from 'react-number-format';

// project import
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import CurriculumDetails from './CurriculumDetails';

// assets
import { EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

// ==============================|| EXPANDING TABLE - USER DETAILS ||============================== //

const ExpandingGroupDetail = ({ data }) => {
  console.log(data)
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  const backColor = alpha(theme.palette.primary.lighter, 0.1);

  return (
    <TableRow sx={{ bgcolor: backColor, '&:hover': { bgcolor: `${backColor} !important` } }}>
      <TableCell colSpan={8} sx={{ p: 2.5 }}>
        <Grid container spacing={2.5} sx={{ pl: { xs: 0, sm: 5, md: 6, lg: 10, xl: 12 } }}>
          <Grid item xs={12} sm={5} md={4} xl={3.5}>
            <MainCard>
              <Chip
                label={data.group}
                size="small"
                sx={{
                  position: 'absolute',
                  right: -1,
                  top: -1,
                  borderRadius: '0 4px 0 4px'
                }}
              />
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={2.5} alignItems="center">
                  <Typography variant="h5">
                    Group 1
                  </Typography>
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">
                        {data.firstname} {data.lastname}
                      </Typography>
                      <Typography color="secondary">{data.role}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="space-around" alignItems="center">
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">{data.group}</Typography>
                      <Typography color="secondary">Size</Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">{data.progress}%</Typography>
                      <Typography color="secondary">Progress</Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">{data.visits}</Typography>
                      <Typography color="secondary">Visits</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <List component="nav" aria-label="main mailbox folders" sx={{ py: 0, '& .MuiListItem-root': { p: 0 } }}>
                    <ListItem>
                      <ListItemIcon>
                        <MailOutlined />
                      </ListItemIcon>
                      <ListItemText primary={<Typography color="secondary">Email</Typography>} />
                      <ListItemSecondaryAction>
                        <Typography align="right">{data.email}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneOutlined />
                      </ListItemIcon>
                      <ListItemText primary={<Typography color="secondary">Phone</Typography>} />
                      <ListItemSecondaryAction>
                        <Typography align="right">
                          <PatternFormat displayType="text" format="+1 (###) ###-####" mask="_" defaultValue={data.contact} />
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EnvironmentOutlined />
                      </ListItemIcon>
                      <ListItemText primary={<Typography color="secondary">Location</Typography>} />
                      <ListItemSecondaryAction>
                        <Typography align="right">{data.country}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EnvironmentOutlined />
                      </ListItemIcon>
                      <ListItemText primary={<Typography color="secondary">Portfolio</Typography>} />
                      <ListItemSecondaryAction>
                        <Link align="right" href="https://google.com" target="_blank">
                          https://anshan.dh.url
                        </Link>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={7} md={8} xl={8.5}>
            <Stack spacing={2.5}>
              <MainCard
                title="Curriculum Details"
                content={false}
                secondary={
                  <NextLink href="#" passHref legacyBehavior>
                    <Link color="primary">View all</Link>
                  </NextLink>
                }
              >
                <CurriculumDetails />
              </MainCard>
              <MainCard title="About me">
                <Typography color="secondary">
                  Hello, I’m {data.firstName} {data.lastName} {data.role} based in international company, {data.about}
                </Typography>
              </MainCard>
            </Stack>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
};

ExpandingGroupDetail.propTypes = {
  data: PropTypes.object
};

export default ExpandingGroupDetail;
