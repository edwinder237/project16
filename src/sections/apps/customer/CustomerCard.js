import PropTypes from 'prop-types';
import { useState } from 'react';
// next
import NextLink from 'next/link';
// material-ui
import {
  AvatarGroup,
  Box,
  Button,
  Chip,
  CardContent,
  Dialog,
  Divider,
  Fade,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  CardMedia
} from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';
import { PDFDownloadLink } from '@react-pdf/renderer';

// project import
import CustomerPreview from 'sections/apps/customer/CustomerPreview';
import AlertCustomerDelete from 'sections/apps/customer/AlertCustomerDelete';
import AddCustomer from 'sections/apps/customer/AddCustomer';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import { PopupTransition } from 'components/@extended/Transitions';
import ListSmallCard from 'sections/apps/customer/exportpdf/ListSmallCard';

// assets
import { EnvironmentOutlined, LinkOutlined, MailOutlined, MoreOutlined, PhoneOutlined } from '@ant-design/icons';

// ==============================|| CUSTOMER - CARD ||============================== //

const CustomerCard = ({ customer }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    handleMenuClose();
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [add, setAdd] = useState(false);
  const handleAdd = () => {
    setAdd(!add);
  };

  return (
    <>

      <MainCard sx={{ height: 1,'&:hover': {
              transform: 'scale3d(1.02, 1.02, 1)',
              transition: 'all .4s ease-in-out'
            }, '& .MuiCardContent-root': { height: 1, display: 'flex', flexDirection: 'column', bgcolor:"" } }}>
        <Grid bgcolor="" width="110%" id="print" container spacing={2.25}  >
          <Grid item xs={12}>
            <List  sx={{ width: 1, p: 0 }}>
              <ListItem
                disablePadding
                secondaryAction={
                  <IconButton edge="end" aria-label="comments" color="secondary" onClick={handleMenuClick}>
                    <MoreOutlined style={{ fontSize: '1.15rem' }} />
                  </IconButton>
                }
              >
                <Chip variant="light" color="success" size="small" label="live" />
              </ListItem>
            </List>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button'
              }}
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >

              <MenuItem onClick={handleAdd}>Edit</MenuItem>
              <MenuItem onClick={handleAlertClose}>Delete</MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Box sx={{ width: 1, m: 'auto' }}>
          <CardMedia
                sx={{ cursor: 'pointer', height: 130, textDecoration: 'none', opacity:  1  }}
                image="https://i.postimg.cc/sfMSbbC2/edwind.jpg"
              />
</Box>

<CardContent sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack spacing="10px">
                  <Stack spacing="1px">
                    <Stack spacing={1} direction="row">
                      <Typography variant="body2" color="textPrimary">
                        Tags:
                      </Typography>

                      <Chip variant="light" color="secondary" size="small" label="crm" />
                      <Chip variant="light" color="secondary" size="small" label="desking" />
                      <Chip variant="light" color="secondary" size="small" label="campaign" />
                    </Stack>
                  </Stack>

                  <Stack alignItems="center" direction="row">
                    <Typography variant="body2" color="textPrimary">
                      Certified Trainer:
                    </Typography>

                    <AvatarGroup max={4}>
                      <Avatar alt="Marc" src="/static/images/avatar/1.jpg" sx={{ width: 24, height: 24 }} />
                      <Avatar alt="Matthew" src="/static/images/avatar/2.jpg" sx={{ width: 24, height: 24 }} />
                      <Avatar alt="Jamal" src="/static/images/avatar/3.jpg" sx={{ width: 24, height: 24 }} />
                    </AvatarGroup>
                  </Stack>
                  <Stack>
                    <NextLink href={`/apps/e-commerce/product-details/${customer.id}`} passHref>
                      <Typography
                        color="textPrimary"
                        variant="h5"
                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', cursor: 'pointer' }}
                      >
                        {customer.name}
                      </Typography>
                    </NextLink>
                    <Typography variant="h6" color="textSecondary">
                    {customer.summary}
                    </Typography>
                  </Stack>

                </Stack>
              </Grid>
            </Grid>
          </CardContent>



        </Grid>
        <Divider />
        <Stack
          direction="row"
          className="hideforPDf"
          alignItems="center"
          spacing={1}
          justifyContent="space-between"
          sx={{ mt: 'auto', mb: 0, pt: 2.25 }}
        >
          <Typography variant="caption" color="secondary">
          Created: Nov 25th 2023
          </Typography>

          <Button variant="outlined" size="small" onClick={handleClickOpen}>
            Preview
          </Button>
        </Stack>
      </MainCard>

      {/* edit customer dialog */}
      <Dialog
        maxWidth="sm"
        fullWidth
        TransitionComponent={PopupTransition}
        onClose={handleAdd}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        <AddCustomer customer={customer} onCancel={handleAdd} />
      </Dialog>
      
      <AlertCustomerDelete title={customer.id} open={openAlert} handleClose={handleAlertClose} />
    </>
  );
};
//<CustomerPreview customer={customer} open={open} onClose={handleClose} />
CustomerCard.propTypes = {
  customer: PropTypes.object
};

export default CustomerCard;
