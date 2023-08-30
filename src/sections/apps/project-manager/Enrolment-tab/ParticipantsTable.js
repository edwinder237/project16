import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
//Redux 
import { useDispatch, useSelector } from 'store';
import { addParticipant, updateParticipant } from 'store/reducers/projects';

import { PopupTransition } from 'components/@extended/Transitions';
import AddEmployee from './AddParticipant';

// material-ui
import {
  Button,
  Chip,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Stack,
  Slider,
  Tooltip,
  IconButton,
  Box
} from '@mui/material';

// third-party
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  useColumnOrder,
  useExpanded,
  useFilters,
  useGroupBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable
} from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport } from 'components/third-party/ReactTable';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import Avatar from 'components/@extended/Avatar';
import AddButton from 'components/StyledButtons';

import {
  DraggableHeader,
  DragPreview,
  HidingSelect,
  HeaderSort,
  IndeterminateCheckbox,
  TablePagination,
  TableRowSelection,
  EmptyTable
} from 'components/third-party/ReactTable';
import {
  roundedMedian,
  renderFilterTypes,
  filterGreaterThan,
  GlobalFilter,
  DefaultColumnFilter,
  SelectColumnFilter,
  SliderColumnFilter,
  NumberRangeColumnFilter
} from 'utils/react-table';



// assets
import { CheckOutlined, PlusOutlined } from '@ant-design/icons';

const CellEdit = ({ value: initialValue, row: { index }, column: { id, dataType }, data, updateData, handleUpdateParticipant }) => {
  const [value, setValue] = useState(initialValue);
  const [showSelect, setShowSelect] = useState(false);

  const onChange = (e) => {
    const uuid = data[index].uuid;
    setValue(e.target?.value);
    handleUpdateParticipant(uuid, e.target?.value, initialValue)
  };

  const onBlur = () => {
    updateData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  let element;
  let userInfoSchema;
  switch (id) {
    case 'email':
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.string().email('Enter valid email ').required('Email is a required field')
      });
      break;
    case 'age':
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.number()
          .typeError('Age must be number')
          .required('Age is required')
          .min(18, 'You must be at least 18 years')
          .max(100, 'You must be at most 60 years')
      });
      break;
    case 'visits':
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.number().typeError('Visits must be number').required('Required')
      });
      break;
    case 'notes':
      null
      break;
    default:
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is Required')
      });
      break;
  }

  switch (dataType) {
    case 'text':
      element = (
        <>
          <Formik
            initialValues={{
              userInfo: value
            }}
            enableReinitialize
            validationSchema={userInfoSchema}
            onSubmit={() => { }}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <TextField
                  value={values.userInfo}
                  id={`${index}-${id}`}
                  name="userInfo"
                  onChange={(e) => {
                    handleChange(e);
                    onChange(e);
                  }}
                  onBlur={handleBlur}
                  error={touched.userInfo && Boolean(errors.userInfo)}
                  helperText={touched.userInfo && errors.userInfo && errors.userInfo}
                  sx={{
                    '& .MuiOutlinedInput-input': { py: 0.75, px: 1, width: { xs: 80 } },
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                  }}
                />
              </Form>
            )}
          </Formik>
        </>
      );
      break;
    case 'select':
      element = (
        <>
          <Select
            labelId="editable-select-status-label"
            sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, svg: { display: 'none' } }}
            id="editable-select-status"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          >
            <MenuItem value="n/a">
              <Chip color="error" label="Individual" size="small" variant="light" />
            </MenuItem>
            <MenuItem value={value}>
              <Chip color="error" label={value} size="small" variant="light" />
            </MenuItem>
            <MenuItem value="Group B">
              <Chip color="success" label="Group 2" size="small" variant="light" />
            </MenuItem>
            <MenuItem value="Group C">
              <Chip color="info" label="Group 3" size="small" variant="light" />
            </MenuItem>
          </Select>
        </>
      );
      break;
    case 'progress':
      element = (
        <>
          {!showSelect ? (
            <Box onClick={() => setShowSelect(true)}>
              <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
            </Box>
          ) : (
            <>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ pl: 1, minWidth: 120 }}>
                <Slider
                  value={value}
                  min={0}
                  max={100}
                  step={1}
                  onBlur={onBlur}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  valueLabelDisplay="auto"
                  aria-labelledby="non-linear-slider"
                />
                <Tooltip title={'Submit'}>
                  <IconButton onClick={() => setShowSelect(false)}>
                    <CheckOutlined />
                  </IconButton>
                </Tooltip>
              </Stack>
            </>
          )}
        </>
      );
      break;
    default:
      element = <span></span>;
      break;
  }
  return element;
};

// ==============================|| REACT TABLE ||============================== //
const CellAvatar = ({ value }) => <Avatar alt="Avatar 1" size="sm" src={`/assets/images/users/avatar-${!value ? 1 : value}.png`} />;

CellAvatar.propTypes = {
  value: PropTypes.number
};

const GroupCell = ({ value }) => {
  switch (value) {
    case '3':
      return <Chip color="error" label={`${value}`} size="small" />;
    case '2':
      return <Chip color="success" label={`${value}`} size="small" />;
    case '1':
    default:
      return <Chip color="info" label={`${value}`} size="small" />;
  }
};

