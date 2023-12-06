import { useEffect, useMemo, useState } from "react";

//REDUX
import { useDispatch, useSelector } from "store";
import { getParticipants } from "store/reducers/projects";

// material-ui
import { Grid } from "@mui/material";

// project import
import Layout from "layout";
import Page from "components/Page";
import GroupTable from "./Groups";
import ParticipantTable from "./Participants";

// ==============================|| REACT TABLE - GROUPING ||============================== //

const EnrolmentTAB = ({ Project, index }) => {
 
  const { title, id } = Project;
  console.log('hello from ENROLLMENT TAB',id)
  const dispatch = useDispatch();

  useEffect(() => {

    const fetchDetails = async () => {
      await dispatch(getParticipants(id));
    };
    fetchDetails()
  }, []);

  const Participants = useSelector( (state) => state.projects.project_participants);
  console.log(Participants)
  return (
    <Page title={`${title} Enrollment`}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
       <GroupTable index={index} Project={Project} />
        </Grid>
        <Grid item xs={12}>
          <ParticipantTable index={index} Project={Project} Participants={Participants.length>0?Participants:[]} />
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
