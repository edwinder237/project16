// third-party
import { createSlice } from "@reduxjs/toolkit";

// project imports
import axios from "utils/axios";
import { dispatch } from "../index";

const dataRoutes = {
  getProjects: "/api/projects/fakeProjects",
  fetchSingleProject: "/api/projects/fetchSingleProject",
  fetchProjects: "/api/projects/fetchProjects",
  fetchProjectParticipantsDetails: "/api/projects/fetchParticipantsDetails",
  addProject: "/api/projects/addProject",
  getGroupsFromProjectEmployees: "/api/projects/groupsFromProjectEmployees",
  getEvents: "/api/projects/fetchEvents",
  addGroup: "/api/projects/add-group",
  fetchGroupsDetails:"/api/projects/fetchGroupsDetails",
  removeGroup: "/api/projects/remove-group",
  getGroups: "/api/projects/groups",
  getEmployees: "/api/projects/employees",
  addEmployees: "/api/projects/addEmployees",
  //participants routes
  addParticipant: "/api/projects/addParticipant",
  updateParticipant: "/api/projects/updateParticipant",
  removeParticipant: "/api/projects/removeParticipant",
};

const initialState = {
  error: false,
  projects: [],
  singleProject: false,
  project_participants: [],
  events: [],
  groups: [],
  modules: [],
  employees: [],
};

const slice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    //PROJECTS

    // GET PROJECTS
    getProjectsSuccess(state, action) {
      state.projects = action.payload;
    },

    // GET SINGLE PROJECT
    getSingleProjectSuccess(state, action) {
      state.singleProject = action.payload;
    },

    // ADD GROUP
    addGroupSuccess(state, action) {
      const { newGroupsArray, projectIndex } = action.payload;
      console.log(newGroupsArray, projectIndex);
      state.projects[projectIndex].groups = newGroupsArray;
    },
    // REMOVE GROUP
    removeGroupSuccess(state, action) {
      const { newGroupsArray, projectIndex } = action.payload;
      state.projects[projectIndex].groups = newGroupsArray;
    },
    getGroupsSuccess(state, action) {
      state.groups = action.payload;
    },
    // GET GROUPS FROM PROJECT EMPLOYEES
    getGroupsFromProjectEmployeesSuccess(state, action) {
      const i = action.payload.projectIndex;
      state.projects[i].groups = action.payload.aggregatedGroups;
    },
    // GET ITEMS
    getItemsSuccess(state, action) {
      state.items = action.payload;
    },

    // ADD PROJECTS
    addProjectsSuccess(state, action) {
      console.log(action.payload.Projects);
      state.projects = action.payload.Projects;
    },

    // GET EVENTS
    getEventsSuccess(state, action) {
      state.events = action.payload;
    },

    // GET Modules
    getModulesSuccess(state, action) {
      state.modules = action.payload;
      state.activities = action.payload.activities;
    },

    // GET EMPLOYEES
    getEmployeesSuccess(state, action) {
      state.employees = action.payload.employees;
    },

    // ADD EMPLOYEES
    addEmployeesSuccess(state, action) {
      state.employees = action.payload.employees;
    },

    // GET PROJECT_PARTICIPANTS
    getParticipantsSuccess(state, action) {
      state.project_participants = action.payload;
    },
    // ADD PARTICIPANT
    addParticipantSuccess(state, action) {
      const index = action.payload.index;
      state.projects[index].participants = action.payload.participants;
      state.projects[index].groups = action.payload.updatedGroups;
      console.log("Participants added", action.payload.updatedGroups);
    },
    // UPDATE PARTICIPANT
    updateParticipantSuccess(state, action) {
      const { projectIndex, participantsArray, groups } = action.payload;
      // console.log(groups)
      state.projects[projectIndex].groups = groups;
      state.projects[projectIndex].participants = participantsArray;
    },
    // REMOVOVE PARTICIPANT
    removeParticipantSuccess(state, action) {
      const { projectIndex, removedParticipant } = action.payload;
      state.projects[projectIndex].participants = removedParticipant;
    },
  },
});

// Reducer
export default slice.reducer;

// projects

export function getProjects(index) {
  return async () => {
    try {
      const response = await axios.post(dataRoutes.fetchProjects, { index });
      dispatch(slice.actions.getProjectsSuccess(response.data.projects));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getSingleProject(id) {
  return async () => {
    try {
      const response = await axios.post(dataRoutes.fetchSingleProject, { id });
      dispatch(slice.actions.getSingleProjectSuccess(response.data.project));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getGroupsFromProjectEmployees(aggregatedGroups, index) {
  return async () => {
    try {
      const response = await axios.post(
        dataRoutes.getGroupsFromProjectEmployees,
        { aggregatedGroups, index }
      );
      dispatch(
        slice.actions.getGroupsFromProjectEmployeesSuccess(response.data)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getGroups(project) {
  return async () => {
    try {
      const response = await axios.post(dataRoutes.getGroups, { project });
      dispatch(slice.actions.getGroupsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getGroupsDetails(projectId) {
  return async () => {
    try {
      const response = await axios.post(dataRoutes.fetchGroupsDetails, { projectId });
      dispatch(slice.actions.getGroupsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}



export function addGroup(newGroup, groups, index) {
  return async () => {
    try {
      const response = await axios.post(dataRoutes.addGroup, {
        newGroup,
        groups,
        index,
      });
      dispatch(slice.actions.addGroupSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function removeGroup(updatedGroups, index) {
  return async () => {
    try {
      const response = await axios.post(dataRoutes.removeGroup, {
        updatedGroups,
        index,
      });

      dispatch(slice.actions.removeGroupSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getEmployees() {
  return async () => {
    try {
      const response = await axios.get(dataRoutes.getEmployees);
      dispatch(slice.actions.getEmployeesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addEmployees(newEmployee, employees) {
  console.log(newEmployee);
  return async () => {
    try {
      const response = await axios.post(dataRoutes.addEmployees, {
        newEmployee,
        employees,
      });
      dispatch(slice.actions.addEmployeesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}



export function getParticipants(projectId) {
  return async () => {
    try {
      const response = await axios.post(
        dataRoutes.fetchProjectParticipantsDetails,
        { projectId }
      );
      dispatch(slice.actions.getParticipantsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addParticipant(participants, newParticipant, groups, index) {
  return async () => {
    try {
      const response = await axios.post(dataRoutes.addParticipant, {
        participants,
        newParticipant,
        groups,
        index,
      });
      dispatch(slice.actions.addParticipantSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateParticipant(index, id, value, participants, groups) {
  return async () => {
    try {
      const response = await axios.post(dataRoutes.updateParticipant, {
        index,
        id,
        value,
        participants,
        groups,
      });
      dispatch(slice.actions.updateParticipantSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function removeParticipant(index, removedParticipant) {
  return async () => {
    try {
      const response = await axios.post(dataRoutes.removeParticipant, {
        index,
        removedParticipant,
      });
      dispatch(slice.actions.removeParticipantSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addProjects(newProject, Projects) {
  console.log(Projects);
  return async () => {
    try {
      const response = await axios.post(dataRoutes.addProject, {
        newProject,
        Projects,
      });
      console.log(response.data);
      dispatch(slice.actions.addProjectsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getEvents() {
  return async () => {
    try {
      const response = await axios.get(dataRoutes.getEvents);
      dispatch(slice.actions.getEventsSuccess(response.data.events));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
