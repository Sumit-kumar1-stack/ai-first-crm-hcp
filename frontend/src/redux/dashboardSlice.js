import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getDashboardStats,
} from "../services/api";

// =====================================
// FETCH DASHBOARD
// =====================================

export const fetchDashboardStats =
  createAsyncThunk(
    "dashboard/fetch",
    async (_, { rejectWithValue }) => {
      try {

        const response =
          await getDashboardStats();

        return response.data;

      } catch (error) {

        return rejectWithValue(
          error.response?.data ||
          error.message
        );

      }
    }
  );

// =====================================
// SLICE
// =====================================

const dashboardSlice = createSlice({

  name: "dashboard",

initialState: {

    loading: false,

    error: null,

    summary: {},

    weeklyMeetings: [],

    productDistribution: [],

    recentActivity: [],

    followups: [],

},

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(
        fetchDashboardStats.pending,
        (state) => {

          state.loading = true;

        }
      )

      .addCase(
        fetchDashboardStats.fulfilled,
        (state, action) => {

          state.loading = false;

          state.summary =
            action.payload.summary;

          state.weeklyMeetings =
            action.payload.weekly_meetings;

          state.productDistribution =
            action.payload.product_distribution;

          state.recentActivity =
            action.payload.recent_activity;

          state.followups =
            action.payload.followups;

        }
      )

      .addCase(
        fetchDashboardStats.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            action.error.message;

        }
      );

  },

});

export default dashboardSlice.reducer;