import { useMemo, useState, useEffect, Fragment } from 'react';
import { useDispatch,useSelector } from 'store';
import { useSession } from 'next-auth/react';

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
import ProjectCard from './projects-list/ProjectCard';
import AddProject from './projects-list/AddProject';

import { GlobalFilter } from 'utils/react-table';
import usePagination from 'hooks/usePagination';

// assets
import { PlusOutlined } from '@ant-design/icons';
import AddButton from '../../../components/StyledButtons';

import { addProjects } from 'store/reducers/projects';
// ==============================|| PROJECT - CARDS ||============================== //

const allColumns = [
  {
    id: 1,
    header: 'Default'
  },
  {
    id: 2,
    header: 'Title'
  },
  {
    id: 3,
    header: 'Start Date'
  },
  {
    id: 4,
    header: 'End Date'
  }
];

const ProjectListing = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);


  function pushTest() {


    dispatch(addProjects( projects));
  }


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
    const newData = projects.filter((value) => {
      if (globalFilter) {
        return value.title.toLowerCase().includes(globalFilter.toLowerCase());
      } else {
        return value;
      }
    });
    setUserCard(newData);
  }, [globalFilter, projects]);

  const PER_PAGE = 6;

  const count = Math.ceil(userCard.length / PER_PAGE);
  const _DATA = usePagination(userCard, PER_PAGE);

  const handleChangePage = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
const {data} = useSession();
const {user} = data;
  return (
    <Fragment>
      <>created by {user.name} </>
      <Box sx={{ position: 'relative', marginBottom: 3 }}>
        <Stack direction="row" alignItems="center">
          <Stack
            direction={matchDownSM ? 'column' : 'row'}
            sx={{ width: '100%' }}
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <GlobalFilter preGlobalFilteredRows={projects} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
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
              {false && <Button onClick={null}>push</Button>}
              <AddButton variant="contained" startIcon={<PlusOutlined />} onClick={handleAdd}>
                Add Project
              </AddButton>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Grid container spacing={3}>
        {projects ? (
          projects.map((project, index) => (
            <Slide key={index} direction="up" in={true} timeout={50}>
              <Grid item xs={12} sm={6} lg={4}>
                <ProjectCard course={projects[index]} customer={project} projectId={project.id} />
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
        <AddProject customer={customer} Projects={projects} onCancel={handleAdd} />
      </Dialog>
    </Fragment>
  );
};

export default ProjectListing;
