import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/apiSetup";
const initialState = {
  user: 0,
  nextpage: null,
  attendance: [],
  sessions: [],
  selectedSession: null,
  communities: [],
  communitySessions: [],
  weeklyPass: false,
  cart: [],
  meetingLink: "",
  loading: false,
  from: "",
  meetdetails: {},
};

export const setUserSessions = createAsyncThunk(
  "user/setUserSessions",
  async (uid, thunkAPI) => {
    try {
      const res = await api.get(`/user/${uid}/sessions`);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(`Error while fetching sessions of user:${uid}`);
      console.log(err);
      return [];
    }
  }
);

export const setUserCommunities = createAsyncThunk(
  "user/setUserCommunities",
  async (uid, thunkAPI) => {
    try {
      const res = await api.get(`/user/${uid}/community`);
      let communities = res.data.communities;
      let hasWeeklyPass = communities?.find((item) => item.id === 1);
      let stampedCommunities = communities?.map((item) => ({
        ...item,
        bought: true,
      }));
      return [stampedCommunities, !!hasWeeklyPass, res.data.memberships];
    } catch (err) {
      console.log(`Error while fetching communities of user:${uid}`);
      console.log(err);
      return [];
    }
  }
);

export const setUserCart = createAsyncThunk(
  "user/setUserCart",
  async (uid, thunkAPI) => {
    try {
      const res = await api.get(`/user/${uid}/cart`);
      return res.data;
    } catch (err) {
      console.log(`Error while fetching attendance(cart) of user:${uid}`);
      console.log(err);
      return [];
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFromPage: (state, action) => {
      state.from = action.payload;
    },
    setMeetDetails: (state, action) => {
      state.meetdetails = action.payload;
    },
    setNextPage: (state, action) => {
      state.nextpage = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("persist:rootStore");
    },
    resetNextPage: (state) => {
      state.nextpage = null;
    },
    setSelectedUserSession: (state, action) => {
      state.selectedSession = action.payload;
    },
    resetSelectedUserSession: (state) => {
      state.selectedSession = null;
    },
    setMeetingLink: (state, action) => {
      state.meetingLink = action.payload;
    },
    resetMeetingLink: (state) => {
      state.meetingLink = "";
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setUserSessions.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.sessions = {
        sessions: action.payload.session,
        completedSessions: action.payload.completedSessions,
      };
      state.attendance = action.payload.attendance;
    });

    builder.addCase(setUserCommunities.fulfilled, (state, action) => {
      state.communities = action.payload[0];
      state.weeklyPass = action.payload[1];
      state.communitySessions = action.payload[2];
    });

    builder.addCase(setUserCart.fulfilled, (state, action) => {
      state.cart = action.payload.cart;
    });
  },
});

export default userSlice;
export const selectUser = (state) => state.user.user;
export const selectNextPage = (state) => state.user.nextpage;

export const selectUserSessions = (state) => state.user.sessions;
export const selectOneSession = (state) => state.user.selectedSession;
export const selectUserAttendance = (state) => state.user.attendance;
export const selectUserCommunities = (state) => state.user.communities;
export const selectUserPass = (state) => state.user.weeklyPass;

export const selectUserCommunitySessions = (state) =>
  state.user.communitySessions;
export const selectUserCart = (state) => state.user.cart;
export const selectUserMeetingLink = (state) => state.user.meetingLink;
export const selectLoading = (state) => state.user.loading;
export const selectFromDetails = (state) => state.user.from;
export const selectMeetDetails = (state) => state.user.meetdetails;

export const {
  setUser,
  logoutUser,
  setNextPage,
  resetNextPage,
  setSelectedUserSession,
  resetSelectedUserSession,
  addToCart,
  clearCart,
  setMeetingLink,
  resetMeetingLink,
  setLoading,
  setFromPage,
  setMeetDetails,
} = userSlice.actions;
