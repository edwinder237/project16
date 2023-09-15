import React from 'react'
import { useEffect, useState } from 'react';
import { getUserStory, getUserStoryOrder, getProfiles, getComments, getItems, getColumns, getColumnsOrder, getDndItems, getNestedColumns, getNestedColumns2, getModule } from 'store/reducers/kanban';

// material-ui
import { useTheme } from '@mui/material/styles';

// project imports
import Layout from 'layout';
import Page from 'components/Page';
import { useDispatch, useSelector } from 'store';







// Drag and drop components:
import DndApp from 'utils/DndApp'
import DndProps from 'sections/apps/kanban/Board/DndCourses/DndProps'

// passed as a prop to DndProps
import { CourseEdit } from 'sections/apps/kanban/Board/DndCourses/CourseEdit'
import { dndStyle } from 'sections/apps/kanban/Board/DndCourses/DndStyles'
import ColumnTitle from 'sections/apps/kanban/Board/DndCourses/ColumnTitle'



function CourseDetails({ courseIndex }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  //getDndItems props 
  const query = '/api/kanban/items'; //req from database
  const stateIndex = courseIndex; //optional: index of the selected array from the query
  const storedState = 'modules'; //optional: name of the array in the query
  const stateKey = `items`;  //key used to pull data from database



  useEffect(() => {
    dispatch(getDndItems(query, stateKey, stateIndex, storedState));
    dispatch(getColumns());
    dispatch(getColumnsOrder());

    dispatch(getNestedColumns(courseIndex));
    dispatch(getNestedColumns2(courseIndex));


    //dispatch(getProfiles());
    //dispatch(getComments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { columns, columnsOrder, modules, nestedColumns } = useSelector((state) => state.kanban);


  //const itemsData  =  items[0].modules.filter((item) => item.length > 0).map((item) => item.id);

  const itemsData = modules && modules.length > 0 ? modules : null;

  //const columnsData = getModules(itemsData[0].modules)
  //console.log(itemsData)
  //console.log(columns)


  //Dnd Props generation (theme,component,style,info,collapsed,collapsedIndex,titleComponent,mainIndex )
  const DndCoursesProps = DndProps(theme, CourseEdit, dndStyle, null, ColumnTitle, courseIndex, itemsData, nestedColumns)
  return (
    <DndApp props={DndCoursesProps} />
  )
}

export default CourseDetails