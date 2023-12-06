import PropTypes from "prop-types";
import { useMemo, useState, useEffect } from "react";
import { useDispatch,useSelector  } from "store";

// material-ui
import { alpha, useTheme } from "@mui/material/styles";
import {
  Box,
  Chip,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Select,
  Slider,
  Tooltip,
} from "@mui/material";

// third-party
import { Formik, Form } from "formik";
import * as Yup from "yup";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";

import {
  useColumnOrder,
  useExpanded,
  useFilters,
  useGroupBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";

// project import
import Layout from "layout";
import MainCard from "components/MainCard";
import Avatar from "components/@extended/Avatar";
import ScrollX from "components/ScrollX";
import LinearWithLabel from "components/@extended/progress/LinearWithLabel";
import { PopupTransition } from "components/@extended/Transitions";
import AddButton from "components/StyledButtons";
import AddParticipant from "../AddParticipant";
import {
  addParticipant,
  updateParticipant,
  removeParticipant,
} from "store/reducers/projects";

import { ThemeMode } from "config";
import {
  DraggableHeader,
  DragPreview,
  HidingSelect,
  HeaderSort,
  IndeterminateCheckbox,
  TablePagination,
  TableRowSelection,
  CSVExport,
  EmptyTable,
} from "components/third-party/ReactTable";
import {
  roundedMedian,
  renderFilterTypes,
  filterGreaterThan,
  GlobalFilter,
  DefaultColumnFilter,
  SelectColumnFilter,
  SliderColumnFilter,
} from "utils/react-table";

// assets
import {
  DownOutlined,
  EditTwoTone,
  GroupOutlined,
  RightOutlined,
  SendOutlined,
  UngroupOutlined,
  PlusOutlined,
  MoreOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const tableTitle = "Participant";

// ==============================|| REACT TABLE ||============================== //

const EditableRow = ({
  value: initialValue,
  row: { index },
  column: { id, dataType },
  editableRowIndex,
  groups,
}) => {
  // groups is passed as a props to privice Select component with the list of available groups
  const [value, setValue] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (e) => {
    e.stopPropagation();
    setValue(e.target.value);
    console.log(e.target.value);
  };

  const ShowGroup = (Value) => {
    if (Value) {
  

        return (
          <Chip
            style={{ backgroundColor: "blue", color: "#fff" }}
            label={Value} // Use groupName if available, otherwise use chipColor
            size="small"
            variant="filled"
          />
        );
    }
  
    return <>no data</>;
  };
  

  let element;
  let userInfoSchema;

  switch (id) {
    case "email":
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.string()
          .email("Enter valid email ")
          .required("Email is a required field"),
      });
      break;
    default:
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Name is Required"),
      });
      break;
  }
  let IsEditAble = index === editableRowIndex;

  switch (dataType) {
    case "text":
      element = (
        <>
          {IsEditAble ? (
            <>
              <Formik
                initialValues={{
                  userInfo: value,
                }}
                enableReinitialize
                validationSchema={userInfoSchema}
                onSubmit={() => {}}
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
                      helperText={
                        touched.userInfo && errors.userInfo && errors.userInfo
                      }
                      sx={{
                        "& .MuiOutlinedInput-input": {
                          py: 0.75,
                          px: 1,
                          backgroundColor:
                            theme.palette.mode === ThemeMode.DARK
                              ? "inherit"
                              : "common.white",
                        },
                      }}
                    />
                  </Form>
                )}
              </Formik>
            </>
          ) : (
            value
          )}
        </>
      );
      break;
    case "select":
      element = (
        <>
          {IsEditAble ? (
            <Select
              labelId="demo-simple-select-label"
              sx={{
                "& .MuiOutlinedInput-input": {
                  py: 0.75,
                  px: 1,
                  backgroundColor:
                    theme.palette.mode === ThemeMode.DARK
                      ? "inherit"
                      : "common.white",
                },
              }}
              id="demo-simple-select"
              value={value}
              onChange={onChange}
            >
              <MenuItem value={value}>
                <Chip
                  color="error"
                  label="Individual"
                  size="small"
                  variant="filled"
                />
              </MenuItem>
              {groups.map((group) => (
                <MenuItem value={group.groupName}>
                  <Chip
                    style={{ backgroundColor: group.chipColor, color: "#fff" }}
                    label={group.groupName}
                    size="small"
                    variant="filled"
                  />
                </MenuItem>
              ))}
            </Select>
          ) : (
            ShowGroup(value)
          )}
        </>
      );
      break;
    case "progress":
      element = (
        <>
          {IsEditAble ? (
            <>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ pl: 1, minWidth: 120 }}
              >
                <Slider
                  value={value}
                  min={0}
                  max={100}
                  step={1}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  valueLabelDisplay="auto"
                  aria-labelledby="non-linear-slider"
                />
              </Stack>
            </>
          ) : (
            <div>
              <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
            </div>
          )}
        </>
      );
      break;
    default:
      element = <span>{value}</span>;
      break;
  }
  return element;
};

