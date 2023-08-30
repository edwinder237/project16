import { useEffect, useMemo, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import GroupTable from './GroupsTable';
import ParticipantsTable from './ParticipantsTable';
import ParticipantTable from './ParticipantTable';
import projects from 'store/reducers/projects';


// ==============================|| REACT TABLE - GROUPING ||============================== //

const EnrolmentTAB = ({ Project, index }) => {

  const { title} = Project;


  return (
    <Page title={`${title} Enrollment`}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <GroupTable index={index} Project={Project}  />
        </Grid>
        <Grid item xs={12}>
          <ParticipantTable index={index} Project={Project}/>

        </Grid>

      </Grid>
    </Page>
  );
};

EnrolmentTAB.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default EnrolmentTAB;

//<ParticipantsTable index={index} participants={participants} groups={groups} />