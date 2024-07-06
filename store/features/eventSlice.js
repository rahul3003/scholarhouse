import api from '@/utils/apiSetup';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for asynchronous operations
export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await api.post('/event', eventData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllEvents = createAsyncThunk(
  'events/fetchAllEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/event');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Other thunks for updating, deleting, viewing events by ID, and buying event passes

// Initial state
const initialState = {
  events: [],
  completedEvents: [],
  loading: false,
  error: null,
};

// Slice
const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create event
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch all events
      .addCase(fetchAllEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming the API response has events and completedEvents fields
        state.events = action.payload;
        state.completedEvents = action.payload;
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Add cases for other thunks as needed
  },
});

export default eventSlice.reducer;

// Selectors
export const selectEvents = (state) => state.event;
export const selectCompletedEvents = (state) => state.event;
export const selectLoading = (state) => state.event?.loading;
export const selectError = (state) => state.event?.error;
