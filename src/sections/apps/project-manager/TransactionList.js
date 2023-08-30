// material-ui
import { List, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import AntAvatar from 'components/@extended/Avatar';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';


// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| LIST - TRANSACTION ||============================== //

const TransactionList = ({ events }) => (
  <MainCard sx={{ mt: 2 }} content={false}>
    <List
      component="nav"
      sx={{
        py: 0,
        '& .MuiListItemButton-root': {
          '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
        }
      }}
    >
      {events.map((event => {

        return (
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}> 
            <ListItemButton divider>
              <ListItemAvatar>
                <AntAvatar alt="Basic" type="combined" color="success">
                  <GiftOutlined />
                </AntAvatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">{event.summary}</Typography>} secondary={`Participant: ${event.attendees.length}`} />
              <ListItemSecondaryAction>
                <CircularWithPath size={40} showLabel variant="determinate" value={55} color="secondary" />
              </ListItemSecondaryAction>
            </ListItemButton>
            </List>
            )


      }))}


          </List>
  </MainCard>
);

export default TransactionList;
