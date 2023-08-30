import React, { useEffect } from 'react';

//REDUX
import { useDispatch, useSelector } from 'store';
import { getProjects } from 'store/reducers/projects';

// project imports
import Layout from 'layout';
import Page from 'components/Page';

import ProjectListing from 'sections/apps/project-manager/projects-list';


// ==============================|| SAMPLE PAGE ||============================== //

function Projects() {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProjects())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (true) {

    return (
      <Page title="Projects List">
        <ProjectListing data={projects} />
      </Page>

    )

  }
  else return <div>Loading..</div>
};

Projects.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Projects;
