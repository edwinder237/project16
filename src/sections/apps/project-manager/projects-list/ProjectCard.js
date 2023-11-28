import PropTypes from "prop-types";
import { useState } from "react";
// next
import NextLink from "next/link";
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
  List,
  ListItem,
  Menu,
  MenuItem,
  Stack,
  Typography,
  CardMedia,
} from "@mui/material";

// third-party
import { format } from "date-fns";

// project import
import ProjectPreview from "./ProjectPreview";
import AlertCustomerDelete from "sections/apps/customer/AlertCustomerDelete";
import AddProject from "./AddProject";
import MainCard from "components/MainCard";
import Avatar from "components/@extended/Avatar";
import IconButton from "components/@extended/IconButton";
import { PopupTransition } from "components/@extended/Transitions";

// assets
import { MoreOutlined } from "@ant-design/icons";

// ==============================|| CUSTOMER - CARD ||============================== //

const ProjectCard = ({ course, customer,projectId }) => {
  const formatedCreationDate = format(new Date(course.createdAt), "dd/MM/yyyy");

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

  let statusChip;
  
  switch (course.projectStatus) {
    case "ongoing":
      statusChip = (
        <Chip
          variant="light"
          color="success"
          size="small"
          label={course.projectStatus}
        />
      );
      break;
    case "completed":
      statusChip = (
        <Chip
          variant="light"
          color="primary"
          size="small"
          label={course.projectStatus}
        />
      );
      break;
    case "pending":
      statusChip = (
        <Chip
          variant="light"
          color="warning"
          size="small"
          label={course.projectStatus}
        />
      );
      break;
    case "cancelled":
      statusChip = (
        <Chip
          variant="light"
          color="error"
          size="small"
          label={course.projectStatus}
        />
      );
      break;
    default:
      statusChip = (
      <Chip
      variant="light"
      color="error"
      size="small"
      label='draft'
    />
      );
  }

  return (
    <>
      <MainCard
        sx={{
          height: 1,
          "&:hover": {
            transform: "scale3d(1.02, 1.02, 1)",
            transition: "all .4s ease-in-out",
          },
          "& .MuiCardContent-root": {
            height: 1,
            display: "flex",
            flexDirection: "column",
            bgcolor: "",
          },
        }}
      >
        <Grid bgcolor="" width="110%" id="print" container spacing={2.25}>
          <Grid item xs={12}>
            <List sx={{ width: 1, p: 0 }}>
              <ListItem
                disablePadding
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    color="secondary"
                    onClick={handleMenuClick}
                  >
                    <MoreOutlined style={{ fontSize: "1.15rem" }} />
                  </IconButton>
                }
              >
                    {statusChip }
                     
                
              </ListItem>
            </List>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleAdd}>Edit</MenuItem>
              <MenuItem onClick={handleAlertClose}>Delete</MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Box sx={{ width: 1, m: "auto" }}>
            <CardMedia
              sx={{
                cursor: "pointer",
                height: 130,
                textDecoration: "none",
                opacity: 1,
              }}
              image="https://f.hubspotusercontent30.net/hubfs/3277184/employee%20training%20and%20development.png"
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

                      <Chip
                        variant="light"
                        color="secondary"
                        size="small"
                        label="crm"
                      />
                      <Chip
                        variant="light"
                        color="secondary"
                        size="small"
                        label="desking"
                      />
                      <Chip
                        variant="light"
                        color="secondary"
                        size="small"
                        label="campaign"
                      />
                    </Stack>
                  </Stack>

                  <Stack alignItems="center" direction="row">
                    <Typography variant="body2" color="textPrimary">
                      Instructors:
                    </Typography>

                    <AvatarGroup max={4}>
                      <Avatar
                        alt="Marc"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 24, height: 24 }}
                      />
                      <Avatar
                        alt="Matthew"
                        src="/static/images/avatar/2.jpg"
                        sx={{ width: 24, height: 24 }}
                      />
                      <Avatar
                        alt="Jamal"
                        src="/static/images/avatar/3.jpg"
                        sx={{ width: 24, height: 24 }}
                      />
                    </AvatarGroup>
                  </Stack>
                  <Stack>
                    <NextLink href={`/projects/${projectId}`} passHref>
                      <Typography
                        color="textPrimary"
                        variant="h5"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          display: "block",
                          cursor: "pointer",
                        }}
                      >
                        {course.title}
                      </Typography>
                    </NextLink>
                    <Typography variant="h6" color="textSecondary">
                      {customer.description}
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
          sx={{ mt: "auto", mb: 0, pt: 2.25 }}
        >
          <Typography variant="caption" color="secondary">
            Created: {formatedCreationDate}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" size="small" onClick={handleClickOpen}>
              Preview
            </Button>

            <NextLink href={`/projects/${projectId}`} passHref>
              <Button variant="contained" size="small">
                Open
              </Button>
            </NextLink>
          </Stack>
        </Stack>
      </MainCard>

      {/* edit customer dialog */}
      <Dialog
        maxWidth="sm"
        fullWidth
        TransitionComponent={PopupTransition}
        onClose={handleAdd}
        open={add}
        sx={{ "& .MuiDialog-paper": { p: 0 } }}
      >
        <AddProject customer={customer} onCancel={handleAdd} />
      </Dialog>
      <ProjectPreview
        course={course}
        customer={customer}
        open={open}
        onClose={handleClose}
      />
      <AlertCustomerDelete
        title={customer.id}
        open={openAlert}
        handleClose={handleAlertClose}
      />
    </>
  );
};

ProjectCard.propTypes = {
  customer: PropTypes.object,
};

export default ProjectCard;
