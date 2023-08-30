import { useMemo, useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'store';


// material-ui
import {
  Grid,
  Stack,
  useMediaQuery,
  Button,
  FormControl,
  Select,
  MenuItem,
  Box,
  Dialog,
  Slide,
  Pagination,
  Typography
} from '@mui/material';


// project import
import { PopupTransition } from 'components/@extended/Transitions';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import ListingCard from './projects-list/ListingCard';
import AddProject from './projects-list/AddProject';


import { GlobalFilter } from 'utils/react-table';
import usePagination from 'hooks/usePagination';

// assets
import { PlusOutlined } from '@ant-design/icons';
import AddButton from '../../../components/StyledButtons';


import { addProjects } from 'store/reducers/projects';
// ==============================|| CUSTOMER - CARD ||============================== //

const allColumns = [
  {
    id: 1,
    header: 'Default'
  },
  {
    id: 2,
    header: 'Customer Name'
  },
  {
    id: 3,
    header: 'Email'
  },
  {
    id: 4,
    header: 'Contact'
  },
  {
    id: 5,
    header: 'Age'
  },
  {
    id: 6,
    header: 'Country'
  },
  {
    id: 7,
    header: 'Status'
  }
];


const ProjectListing = ({ data }) => {
  const dispatch = useDispatch();
 const [Projects, setProjects] = useState([]);  
  
useEffect(() => {
setProjects(data)

},[data]);
  
function pushTest(){

  const newProject =
  [{
    id: '116',
    sortorder: 1,
    name: "New York Tech Conference",
    summary: "latest trends and innovations",
    duration: 180,
    type: "conference",
    section_id: [],
    participants: ['jane the explorer', 'alex the developer'],
    uuid: "2a5b8baa-a283-11ed-828b-7054d2174443",
    status: "completed",
    start_date: "2022-09-20",
    end_date: "2022-09-22",
    creation_date: "2022-07-01",
    courses: [],
    schedule: [],
    participants: [],
    groups:[3,4,5]
  },]

dispatch(addProjects(newProject,Projects))
};

  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const [sortBy, setSortBy] = useState('Default');
  const [globalFilter, setGlobalFilter] = useState('');
  const [add, setAdd] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [userCard, setUserCard] = useState([]);
  const [page, setPage] = useState(1);
  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleAdd = () => {
    setAdd(!add);
    if (customer && !add) setCustomer(null);
  };

  // search
  useEffect(() => {
    const newData = Projects.filter((value) => {
      if (globalFilter) {
        return value.title.toLowerCase().includes(globalFilter.toLowerCase());
      } else {
        return value;
      }
    });
    setUserCard(newData);
  }, [globalFilter, Projects]);

  const PER_PAGE = 6;

  const count = Math.ceil(userCard.length / PER_PAGE);
  const _DATA = usePagination(userCard, PER_PAGE);

  const handleChangePage = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <Fragment>
      <Box sx={{ position: 'relative', marginBottom: 3 }}>
        <Stack direction="row" alignItems="center">
          <Stack
            direction={matchDownSM ? 'column' : 'row'}
            sx={{ width: '100%' }}
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <GlobalFilter preGlobalFilteredRows={Projects} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={1}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={sortBy}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <Typography variant="subtitle1">Sort By</Typography>;
                    }

                    return <Typography variant="subtitle2">Sort by ({sortBy})</Typography>;
                  }}
                >
                  {allColumns.map((column) => {
                    return (
                      <MenuItem key={column.id} value={column.header}>
                        {column.header}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Button onClick={pushTest}>push</Button>
              <AddButton variant="contained" startIcon={<PlusOutlined />} onClick={handleAdd}>
                Add Course
              </AddButton>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Grid container spacing={3}>
        {Projects ? (


          Projects.map((project, index) => (
            <Slide key={index} direction="up" in={true} timeout={50}>
              <Grid item xs={12} sm={6} lg={4}>
                <ListingCard course={Projects[index]} customer={project} projectIndex={index} />
              </Grid>
            </Slide>
          ))
        ) : (
          <EmptyUserCard title={'You have not created any projects yet.'} />
        )}
      </Grid>
      <Stack spacing={2} sx={{ p: 2.5 }} alignItems="flex-end">
        <Pagination
          count={count}
          size="medium"
          page={page}
          showFirstButton
          showLastButton
          variant="combined"
          color="primary"
          onChange={handleChangePage}
        />
      </Stack>

      {/* add customer dialog */}
      <Dialog
        maxWidth="sm"
        fullWidth
        TransitionComponent={PopupTransition}
        onClose={handleAdd}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        <AddProject customer={customer} Projects={Projects} onCancel={handleAdd} />
      </Dialog>
    </Fragment>
  );
};



export default ProjectListing;
