import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  List,
  ListItemButton,
  ListItemSecondaryAction,
  IconButton as Ib,
  ListItemText,
  Menu,
  MenuItem,
  Stack
} from '@mui/material';

// third-party
import { Draggable } from 'react-beautiful-dnd';

// project imports
//import EditStory from '../Backlogs/EditStory';
import AlertItemDelete from './AlertItemDelete';
import { openSnackbar } from 'store/reducers/snackbar';
import { useDispatch, useSelector } from 'store';
import { selectItem, deleteItem } from 'store/reducers/kanban';
import IconButton  from 'components/@extended/IconButton'
//import IconSmallButton from 'components/@extended/IconSmallButton';
import MainCard from 'components/MainCard';

// assets
import { MoreOutlined,PlusCircleOutlined,DownOutlined } from '@ant-design/icons';
import { lb } from 'date-fns/esm/locale';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0,
  ml: 0,
 
  alignSelf: 'flex-start',
  transform: 'none'
};

// item drag wrapper
const getDragWrapper = (isDragging, draggableStyle, theme, radius) => {
  const bgcolor = theme.palette.background.paper + 99;
  return {
    userSelect: 'none',
    margin: `0 0 ${0}px 0`,
    borderColor: theme.palette.divider,
    backgroundColor: isDragging ? bgcolor : theme.palette.background.paper,
    borderRadius: radius,
    ...draggableStyle
  };
};






// ==============================|| KANBAN BOARD - ITEMS ||============================== //

const Items = ({ item, index }) => {
 
//const {modules} = item;

  const theme = useTheme();
  const dispatch = useDispatch();

  const backProfile = item && item.image && `/assets/images/profile/${item.image}`;

  const kanban = useSelector((state) => state.kanban);
  const { userStory, items, columns } = kanban;

  const itemStory = userStory.filter((story) => story?.itemIds?.filter((itemId) => itemId === item.id)[0])[0];

  const handlerDetails = (id) => {
    dispatch(selectItem(id));
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = useState(false);
  const handleModalClose = (status) => {
    setOpen(false);
    if (status) {
      dispatch(deleteItem(item.id, items, columns, userStory));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Task Deleted successfully',
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

  const [openStoryDrawer, setOpenStoryDrawer] = useState(false);
  const handleStoryDrawerOpen = () => {
    setOpenStoryDrawer((prevState) => !prevState);
  };

  const editStory = () => {
    setOpenStoryDrawer((prevState) => !prevState);
  };

  return (
    <>
      {item && (
        <Draggable  key={item.id} draggableId={item.id} index={index}>
          {(provided, snapshot) => (
            <div 
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getDragWrapper(snapshot.isDragging, provided.draggableProps.style, theme, `4px`)}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: itemStory ? -0.75 : 0 }}>
              </Stack>

          <MainCard sx={{ mt: 0 }} content={false}>
            <List
              component="nav"
              sx={{
                px: 0,
                py: 0,
                '& .MuiListItemButton-root': {
                  py: 1.5,
                  '& .MuiAvatar-root': avatarSX,
                  '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                }
                  }}
                >

                  <ListItemButton divider>


                    <Box width={1} height={100} sx={{ display: "flex", flexDirection: "row" }}  >

                      <Box id="container 1" bgcolor="" maxWidth="80px" minWidth="80px">
                        <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }} width={1} height={0.5} >
                          <Avatar
                            sx={{
                              color: 'primary',
                              bgcolor: '#9254DE',
                            }}
                          >
                            {item.sortorder}
                          </Avatar>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }} width={1} height={0.5} >
                          <IconButton sx={{ fontSize: "0.6rem" }} component={DownOutlined} />
                        </Box>
                      </Box>

                      <Box id="tile" minWidth="120px" width={1} maxWidth="170px" height={100} bgcolor="">
                        <ListItemText primary={<Typography
                          onClick={() => handlerDetails(item.id)}
                          variant="subtitle1"
                          sx={{
                            display: 'inline-block',
                            width: 'calc(100% - 34px)',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            verticalAlign: 'middle',
                            cursor: 'pointer',
                            '&:hover': {
                              textDecoration: 'underline'
                            }
                          }}
                        >{item.title}</Typography>}
                          secondary={
                            <React.Fragment>
                              {item.description}
                              <br />

                              <Button size='small' variant="text" startIcon={<PlusCircleOutlined />}>
                                Add activity
                              </Button>
                            </React.Fragment>
                          } />

                      </Box>


                    </Box>

                    <Box id="timming" minWidth={70} height={100} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} bgcolor="">
                      <Stack alignItems="center">
                        <Typography variant="subtitle1" noWrap>
                          {item.duration}
                        </Typography>
                        <Typography variant="h6" color="secondary" noWrap>
                          min
                        </Typography>
                      </Stack>
                    </Box>
                    <Box id="button" width={.05} height={100} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} bgcolor="">
                      <IconButton size="small" color="secondary" onClick={handleClick} aria-controls="menu-comment" aria-haspopup="true">
                        <MoreOutlined />
                      </IconButton>
                    </Box>


                    



                  




                    <ListItemSecondaryAction>
                    <Box sx={{display: "flex",alignItems: "flex-end",justifyContent:"center"}} width={1} height={1} bgcolor="yellow" >
                    
                    </Box>

                    </ListItemSecondaryAction>

                    <Menu
                  id="menu-comment"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  variant="selectedMenu"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      handlerDetails(item.id);
                    }}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setOpen(true);
                    }}
                  >
                    Delete
                  </MenuItem>
                </Menu>
                <AlertItemDelete title={item.title} open={open} handleClose={handleModalClose} />
                  </ListItemButton>

             

            </List>
          </MainCard>

             
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};

Items.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object
};

export default Items;