// ==============================|| REACT TABLE ||============================== //

const ColumnCell = ({
  row,
  setEditableRowIndex,
  editableRowIndex,
  handleRemoveParticipant,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickSort = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleCloseSort = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={0}
      >
        <Tooltip title={editableRowIndex !== row.index ? "Edit" : "Save"}>
          <IconButton
            color={editableRowIndex !== row.index ? "primary" : "success"}
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = row.index;
              if (editableRowIndex !== currentIndex) {
                // row requested for edit access
                setEditableRowIndex(currentIndex);
              } else {
                // request for saving the updated row
                setEditableRowIndex(null);
              }
            }}
          >
            {editableRowIndex !== row.index ? (
              <EditTwoTone />
            ) : (
              <SendOutlined />
            )}
          </IconButton>
        </Tooltip>

        <IconButton
          id={`groups-action-button-${editableRowIndex}`}
          aria-controls={
            open ? `groups-action-button-${editableRowIndex}` : undefined
          }
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickSort}
          size="small"
          color="secondary"
        >
          <MoreOutlined />
        </IconButton>
        <Menu
          id={`groups-action-button-${editableRowIndex}`}
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleCloseSort}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          MenuListProps={{
            "aria-labelledby": `groups-action-button-${editableRowIndex}`,
          }}
          sx={{
            p: 0,
            "& .MuiMenu-list": {
              p: 0,
            },
          }}
        >
          <MenuItem onClick={() => handleRemoveParticipant(row.original.uuid)}>
            <DeleteOutlined style={{ paddingRight: 8, paddingLeft: 0 }} />
            <Typography>Delete</Typography>
          </MenuItem>
        </Menu>
      </Stack>
    </>
  );
};

ColumnCell.propTypes = {
  row: PropTypes.object,
  setEditableRowIndex: PropTypes.func,
  editableRowIndex: PropTypes.number,
};

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
};

// ==============================|| REACT TABLE - UMBRELLA ||============================== //

const CellAvatar = ({ value }) => (
  <Avatar
    alt="Avatar 1"
    size="sm"
    src={`/assets/images/users/avatar-${!value ? 1 : value}.png`}
  />
);

CellAvatar.propTypes = {
  value: PropTypes.number,
};

