import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

// third-party
import { Droppable, Draggable } from 'react-beautiful-dnd';

// project imports
import EditColumn from './EditColumn';
import Items from './Items';
import AddItem from './AddItem';
//import AlertColumnDelete from './AlertColumnDelete';
import { openSnackbar } from 'store/reducers/snackbar';
import { useDispatch, useSelector } from 'store';
import { deleteColumn } from 'store/reducers/kanban';
//import IconButton from 'components/@extended/IconButton';

// assets
//import { DeleteOutlined } from '@ant-design/icons';

// column drag wrapper
const getDragWrapper = (isDragging, draggableStyle, theme, radius) => {
  // const bgcolor = theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary.lighter;
  return {
    minWidth: '100%',
    borderRadius: radius,
    userSelect: 'none',
    margin: `0 ${0}px 0 0`,
    height: '100%',
    ...draggableStyle
  };
};

// column drop wrapper
const getDropWrapper = (isDraggingOver, theme, radius) => {
  const bgcolor = theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.secondary.lighter;
  const bgcolorDrop = theme.palette.mode === 'dark' ? theme.palette.text.disabled : theme.palette.secondary.light + 65;

  return {
    background: isDraggingOver ? bgcolorDrop : bgcolor,
    padding: '8px 16px 14px',
    width: 'auto',
    borderRadius: radius
  };
};

// ==============================|| KANBAN BOARD - COLUMN ||============================== //

const Columns = ({ column, index }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { items, columns, columnsOrder } = useSelector((state) => state.kanban);
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

  return (
    <>
      {column && (
        <Draggable draggableId={column.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getDragWrapper(snapshot.isDragging, provided.draggableProps.style, theme, `4px`)}
            >
              <Droppable droppableId={column.id} type="item">
                {(providedDrop, snapshotDrop) => (
                  <div
                    ref={providedDrop.innerRef}
                    {...providedDrop.droppableProps}
                    style={getDropWrapper(snapshotDrop.isDraggingOver, theme, `4px`)}
                  >
                    <Grid container alignItems="center" spacing={3}>
                      <Grid item xs zeroMinWidth>
                        <EditColumn column={column} />
                      </Grid>
     
                    </Grid>
                    {columnItems && columnItems.map((item, i) => <Items key={i} item={item} index={i} />)}
                    {providedDrop.placeholder}
                    <AddItem columnId={column.id} />
                  </div>
                )}
              </Droppable>
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};

Columns.propTypes = {
  column: PropTypes.object,
  index: PropTypes.number
};

export default Columns;
