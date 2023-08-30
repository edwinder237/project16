import React, { useState } from 'react'
import MainCard from 'components/MainCard';

//child components
import Moduleswidget from './moduleswidget'
import Calendar from './calendar';
import Participantswidget from './participantswidget';
import SessionNotes from './SessionNotes';

// material-ui
import { Box, Grid, Stack } from '@mui/material';


function AgendaContainer({ Project, project_parentGroup, groups }) {

    const { curriculum, events } = Project;

    const [eventState, setEventState] = useState({ participants: [] });

    function getLookupData(lookupData) {
        // LookupDate returns courseId , groupName, courseTitle from selected Event Listener.
        const eventCouseName = events.filter((event) => event.uuid === lookupData.courseId)[0].groups[0];
        const eventGroup = groups.filter((name) => name.groupName === eventCouseName)[0];
        const eventParticipants = eventGroup.employees
        const eventModules = curriculum[0].courses.filter((course) => course.name === lookupData.courseTitle)[0].modules;
        const eventInstructorNotes = events.filter((event) => event.uuid ===  lookupData.courseId)[0].instructorNotes;
        setEventState({ 
            participants: eventParticipants, 
            courseTitle: lookupData.courseTitle, 
            groupName: eventGroup, 
            modules: eventModules,
           instructorNotes: eventInstructorNotes
        });
        return lookupData
    };

if(eventState){

    return (
        <div>
            < Grid container spacing={2} >

                <Grid item xs={12} sm={12} md={7} lg={7} >
                    <MainCard sx={{ mt: 0, width: 1 }} title="My Day" >
                        <Calendar project_parentGroup={project_parentGroup} curriculum={curriculum} events={events} getLookupData={getLookupData} />
                    </MainCard>
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5} bgcolor="" >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}  >
                            <Participantswidget eventParticipants={eventState.participants} eventCourse={eventState.courseTitle} groupName={eventState.groupName&&eventState.groupName.groupName} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <Moduleswidget eventState={eventState} />
                        </Grid>

                        <SessionNotes notes={eventState.instructorNotes} />

                    </Grid>
                </Grid>
            </Grid>




        </div >
    )
}else return null
   
}

export default AgendaContainer