function ReactTable({ columns, data, handleCRUD, groups }) {
  const { handleAddParticipant, handleRemoveParticipant } = handleCRUD;
  const theme = useTheme();
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const [editableRowIndex, setEditableRowIndex] = useState(null);
  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      Cell: (props) => <EditableRow {...props} groups={groups} />,
    }),
    []
  );
  const initialState = useMemo(
    () => ({
      filters: [{ id: "status", value: "" }],
      hiddenColumns: [
        "id",
        "email",
        "note",
        "progress",
        "parentGroup",
        "participantStatus",
      ],
      columnOrder: [
        "selection",
        "avatar",
        "firstName",
        "lastName",
        "role",
        "department",
        "email",
        "group",
      ],
      pageIndex: 0,
      pageSize: 10,
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
    state: {
      globalFilter,
      hiddenColumns,
      pageIndex,
      pageSize,
      columnOrder,
      selectedRowIds,
    },
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState,
      filterTypes,
      editableRowIndex,
      setEditableRowIndex,
    },
    useGlobalFilter,
    useFilters,
    useColumnOrder,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        ...columns,
        {
          accessor: "edit",
          id: "edit",
          Footer: "Edit",
          Header: "Edit",
          disableFilters: true,
          disableSortBy: true,
          disableGroupBy: true,
          groupByBoundary: true,
          Cell: (props) => (
            <ColumnCell
              {...props}
              handleRemoveParticipant={handleRemoveParticipant}
            />
          ),
        },
      ]);
    }
  );

  const reorder = (item, newIndex) => {
    const { index: currentIndex } = item;

    let dragRecord = columnOrder[currentIndex];
    if (!columnOrder.includes(item.id)) {
      dragRecord = item.id;
    }

    setColumnOrder(
      update(columnOrder, {
        $splice: [
          [currentIndex, 1],
          [newIndex, 0, dragRecord],
        ],
      })
    );
  };

  let headers = [];
  allColumns.map((item) => {
    if (
      !hiddenColumns?.includes(item.id) &&
      item.id !== "selection" &&
      item.id !== "edit"
    ) {
      headers.push({
        label: typeof item.Header === "string" ? item.Header : "#",
        key: item.id,
      });
    }
    return item;
  });

  return (
    <>
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ p: 2, pb: 0 }}
        >
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          />
          <Stack direction="row" spacing={2}>
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <HidingSelect
                hiddenColumns={hiddenColumns}
                setHiddenColumns={setHiddenColumns}
                allColumns={allColumns}
              />
            </Box>

            <AddButton
              onClick={handleAddParticipant}
              variant="contained"
              startIcon={<PlusOutlined />}
              size="small"
            >
              Add {tableTitle}
            </AddButton>
            <CSVExport
              data={
                selectedFlatRows.length > 0
                  ? selectedFlatRows
                      .map((d) => d.original)
                      .filter((d) => d !== undefined)
                  : data
              }
              filename={"umbrella-table.csv"}
              headers={headers}
            />
          </Stack>
        </Stack>

        <Box sx={{ width: "100%", overflowX: "auto", display: "block" }}>
          <Table {...getTableProps()}>
            <TableHead sx={{ borderTopWidth: 2 }}>
              {headerGroups.map((headerGroup, i) => (
                <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => {
                    const groupIcon = column.isGrouped ? (
                      <UngroupOutlined />
                    ) : (
                      <GroupOutlined />
                    );
                    return (
                      <TableCell
                        key={`umbrella-header-cell-${index}`}
                        {...column.getHeaderProps([
                          { className: column.className },
                        ])}
                      >
                        <DraggableHeader
                          reorder={reorder}
                          key={column.id}
                          column={column}
                          index={index}
                        >
                          <Stack
                            direction="row"
                            spacing={1.15}
                            alignItems="center"
                            sx={{ display: "inline-flex" }}
                          >
                            {column.canGroupBy ? (
                              <Box
                                sx={{
                                  color: column.isGrouped
                                    ? "error.main"
                                    : "primary.main",
                                  fontSize: "1rem",
                                }}
                                {...column.getGroupByToggleProps()}
                              >
                                {groupIcon}
                              </Box>
                            ) : null}
                            <HeaderSort column={column} sort />
                          </Stack>
                        </DraggableHeader>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>

            {/* striped table -> add class 'striped' */}
            <TableBody {...getTableBodyProps()} className="striped">
              {headerGroups.map((group, i) => (
                <TableRow key={i} {...group.getHeaderGroupProps()}>
                  {group.headers.map((column, index) => (
                    <TableCell
                      key={index}
                      {...column.getHeaderProps([
                        { className: column.className },
                      ])}
                    >
                      {column.canFilter ? column.render("Filter") : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {page.length > 0 ? (
                page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <TableRow
                      key={i}
                      {...row.getRowProps()}
                      {...(editableRowIndex !== row.index && {
                        onClick: () => {
                          row.toggleRowSelected();
                        },
                      })}
                      sx={{
                        cursor: "pointer",
                        bgcolor: row.isSelected
                          ? alpha(theme.palette.primary.lighter, 0.35)
                          : "inherit",
                      }}
                    >
                      {row.cells.map((cell, index) => {
                        let bgcolor = "inherit";
                        if (cell.isGrouped) bgcolor = "success.lighter";
                        if (cell.isAggregated) bgcolor = "warning.lighter";
                        if (cell.isPlaceholder) bgcolor = "error.lighter";
                        if (cell.isPlaceholder) bgcolor = "error.lighter";
                        if (row.isSelected)
                          bgcolor = alpha(theme.palette.primary.lighter, 0.35);
                        const collapseIcon = row.isExpanded ? (
                          <DownOutlined />
                        ) : (
                          <RightOutlined />
                        );

                        return (
                          <TableCell
                            key={index}
                            {...cell.getCellProps([
                              { className: cell.column.className },
                            ])}
                            sx={{ bgcolor }}
                          >
                            {cell.isGrouped ? (
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                sx={{ display: "inline-flex" }}
                              >
                                <Box
                                  sx={{
                                    pr: 1.25,
                                    fontSize: "0.75rem",
                                    color: "text.secondary",
                                  }}
                                  onClick={(e) => {
                                    row.toggleRowExpanded();
                                    e.stopPropagation();
                                  }}
                                >
                                  {collapseIcon}
                                </Box>
                                {cell.render("Cell")} ({row.subRows.length})
                              </Stack>
                            ) : cell.isAggregated ? (
                              cell.render("Aggregated")
                            ) : cell.isPlaceholder ? null : (
                              cell.render("Cell")
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <EmptyTable msg="No Data" colSpan={9} />
              )}
            </TableBody>

            {/* footer table */}
            <TableFooter sx={{ borderBottomWidth: 2 }}>
              {footerGroups.map((group, i) => (
                <TableRow key={i} {...group.getFooterGroupProps()}>
                  {group.headers.map((column, index) => (
                    <TableCell
                      key={index}
                      {...column.getFooterProps([
                        { className: column.className },
                      ])}
                    >
                      {column.render("Footer")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableFooter>
          </Table>
        </Box>
        <Box sx={{ p: 2, py: 0 }}>
          <TablePagination
            gotoPage={gotoPage}
            rows={rows}
            setPageSize={setPageSize}
            pageIndex={pageIndex}
            pageSize={pageSize}
          />
        </Box>
      </Stack>
    </>
  );
}

// Section Cell and Header
const SelectionCell = ({ row }) => (
  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
);
const SelectionHeader = ({ getToggleAllPageRowsSelectedProps }) => (
  <IndeterminateCheckbox
    indeterminate
    {...getToggleAllPageRowsSelectedProps()}
  />
);

SelectionCell.propTypes = {
  row: PropTypes.object,
};

SelectionHeader.propTypes = {
  getToggleAllPageRowsSelectedProps: PropTypes.func,
};

const ParticipantTable = ({ Project, index,Participants }) => {
  const { participants: participantsData, title, groups } = Project;
  
  useEffect(()=>{
    
  },[participantsData])
  
  const dispatch = useDispatch();

  const data = Participants;

  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState(false);
  const handleAdd = () => {
    setAdd(!add);
    if (customer && !add) setCustomer(null);
  };

  const handleCRUD = {
    handleUpdateParticipant: (uuid, value) => {
      //updated participant index = groups

      // get the updated group index = initialValue

      //const updatedGroupIndex = groups.indexOf(groups.filter((group)=>group.groupName===initialValue)[0]);
      console.log(uuid, value);

      dispatch(updateParticipant(index, uuid, value, participants, groups));
    },

    handleAddParticipant: (newParticipant) => {
      //Adds newParticipants to Project.participants & updates Project.groups state
      setAdd(!add);
      if (customer && !add) setCustomer(null);
      dispatch(addParticipant(data, newParticipant, groups, index));
    },

    handleRemoveParticipant: (uuid) => {
      //removes participant[index].uuid from Project.participants state

      const updatedParticipants = data.filter(
        (participant) => participant.uuid !== uuid
      );

      dispatch(removeParticipant(index, updatedParticipants));
    },
  };

  const columns = useMemo(
    () => [
      {
        title: "Row Selection",
        id: "selection",
        Header: SelectionHeader,
        Footer: "#",
        accessor: "selection",
        groupByBoundary: true,
        Cell: SelectionCell,
        disableSortBy: true,
        disableFilters: true,
        disableGroupBy: true,
        Aggregated: () => null,
      },
      {
        Header: "#",
        Footer: "#",
        accessor: "participant.id",
        className: "cell-center",
        disableFilters: true,
        disableGroupBy: true,
      },
      {
        Header: "Avatar",
        Footer: "Avatar",
        accessor: "avatar",
        className: "cell-center",
        disableSortBy: true,
        disableFilters: true,
        disableGroupBy: true,
        Cell: CellAvatar,
      },
      {
        Header: "First Name",
        Footer: "First Name",
        accessor: "participant.firstName",
        dataType: "text",
        disableGroupBy: true,
        aggregate: "count",
        Aggregated: ({ value }) => `${value} Person`,
      },
      {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "participant.lastName",
        dataType: "text",
        filter: "fuzzyText",
        disableGroupBy: true,
      },
      {
        Header: "Role",
        Footer: "Role",
        dataType: "text",
        accessor: "participant.role",
        disableGroupBy: true,
      },
      {
        Header: "Department",
        Footer: "Department",
        dataType: "text",
        accessor: "participant.department",
        disableGroupBy: true,
      },
      {
        Header: "Email",
        Footer: "Email",
        accessor: "participant.email",
        dataType: "text",
        disableGroupBy: true,
      },
      {
        Header: "Company",
        Footer: "Company",
        accessor: "participant.parentGroup",
        dataType: "text",
        disableGroupBy: true,
      },
      {
        Header: "Group",
        Footer: "Group",
        accessor: "group[0].group.groupName",
        dataType: "select",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Status",
        Footer: "Status",
        accessor: "participant.participantStatus",
        dataType: "text",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Curriculum Progress",
        Footer: "Curriculum Progress",
        accessor: "participant.progress",
        Filter: SliderColumnFilter,
        dataType: "progress",
        filter: filterGreaterThan,
        disableGroupBy: true,
        aggregate: roundedMedian,
        Aggregated: ({ value }) => `${value} (med)`,
      },
      {
        Header: "Notes",
        Footer: "Notes",
        dataType: "text",
        accessor: "participant.note",
        disableGroupBy: true,
      },
    ],
    []
  );

  return (
    <>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <MainCard
          title={`${tableTitle}s`}
          content={false}
          subheader="This section enables the assignment of employees to groups, facilitates data modifications, and allows for the tracking of learning progress."
        >
          <ScrollX>
            <ReactTable
              columns={columns}
              data={data}
              handleCRUD={handleCRUD}
              groups={groups}
            />
            <DragPreview />
          </ScrollX>
        </MainCard>
      </DndProvider>

      <Dialog
        maxWidth="sm"
        fullWidth
        TransitionComponent={PopupTransition}
        onClose={handleAdd}
        open={add}
        sx={{ "& .MuiDialog-paper": { p: 0 } }}
      >
        <AddParticipant
          customer={customer}
          groups={groups}
          onCancel={handleAdd}
          handleCRUD={handleCRUD}
          title={title}
        />
      </Dialog>
    </>
  );
};

ParticipantTable.propTypes = {
  participants: PropTypes.array,
};

ParticipantTable.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ParticipantTable;
