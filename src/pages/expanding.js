import { useMemo } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import makeData from 'data/react-table';
import ExpandingTable from 'sections/tables/react-table/ExpandingTable';
import ExpandingDetails from 'sections/tables/react-table/ExpandingDetails';
import ExpandingSubTable from 'sections/tables/react-table/ExpandingSubTable';

// ==============================|| REACT TABLE - EXPANDING ||============================== //

const Expanding = () => {
  const data = useMemo(() => makeData(20), []);

  return (
    <Page title="Expanding Table">
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <ExpandingDetails data={data.slice(11, 19)} />
        </Grid>

      </Grid>
    </Page>
  );
};

Expanding.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Expanding;
