import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/router'



//REDUX
import { useDispatch, useSelector } from 'store';
import { getProjects } from 'store/reducers/projects';


// project imports
import Layout from 'layout';
import Page from 'components/Page';

import ProjectPage from './ProjectPage'




// ==============================|| ROUTER ||============================== //

// FINDS THE CURRENT PROJECTS WITH REQ INDEX AND RETURN DESIRED PROJECT PAGE .

function ProjectDefault() {
  const router = useRouter();
  const { projectIndexRouter } = router.query;
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const Project = projects[projectIndexRouter];

  useEffect(() => {
    const fetchProjects = async () => {
      await dispatch(getProjects(projectIndexRouter));
    };

    fetchProjects();
  }, []);




  if (Project) {
    console.log('Hello INDEX ROUTER',Project.participants)
    return (
      <Page title={Project.title}>
        <ProjectPage Project={Project} index={projectIndexRouter} />
      </Page>
    )
  } else {
    return <div>Loading...</div>;
  }
}

ProjectDefault.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ProjectDefault;


