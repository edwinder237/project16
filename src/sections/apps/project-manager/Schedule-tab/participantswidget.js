import { useState } from 'react';

// material-ui
import { CardContent, Checkbox, FormControlLabel, Grid, Tooltip, Stack, Typography } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

// assets
import { PlusCircleOutlined } from '@ant-design/icons';
import IconButton from 'components/@extended/IconButton';

// assets
const Avatar1 = '/assets/images/users/avatar-1.png';
const Avatar2 = '/assets/images/users/avatar-2.png';
const Avatar3 = '/assets/images/users/avatar-3.png';
const Avatar4 = '/assets/images/users/avatar-4.png';

// ===========================|| DATA WIDGET - TODO LIST ||=========================== //

const Participantswidget = ({ eventParticipants,eventCourse,groupName }) => {
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: false,
    checkedE: false,
    checkedF: false,
    checkedG: false
  });

  const handleChangeState = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  
  return (
    <MainCard
      title={`Participants - ${eventCourse} - ${groupName}`}
      content={false}
      secondary={
        <>
        <Stack direction="row">
        <Typography>change group</Typography>
        <Tooltip title="Add Task">
          <IconButton>
            <PlusCircleOutlined />
          </IconButton>
        </Tooltip>
        </Stack>
        </>
      }
      sx={{ '& .MuiCardHeader-root': { p: 1.75 } }}
    >
      <CardContent>
        <Grid container spacing={2.5} sx={{ '& .Mui-checked + span': { textDecoration: 'line-through' } }}>
          {eventParticipants.map(({firstName,lastName,role}) =>

            <Grid item xs={12}>
              <Stack direction="row" spacing={0}>

                <FormControlLabel
                  control={<Checkbox checked={state.checkedA} onChange={handleChangeState} name="checkedA" color="primary" />}
                  label=""
                />
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar alt="User 1" src={Avatar1} />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" variant="subtitle1">
                      {firstName} {lastName}
                    </Typography>
                    <Typography align="left" variant="caption" color="secondary">
                      {role}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="left" variant="caption">
                      5 min ago
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>



          )}


        </Grid>
      </CardContent>
    </MainCard>
  );
};

export default Participantswidget;
