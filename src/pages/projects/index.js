import React, { useEffect } from "react";

//REDUX
import { useDispatch } from "store";
import { getProjects } from "store/reducers/projects";

// project imports
import Layout from "layout";
import Page from "components/Page";

import ProjectListing from "sections/apps/project-manager/projects-list";

// ==============================|| SAMPLE PAGE ||============================== //

 function  Projects() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page title="Projects">
      <ProjectListing />
    </Page>
  );
}

Projects.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Projects;
