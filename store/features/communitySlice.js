import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/apiSetup";
const initialState = {
  communities: [],
  selectedCommunity: null,
  sessions: [],
  users: [],
  totalCommunities: 0,
  resources: [],
  catchup: {},
  isLive: false,
};

export const setVerifyCatchupLive = createAsyncThunk(
  "community/setVerifyCatchupLive",
  async (comId, thunkAPI) => {
    try {
      const res = await api.get(`/catchup/community/${comId}`);
      return res;
    } catch (e) {
      console.log(e);
    }
  }
);

export const setLeaveCatchup = createAsyncThunk(
  "community/setLeaveCatchup",
  async (catchup, thunkAPI) => {
    console.log(catchup);
    try {
      const res = await api.patch(
        `/catchup/leave/${catchup.roomId}/${catchup.comId}/${catchup.userId}`
      );
      return res;
    } catch (e) {
      console.log(e);
    }
  }
);
export const setCommunities = createAsyncThunk(
  "community/setCommunities",
  async (userId, thunkAPI) => {
    console.log("comm call");
    try {
      const res = await api.get(`/community`);
      let communities = res.data.communities.filter((item) => item.id !== 1);
      return { communities: res.data.communities, total: res.data.total };
    } catch (err) {
      console.log(`Error while fetching communities`);
      console.log(err);
      return [];
    }
  }
);

export const setCommunitySessions = createAsyncThunk(
  "community/setCommunitySessions",
  async (communityId, thunkAPI) => {
    try {
      const res = await api.get(`/community/${communityId}/session`);

      return res.data.sessions;
    } catch (err) {
      console.log(`Error while fetching communities`);
      console.log(err);
      return [];
    }
  }
);
export const setCommunityUsers = createAsyncThunk(
  "community/setCommunityUsers",
  async (communityId, thunkAPI) => {
    const res = await api.get(`/community/${communityId}/people`);
    return res.data.users;
  }
);
export const setCommunityById = createAsyncThunk(
  "community/setCommunityById",
  async (communityId, thunkAPI) => {
    const res = await api.get(`/community/${communityId}`);
    return res.data.community;
  }
);

export const setResources = createAsyncThunk(
  "community/setResources",
  async (communityId, thunkAPI) => {
    const res = await api.get(`/resources/${communityId}/resources`);
    // console.log(res);
    return res.data.resources;
  }
);

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    setSelectedCommunity: (state, action) => {
      state.selectedCommunity = action.payload;
    },
    resetSelection: (state) => {
      state.selectedCommunity = null;
    },
    setCommunityCatchup: (state, action) => {
      console.log(action.payload);
      state.catchup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setCommunities.fulfilled, (state, action) => {
      state.communities = action.payload.communities;
      state.totalCommunities = action.payload.total;
    });

    builder.addCase(setCommunitySessions.fulfilled, (state, action) => {
      state.sessions = action.payload;
    });

    builder.addCase(setCommunityUsers.fulfilled, (state, action) => {
      console.log(action.payload);
      state.users = action.payload;
    });

    builder.addCase(setCommunityById.fulfilled, (state, action) => {
      state.selectedCommunity = action.payload;
    });

    builder.addCase(setResources.fulfilled, (state, action) => {
      state.resources = action.payload;
    });
    builder.addCase(setVerifyCatchupLive.fulfilled, (state, action) => {
      if (action.payload.data.success) state.isLive = true;
      else state.isLive = false;

      console.log(action.payload);
    });
    builder.addCase(setLeaveCatchup.fulfilled, (state, action) => {
      if (action.payload.data.success) {
        (state.isLive = false), (state.catchup = {});
      }
    });
  },
});

export default communitySlice;
export const selectAllCommunities = (state) => state.community.communities;
export const selectCommunity = (state) => state.community.selectedCommunity;

export const selectCommunitySessions = (state) => state.community.sessions;
export const selectCommunityUsers = (state) => state.community?.users;
export const selectTotalCommunities = (state) =>
  state.community.totalCommunities;
export const resources = (state) => state.community.resources;
export const selectCatchUp = (state) => state.community.catchup;
export const checkCatchUpLive = (state) => state.community.isLive;
export const { setSelectedCommunity, resetSelection, setCommunityCatchup } =
  communitySlice.actions;
