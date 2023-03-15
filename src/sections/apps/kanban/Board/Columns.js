import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box,Grid, Tooltip } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

// third-party
import { Droppable, Draggable } from 'react-beautiful-dnd';

// project imports
import EditColumn from './EditColumn';
import Items from './Items';
import AddItem from './AddItem';
import AlertColumnDelete from './AlertColumnDelete';
import { openSnackbar } from 'store/reducers/snackbar';
import { useDispatch, useSelector } from 'store';
import { deleteColumn } from 'store/reducers/kanban';
import IconButton from 'components/@extended/IconButton';

// assets
import { DeleteOutlined } from '@ant-design/icons';


// column drag wrapper
const getDragWrapper = (isDragging, draggableStyle, customStyle) => {
 
  return {
    ...customStyle.containerStyle.dragWrapper,
    ...draggableStyle
  };
};

// column drop wrapper
const getDropWrapper = (isDraggingOver,customStyle) => {
  const dropWrapper = customStyle.containerStyle.dropWrapper;
  const bgcolor = dropWrapper.bgcolor;
  const bgcolorDrop = dropWrapper.bgcolorDrop;

  return {
    background: isDraggingOver ? bgcolorDrop : bgcolor,
...customStyle.containerStyle.dropWrapper
  };
};

// ==============================|| KANBAN BOARD - COLUMN ||============================== //

const Columns = ({ column, index,styles, title,dragComponent: DragComponent,info,collapsed,collapsedIndex }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { items, columns, columnsOrder } = useSelector((state) => state.kanban);
 // console.log(items)
  const columnItems = column && column.itemIds.map((itemId) => items.filter((item) => item.id === itemId)[0]);
  const handleColumnDelete = () => {
    setOpen(true);
  };
  const [open, setOpen] = useState(false);
  const handleClose = (status) => {
    setOpen(false);
    if (status) {
      dispatch(deleteColumn(column.id, columnsOrder, columns));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Column deleted successfully',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    }
  };

//console.log(columnItems[collapsedIndex])
const selectedCourseIndex = 0

if (!collapsed && items.length > 0) {
  return (
    <>
      {column && (
        <Draggable draggableId={column.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getDragWrapper(snapshot.isDragging, provided.draggableProps.style, styles)}
            >
              <Droppable droppableId={column.id} type="item">
                {(providedDrop, snapshotDrop) => (
                  <div
                    ref={providedDrop.innerRef}
                    {...providedDrop.droppableProps}
                    style={getDropWrapper(snapshotDrop.isDraggingOver, styles)}

                  >
                    {title}
                    

                    {columnItems && columnItems.map((item, i) => (
                      <DragComponent key={i} item={item} index={i} info={info} styles={styles} />
                    ))}

                    {providedDrop.placeholder}
                    
                  </div>
                )}
              </Droppable>
            </div>
          )}
        </Draggable>
      )}
    </>
  );
} if( items.length > 0) {
  return (
    <>
      {column && (
        <Draggable draggableId={column.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getDragWrapper(snapshot.isDragging, provided.draggableProps.style, styles)}
            >
              <Droppable droppableId={column.id} type="item">
                {(providedDrop, snapshotDrop) => (
                  <div
                    ref={providedDrop.innerRef}
                    {...providedDrop.droppableProps}
                    style={getDropWrapper(snapshotDrop.isDraggingOver, styles)}

                  >
                    {title}



                    {
                     columnItems && !columnItems[selectedCourseIndex].modules ?
                        columnItems[collapsedIndex].modules.map((Module, i) => (

                          <DragComponent key={i} item={Module} index={i} info={info}  styles={styles} />
                        ))
                        :
                        columnItems[selectedCourseIndex].modules[collapsedIndex].activities.map((activities, i) => (

                          <DragComponent key={i} item={activities} index={i} info={info}  styles={styles} />
                        ))
                    }

                    {providedDrop.placeholder}
                    <AddItem columnId={column.id} shortName={info} />
                  </div>
                )}
              </Droppable>
            </div>
          )}
        </Draggable>
      )}
    </>

    
  );
}else return <Box sx={{ display: 'flex' }}><CircularProgress/></Box>;
};

Columns.propTypes = {
  column: PropTypes.object,
  index: PropTypes.number,
  title: PropTypes.object,
};

export default Columns;
