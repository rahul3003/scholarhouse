import api from "@/utils/apiSetup";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedExpert: null,
  allExperts: [],
  expertSessions: [],
  expertCompletedSessions: [],
  expertCommunities: [],
};

export const setAllExperts = createAsyncThunk(
  "expert/setAllExperts",
  async (thunkAPI) => {
    const experts = await api.get(`/expert`);
    return experts.data.experts;
  }
);

export const setExpertSessions = createAsyncThunk(
  "expert/setExpertSessions",
  async (expertId, thunkAPI) => {
    if (expertId) {
      const res = await api.get(`/expert/${expertId}/sessions`);
      return res.data;
    }
  }
);
export const setExpertCommunities = createAsyncThunk(
  "expert/setExpertCommunities",
  async (expertId, thunkAPI) => {
    const res = await api.get(`/expert/${expertId}/community`);
    return res.data.communities;
  }
);

const expertSlice = createSlice({
  name: "expert",
  initialState,
  reducers: {
    setExpert: (state, action) => {
      state.selectedExpert = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setAllExperts.fulfilled, (state, action) => {
      state.allExperts = action.payload;
    });
    builder.addCase(setExpertSessions.fulfilled, (state, action) => {
      if (action.payload) {
        state.expertSessions = action.payload?.sessions;
        state.expertCompletedSessions = action.payload?.completedSessions;
      } else {
        state.expertSessions = [];
      }
    });
    builder.addCase(setExpertCommunities.fulfilled, (state, action) => {
      state.expertCommunities = action.payload;
    });
  },
});

export default expertSlice;
export const selectExpert = (state) => state.expert.selectedExpert;
export const selectAllExperts = (state) => state.expert.allExperts;
export const selectExpertSessions = (state) => state.expert.expertSessions;
export const selectExpertCompletedSessions = (state) =>
  state.expert.expertCompletedSessions;
export const selectExpertCommunities = (state) =>
  state.expert.expertCommunities;
export const { setExpert } = expertSlice.actions;
