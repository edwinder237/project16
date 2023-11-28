import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "store";
import { getCourses } from "store/reducers/courses";

//child components
import Moduleswidget from "./moduleswidget";
import Calendar from "./calendar";
import Participantswidget from "./participantswidget";
import SessionNotes from "./SessionNotes";

// material-ui
import { Box, Grid, Stack, Button } from "@mui/material";
//import Button from "themes/overrides/Button";

function AgendaContainer({ ...props }) {
  const dispatch = useDispatch();
  const { curriculum, events, project_parentGroup } = props.Project;
  const { courses } = useSelector((state) => state.courses);

  const [scheduleState, setScheduleState] = useState({ participants: [] });

  useEffect(() => {
    dispatch(getCourses());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getSelectedEventDetails(event) {
    console.log(event)
    const { title: eventTitle, extendedProps } = event;
    const { courseId, event_attendees, event_groups, eventType } =
      extendedProps;

    const project_attendess = event_attendees.map(
      (a) => a.project_participants.participant
    );
    const project_groups = event_groups.map((group) =>
      group.groups.participants.map((p) => p.participant)
    );

    const eventParticipants = project_attendess.concat(...project_groups);

    switch (eventType) {
      case "course":
        const course = courses.find((course) => course.id == courseId);
        setScheduleState({
          ...scheduleState,
          participants: eventParticipants,
          courseTitle: `${course.duration}min | ${eventTitle} | ${course.title}`,
          groupName: [],
          instructorNotes: [],
          modules: course.modules,
        });

        console.log(event);
        break;
      case "other":
        console.log("this is another type of project");
        break;
      case "TypeC":
        // Code for TypeC event
        break;
      // Add more cases as needed

      default:
        // Default case if the type is not recognized
        break;
    }
  }

  console.log(scheduleState);

  if (scheduleState) {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={7} lg={7}>
         
              <Calendar
                project_parentGroup={project_parentGroup}
                curriculum={curriculum}
                getSelectedEventDetails={getSelectedEventDetails}
              />
          
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} bgcolor="">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                {scheduleState.participants ? (
                  <Participantswidget
                    eventParticipants={scheduleState.participants}
                    eventCourse={scheduleState.courseTitle}
                    groupName={
                      scheduleState.groupName &&
                      scheduleState.groupName.groupName
                    }
                  />
                ) : (
                  <>nothing</>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                {scheduleState.modules ? (
                  <Moduleswidget eventState={scheduleState} />
                ) : (
                  <>no modules</>
                )}
              </Grid>

              <SessionNotes notes={scheduleState.instructorNotes} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  } else return null;
}

export default AgendaContainer;
