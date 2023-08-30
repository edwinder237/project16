import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  RadioGroup,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project imports
import AlertCustomerDelete from './AlertCustomerDelete';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import { openSnackbar } from 'store/reducers/snackbar';
import ColorPalette from './ColorPalette';

// assets
import { CameraOutlined, DeleteFilled } from '@ant-design/icons';
import { addParticipant } from 'store/reducers/projects';



// constant
const getInitialValues = (customer) => {
  const newCustomer = {
    firstName: '',
    lastName: '',
    email: '',
    group: '',
    group: ''
  };

  if (customer) {

    newCustomer.group = customer.address;
    return _.merge({}, newCustomer, customer);
  }

  return newCustomer;
};

const allStatus = ['Active', 'LOA', 'Terminated'];

// ==============================|| CUSTOMER ADD / EDIT / DELETE ||============================== //

const AddParticipant = ({ customer, onCancel, title, handleCRUD, groups }) => {
  const { handleAddParticipant } = handleCRUD;
  const theme = useTheme();
  const dispatch = useDispatch();
  const isCreating = !customer;

  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState(`/assets/images/users/avatar-${isCreating && !customer?.avatar ? 1 : customer.avatar}.png`);
  const [isNewGroup, setIsNewGroup] = useState(false); // State variable for checkbox

  const backgroundColor = [
    {
      value: theme.palette.primary.main,
      color: 'primary.main'
    },
    {
      value: theme.palette.error.main,
      color: 'error.main'
    },
    {
      value: theme.palette.success.main,
      color: 'success.main'
    },
    {
      value: theme.palette.secondary.main,
      color: 'secondary.main'
    },
    {
      value: theme.palette.warning.main,
      color: 'warning.main'
    },
    {
      value: theme.palette.primary.lighter,
      color: 'primary.lighter'
    },
    {
      value: theme.palette.error.lighter,
      color: 'error.lighter'
    },
    {
      value: theme.palette.success.lighter,
      color: 'success.lighter'
    },
    {
      value: theme.palette.secondary.lighter,
      color: 'secondary.lighter'
    },
    {
      value: theme.palette.warning.lighter,
      color: 'warning.lighter'
    }
  ];



  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const ParticipantSchema = Yup.object().shape({
    //name: Yup.string().max(255).required('Name is required'),
    firstName: Yup.string().max(255).required("Mandatory feild"),
    lastName: Yup.string().max(255).required("Mandatory feild"),
    group: Yup.string().required('group is required'),
    email: Yup.string().max(255).required('Email is required').email('Must be a valid email'),
    group: Yup.string().max(10)
  });

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    onCancel();
  };

  const formik = useFormik({
    initialValues: getInitialValues(customer),
    validationSchema: ParticipantSchema,
    onSubmit: (values, { setSubmitting }) => {
     // console.log(values)
      const chipcolor = groups.filter((group)=> group.groupName === values.group)[0].chipColor;
      try {
        const newParticipant = {
          uuid: uuidv4(),
          id: "500",
          firstName: values.firstName,
          lastName: values.lastName,
          role: "Administrator",
          department: "Active",
          status: "Active",
          email: values.email,
          group: { groupName: values.group ? values.group : "n/a", chipColor: values.group ?chipcolor: "error" },
          parentGroup: title,
          courses: ["Introduction to HR", "Employee Training"]
        };
        if (customer) {

          // dispatch(updateCustomer(customer.id, newCustomer)); - update
          dispatch(
            openSnackbar({
              open: true,
              message: 'Customer updated successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        } else {
          handleAddParticipant(newParticipant)
          // dispatch(createCustomer(newCustomer)); - add
          dispatch(
            openSnackbar({
              open: true,
              message: 'Customer added successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        }

        setSubmitting(true);
        onCancel();
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle>{customer ? 'Edit Employee' : 'New Employee'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                    <FormLabel
                      htmlFor="change-avtar"
                      sx={{
                        position: 'relative',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        '&:hover .MuiBox-root': { opacity: 1 },
                        cursor: 'pointer'
                      }}
                    >
                      <Avatar alt="Avatar 1" src={avatar} sx={{ width: 72, height: 72, border: '1px dashed' }} />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Stack spacing={0.5} alignItems="center">
                          <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                          <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                        </Stack>
                      </Box>
                    </FormLabel>
                    <TextField
                      type="file"
                      id="change-avtar"
                      placeholder="Outlined"
                      variant="outlined"
                      sx={{ display: 'none' }}
                      onChange={(e) => setSelectedImage(e.target.files?.[0])}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="employee-firstName">First Name</InputLabel>
                        <TextField
                          fullWidth
                          id="employee-firstName"
                          placeholder="Enter Employee First Name"
                          {...getFieldProps('firstName')}
                          error={Boolean(touched.firstName && errors.firstName)}
                          helperText={touched.firstName && errors.firstName}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="employee-lastName">Last Name</InputLabel>
                        <TextField
                          fullWidth
                          id="employee-lastName"
                          placeholder="Enter Employee Last Name"
                          {...getFieldProps('lastName')}
                          error={Boolean(touched.lastName && errors.lastName)}
                          helperText={touched.lastName && errors.lastName}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="employee-email">Email</InputLabel>
                        <TextField
                          fullWidth
                          id="employee-email"
                          placeholder="Enter Employee Email"
                          {...getFieldProps('email')}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        {!isNewGroup ? (
                          <>

                            <InputLabel htmlFor="employee-group">Add to Group</InputLabel>
                            <FormControl fullWidth>
                              <Select
                                id="column-hiding"
                                displayEmpty
                                {...getFieldProps('group')}
                                onChange={(event) => setFieldValue('group', event.target.value)}
                                input={<OutlinedInput id="select-column-hiding" placeholder="Sort by" />}
                                defaultValue="n/a"
                                // Disable based on checkbox state
                                disabled={isNewGroup}
                                renderValue={(selected) => {
                                  if (!selected) {
                                    return <Chip style={{ backgroundColor: "#385ab5", color: '#fff' }} label="Team 1" size="small" variant="filled" />;
                                  }
                                  const chipcolor = groups.filter((group) => group.groupName === selected)[0].chipColor;
                                  return <Chip style={{ backgroundColor: chipcolor, color: '#fff' }} label={selected} size="small" variant="filled" />
                                }}
                              >
                                {groups.map((group) => (
                                  <MenuItem key={group.id} value={group.groupName}>
                                    <Chip style={{ backgroundColor: group.chipColor, color: '#fff' }} label={group.groupName} size="small" variant="filled" />
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            {touched.group && errors.group && (
                              <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                                {errors.group}
                              </FormHelperText>
                            )}


                          </>
                        ) :
                          <>
                            <Grid item xs={12}>
                              <Stack spacing={1.25}>
                                <InputLabel htmlFor="employee-group">New Group</InputLabel>
                                <TextField
                                  fullWidth
                                  id="employee-group"
                                  multiline
                                  rows={1}
                                  placeholder="Enter Group name"
                                  {...getFieldProps('group')}
                                  // Disable based on checkbox state
                                  disabled={!isNewGroup}
                                  error={Boolean(touched.group && errors.group)}
                                  helperText={touched.group && errors.group}
                                />
                              </Stack>
                            </Grid>



                            <Grid item xs={12}>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <Typography variant="subtitle1">Background Color</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                  <FormControl>
                                    <RadioGroup
                                      row
                                      aria-label="color"
                                      {...getFieldProps('color')}
                                      onChange={(e) => setFieldValue('color', e.target.value)}
                                      name="color-radio-buttons-group"
                                      sx={{ '& .MuiFormControlLabel-root': { mr: 2 } }}
                                    >
                                      {backgroundColor.map((item, index) => (
                                        <ColorPalette key={index} value={item.value} color={item.color} />
                                      ))}
                                    </RadioGroup>
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </Grid>

                          </>



                        }

                        {/* Checkbox for enabling/disabling the input */}
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isNewGroup}
                              onChange={() => setIsNewGroup(!isNewGroup)}
                            />
                          }
                          label="Create New"
                        />
                      </Stack>
                    </Grid>


                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Stack spacing={0.5}>
                          <Typography variant="subtitle1">Increment starting from the previous group name.</Typography>
                          <Typography variant="caption" color="textSecondary">
                            The auto-increment button is like a magic button that makes numbers go up by themselves.
                          </Typography>
                        </Stack>
                        <FormControlLabel control={<Switch defaultChecked sx={{ mt: 0 }} />} label="" labelPlacement="start" />
                      </Stack>
                      <Divider sx={{ my: 2 }} />
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  {!isCreating && (
                    <Tooltip title="Delete Customer" placement="top">
                      <IconButton onClick={() => setOpenAlert(true)} size="large" color="error">
                        <DeleteFilled />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
                <Grid item>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button color="error" onClick={onCancel}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                      {customer ? 'Edit' : 'Add'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
      {!isCreating && <AlertCustomerDelete title={customer.fatherName} open={openAlert} handleClose={handleAlertClose} />}
    </>
  );
};

AddParticipant.propTypes = {
  customer: PropTypes.any,
  onCancel: PropTypes.func
};

export default AddParticipant;
