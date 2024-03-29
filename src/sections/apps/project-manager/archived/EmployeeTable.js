import PropTypes from 'prop-types';
import React from 'react';
import axios from 'utils/axios';

// material-ui
import { Box,Button, Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useTable, useGroupBy, useExpanded } from 'react-table';

// project-import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport } from 'components/third-party/ReactTable';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { roundedMedian } from 'utils/react-table';

// assets
import { DownOutlined, GroupOutlined, RightOutlined, UngroupOutlined,PlusOutlined } from '@ant-design/icons';

// ==============================|| REACT TABLE ||============================== //
const tableTitle = "Employee";

function ReactTable({ columns, data,tableTitle }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      initialState: { groupBy: [] }
    },
    useGroupBy,
    useExpanded
  );

  const firstPageRows = rows.slice(0, rows.length);

  let groupedData = [];
  if (rows.filter((row) => row.original).length) {
    groupedData = rows.map((row) => row.original).filter((row) => row !== undefined);
  } else {
    groupedData = [];
    rows.forEach((row) => {
      if (row.subRows.length) {
        groupedData.push({ ...row.values });
        row.subRows.forEach((subRow) => {
          if (subRow.subRows.length) {
            groupedData.push({ ...subRow.values });
            subRow.subRows.forEach((innerRow) => {
              groupedData.push({
                ...innerRow.values,
                age: undefined,
                status: undefined
              });
            });
          } else {
            groupedData.push({
              ...subRow.values,
              age: undefined
            });
          }
        });
      } else {
        groupedData.push({ ...row.values });
      }
    });
  }

  return (
    <MainCard
      content={false}
      title={`${tableTitle}`}
      secondary={
        <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Legend /> 

          <Button variant="contained" startIcon={<PlusOutlined />}  size="small">
              Add {tableTitle}
            </Button>
          
        
          <CSVExport data={groupedData} filename={'grouping-seperate-column-table.csv'} />
        </Stack>
      }
    >
      <Stack direction="row" spacing={2} sx={{ p: 2.5, display: { xs: 'flex', sm: 'none' } }} justifyContent="flex-end">
        <Legend /> <CSVExport data={groupedData} filename={'grouping-seperate-column-table.csv'} />
      </Stack>
      <ScrollX sx={{ maxHeight: 600 }}>
        <Table {...getTableProps()}>
          <TableHead sx={{ position: 'sticky', top: -1, zIndex: 1200 }}>
            {headerGroups.map((headerGroup, i) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column, index) => {
                  const groupIcon = column.isGrouped ? <UngroupOutlined /> : <GroupOutlined />;
                  return (
                    <TableCell {...column.getHeaderProps([{ className: column.className }])} key={index}>
                      <Stack direction="row" spacing={1.15} alignItems="center" sx={{ display: 'inline-flex' }}>
                        {column.canGroupBy ? (
                          <Box
                            sx={{ color: column.isGrouped ? 'error.main' : 'primary.main', fontSize: '1rem' }}
                            {...column.getGroupByToggleProps()}
                          >
                            {groupIcon}
                          </Box>
                        ) : null}
                        <Box>{column.render('Header')}</Box>
                      </Stack>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {firstPageRows.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()} key={i}>
                  {row.cells.map((cell, index) => {
                    let bgcolor = 'background.paper';
                    if (cell.isGrouped) bgcolor = 'success.lighter';
                    if (cell.isAggregated) bgcolor = 'warning.lighter';
                    if (cell.isPlaceholder) bgcolor = 'error.lighter';

                    const collapseIcon = row.isExpanded ? <DownOutlined /> : <RightOutlined />;

                    return (
                      <TableCell {...cell.getCellProps([{ className: cell.column.className }])} sx={{ bgcolor }} key={index}>
                        {cell.isGrouped ? (
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ display: 'inline-flex' }}>
                            <Box sx={{ pr: 0.5, fontSize: '0.75rem', color: 'text.secondary' }} {...row.getToggleRowExpandedProps()}>
                              {collapseIcon}
                            </Box>
                            <Box>{cell.render('Cell')}</Box>
                            <Box>({row.subRows.length})</Box>
                          </Stack>
                        ) : cell.isAggregated ? (
                          cell.render('Aggregated')
                        ) : cell.isPlaceholder ? null : (
                          cell.render('Cell')
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollX>
    </MainCard>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

// ==============================|| LEGEND ||============================== //

function Legend() {
  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
      <Chip color="success" variant="light" label="Grouped" size="small" />
      <Chip color="warning" variant="light" label="Aggregated" size="small" />
      <Chip color="error" variant="light" label="Repeated" size="small" />
    </Stack>
  );
}

// ==============================|| REACT TABLE - GROUPING TABLE ||============================== //

const StatusCell = ({ value }) => {
  switch (value) {
    case 3:
      return <Chip color="error" label="Group 3" size="small" />;
    case 2:
      return <Chip color="success" label="Group 2" size="small" />;
    case 1:
    default:
      return <Chip color="info" label="Group 1" size="small" />;
  }
};

StatusCell.propTypes = {
  value: PropTypes.string
};

const ProgressCell = ({ value }) => <LinearWithLabel value={value} sx={{ minWidth: 75 }} />;

ProgressCell.propTypes = {
  value: PropTypes.number
};

function EmployeeTable({ data,project_parentGroup }) {



  const filteredData =  data.filter(item => item.parentGroup === project_parentGroup);
  const columns = React.useMemo(
    () => [
      {
        Header: 'First Namee',
        accessor: 'firstname',
        aggregate: 'count',
        Aggregated: ({ value }) => `${value} Person`,
        disableGroupBy: true
      },
      {
        Header: 'Last Name',
        accessor: 'lastname',
        disableGroupBy: true
      },
      {
        Header: 'Email',
        accessor: 'email',
        disableGroupBy: true
      },
      {
        Header: 'Role',
        accessor: 'role',
        disableGroupBy: true
      },
      {
        Header: 'Age',
        accessor: 'age',
        className: 'cell-right',
        aggregate: 'average',
        Aggregated: ({ value }) => `${Math.round(value * 100) / 100} (avg)`
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        className: 'cell-right',
        aggregate: 'sum',
        Aggregated: ({ value }) => `${value} (total)`,
        disableGroupBy: true
      },
      {
        Header: 'Group',
        accessor: 'group',
        Cell: StatusCell
      },
      {
        Header: 'Curriculum Progress',
        accessor: 'progress',
        aggregate: roundedMedian,
        Aggregated: ({ value }) => `${value} (med)`,
        disableGroupBy: true,
        Cell: ProgressCell
      }
    ],
    []
  );
//console.log(filteredData)
  return <ReactTable columns={columns} data={filteredData} tableTitle={tableTitle} />;
}

EmployeeTable.propTypes = {
  data: PropTypes.array
};

export default EmployeeTable;