GroupCell.propTypes = {
  value: PropTypes.string
};

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  updateData: PropTypes.func,
  skipPageReset: PropTypes.bool
};

function ReactTable({ columns, data, updateData, skipPageReset, handleAddParticipant, handleUpdateParticipant }) {
  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      Cell: (props) => <CellEdit {...props} handleUpdateParticipant={handleUpdateParticipant} data={data} />
    }),
    []
  );

  const initialState = useMemo(
    () => ({
      filters: [{ id: 'group', value: '' }],
      hiddenColumns: ['progress'],
      columnOrder: ['selection', 'avatar', 'lastName', 'firstName', 'email', 'role', 'group', 'status', 'progress'],
      pageIndex: 0,
      pageSize: 10
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    page,
    prepareRow,
    setColumnOrder,
    gotoPage,
    setPageSize,
    setHiddenColumns,
    allColumns,
    state: { globalFilter, hiddenColumns, pageIndex, pageSize, columnOrder, selectedRowIds },
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState,
      autoResetPage: !skipPageReset,
      updateData
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>

      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" sx={{ p: 2, pb: 0 }}>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          />
          <Stack direction="row" spacing={2}>
            <HidingSelect hiddenColumns={hiddenColumns} setHiddenColumns={setHiddenColumns} allColumns={allColumns} />
            <AddButton onClick={handleAddParticipant} variant="contained" startIcon={<PlusOutlined />} size="small">
              Add {tableTitle}
            </AddButton>
            <CSVExport
              data={data}
              filename={'cell-editable-table.csv'} />
          </Stack>
        </Stack>
        <Box sx={{ width: '100%', overflowX: 'auto', display: 'block' }}>
          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell key={column.id} {...column.getHeaderProps()}>
                      <HeaderSort column={column} sort />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()} className="striped">
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <TableRow key={row.id} {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.column.id} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ p: 2, mb: 2, py: 0 }}>
          <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
        </Box>
      </Stack>
    </>
  );
}

// ==============================|| REACT TABLE - EDITABLE CELL ||============================== //

const tableTitle = "Participant";

const ParticipantsTable = ({ participants, index, title, groups }) => {
  const [stateData, setStateData] = useState([])
  const [skipPageReset, setSkipPageReset] = useState(false);

  if (stateData) {


    useEffect(() => {

      setStateData(participants)

    }, [stateData])

  }


  //Table Functions

  // ADD BUTTON DEPS
  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState(false);
  const handleAdd = () => {
    setAdd(!add);
    if (customer && !add) setCustomer(null);
  };

  const dispatch = useDispatch();

  function handleUpdateParticipant(uuid, value) {
    //updated participant index = groups

    // get the updated group index = initialValue

    //const updatedGroupIndex = groups.indexOf(groups.filter((group)=>group.groupName===initialValue)[0]);
    // console.log( )

    dispatch(updateParticipant(index, uuid, value, participants, groups));
  };

  function handleAddParticipant(newParticipant) {

    //this fucntion add a group to the project object

    dispatch(addParticipant(stateData, newParticipant, index));

  };

  const columns = useMemo(
    () => [
      {
        Header: 'Avatar',
        Footer: 'Avatar',
        accessor: 'avatar',
        className: 'cell-center',
        disableSortBy: true,
        disableFilters: true,
        disableGroupBy: true,
        Cell: CellAvatar
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
        dataType: 'text'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        dataType: 'text'
      },
      {
        Header: 'Email',
        accessor: 'email',
        dataType: 'text',
      },
      {
        Header: 'Role',
        accessor: 'role',
        dataType: 'text'
      },

      {
        Header: 'Group',
        accessor: 'group',
        dataType: 'select',
      },

      {
        Header: 'Notes',
        accessor: 'note',
        dataType: 'text'
      },

      {
        Header: 'Profile Progress',
        accessor: 'progress',
        dataType: 'progress'
      }
    ],
    []
  );

  const updateData = (rowIndex, columnId, value) => {
    // we also turn on the flag to not reset the page
    setSkipPageReset(true);
    setStateData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value
          };
        }
        return row;
      })
    );
  };


  useEffect(() => {
    setSkipPageReset(false);
  }, [stateData]);



  return (
    <>
      <MainCard
        title={`${tableTitle}s`}
        content={false}
        subheader="This section enables the assignment of employees to groups, facilitates data modifications, and allows for the tracking of learning progress."
      >

        <ScrollX>
          <ReactTable columns={columns} data={participants} handleAddParticipant={handleAdd} updateData={updateData} skipPageReset={skipPageReset} handleUpdateParticipant={handleUpdateParticipant} />
        </ScrollX>
      </MainCard>

      <Dialog
        maxWidth="sm"
        fullWidth
        TransitionComponent={PopupTransition}
        onClose={handleAdd}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        <AddEmployee customer={customer} onCancel={handleAdd} handleAddParticipant={handleAddParticipant} title={title} />
      </Dialog>
    </>
  );

};

export default ParticipantsTable;
