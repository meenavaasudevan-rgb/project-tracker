import { createSlice } from "@reduxjs/toolkit";

type Project = {
  id: number;
  name: string;
  description: string;
  status: string;
};

const initialState: {
  items: Project[];
} = {
  items: [],
};

const projectSlice = createSlice({
  name: "projects",

  initialState,

  reducers: {
    addProject: (state, action) => {
      state.items.push(action.payload);
    },

    deleteProject: (state, action) => {
      state.items = state.items.filter(
        (project: Project) =>
          project.id !== action.payload
      );
    },

    updateStatus: (state, action) => {
      const { id, status } = action.payload;

      const project = state.items.find(
        (project: Project) => project.id === id
      );

      if (project) {
        project.status = status;
      }
    },
  },
});

export const {
  addProject,
  deleteProject,
  updateStatus,
} = projectSlice.actions;

export default projectSlice.reducer;