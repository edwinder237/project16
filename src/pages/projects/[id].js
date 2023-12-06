import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//REDUX
import { useDispatch, useSelector } from "store";
import { getSingleProject } from "store/reducers/projects";

// project imports
import Layout from "layout";
import Page from "components/Page";
import Loader from "components/Loader";

import ProjectPage from "../../sections/apps/project-manager/Poject-page/ProjectPage";

// ==============================|| ROUTER ||============================== //

function ProjectDefault() {
  const router = useRouter();
  const { id } = router.query;
  const projectId = parseInt(id);
  const dispatch = useDispatch();
  const { singleProject } = useSelector((state) => state.projects);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const singleProject = dispatch(getSingleProject(projectId));
    Promise.all([singleProject]).then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) return <Loader />;

  if (singleProject)
    return (
      <Page title={singleProject.title}>
        <ProjectPage />
      </Page>
    );
}

ProjectDefault.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ProjectDefault;
