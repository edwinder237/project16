import { useState } from 'react';

// material-ui
import { CardContent, Checkbox, FormControlLabel, Grid, Tooltip, Stack, Typography } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import { useSelector } from "store";

// assets
import { PlusCircleOutlined } from '@ant-design/icons';
import IconButton from 'components/@extended/IconButton';

// assets
const Avatar1 = '/assets/images/users/avatar-1.png';

// ===========================|| DATA WIDGET - TODO LIST ||=========================== //

const Participantswidget = ({ eventParticipants,eventCourse,groupName }) => {
  const { singleProject } = useSelector((state) => state.projects);
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

  const eventParticipantsDetails = eventParticipants.map((participant) => {
    const foundPerson = singleProject.participants.find((project_participant) => project_participant.id === participant.project_paticipantId);
    return foundPerson ? { ...participant, participant: foundPerson.participant } : null;
  });

 // console.log('yoo',singleProject)
  
  return (
    <MainCard
      title={` ${eventCourse} | Participants `}
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
          {eventParticipants.map(({...participant}) =>

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
                      {participant.firstName} {participant.lastName} 
                    </Typography>
                    <Typography align="left" variant="caption" color="secondary">
                      {participant.role}
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
