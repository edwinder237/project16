import React from 'react'
import { useEffect, useState } from 'react';
import { getUserStory, getUserStoryOrder, getProfiles, getComments, getItems, getColumns, getColumnsOrder } from 'store/reducers/kanban';

// material-ui
import { useTheme } from '@mui/material/styles';

// project imports
import Layout from 'layout';
import Page from 'components/Page';
import { useDispatch } from 'store';






// Drag and drop components:
import DndApp from 'utils/DndApp'
import DndProps from 'sections/apps/kanban/Board/DndCourses/DndProps' 

// passed as a prop to DndProps
import {CourseEdit} from 'sections/apps/kanban/Board/DndCourses/CourseEdit'
import {dndStyle} from 'sections/apps/kanban/Board/DndCourses/DndStyles'
import ColumnTitle from 'sections/apps/kanban/Board/DndCourses/ColumnTitle'


function courseDetails() {
    const theme = useTheme();
    const dispatch = useDispatch();

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
  

    //Dnd Props generation
const DndCoursesProps = DndProps(theme, CourseEdit, dndStyle, ColumnTitle)
  return (
    <DndApp props={DndCoursesProps}/>
  )
}

export default courseDetails