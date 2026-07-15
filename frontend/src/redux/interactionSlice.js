import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  sendChatAPI,
  createInteraction,
  getInteractions,
  updateInteraction,
  deleteInteraction,
  searchInteractions,
} from "../services/api";

// ========================================
// AI CHAT
// ========================================

export const sendChat = createAsyncThunk(
  "interaction/chat",
  async (message, { rejectWithValue }) => {
    try {
      const response = await sendChatAPI(message);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// ========================================
// SAVE INTERACTION
// ========================================

export const saveInteraction = createAsyncThunk(
  "interaction/save",
  async (form, { rejectWithValue }) => {
    try {
      const response = await createInteraction(form);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// ========================================
// UPDATE INTERACTION
// ========================================

export const editInteraction = createAsyncThunk(
  "interaction/edit",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateInteraction(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const removeInteraction = createAsyncThunk(
  "interaction/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteInteraction(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ========================================
// FETCH HISTORY
// ========================================

export const fetchHistory = createAsyncThunk(
  "interaction/history",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getInteractions();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// ========================================
// SEARCH HISTORY
// ========================================

export const searchHistory = createAsyncThunk(
  "interaction/search",
  async (query, { rejectWithValue }) => {
    try {
      const response = await searchInteractions(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const interactionSlice = createSlice({

  name: "interaction",

  initialState: {

    loading: false,

    messages: [],

    history: [],

    editing: null,

    error: null,

    summary: "",

    entities: {},

    recommendations: null,

    confidence: 0,

  },

  reducers: {

    userMessage: (state, action) => {

        state.messages.push(action.payload);

    },

    setEditing: (state, action) => {

        state.editing = action.payload;

    },

    clearEditing: (state) => {

        state.editing = null;

    },

    clearMessages: (state) => {

        state.messages = [];

        state.summary = "";

        state.entities = {};

        state.recommendations = null;

        state.confidence = 0;

    },

},

 

  extraReducers: (builder) => {

    builder

      // =============================
      // CHAT
      // =============================

      .addCase(sendChat.pending, (state) => {

        state.loading = true;

      })

      .addCase(sendChat.fulfilled, (state, action) => {

        state.loading = false;

        state.messages.push({

          type: "assistant",

          intent: action.payload.intent,

          message: action.payload.message,

          data: action.payload.data,

        });

        state.entities =
          action.payload.entities || {};

        state.summary =
          action.payload.summary || "";

        state.recommendations =
          action.payload.recommendations || null;

        state.confidence =
          action.payload.confidence || 0;

      })

      .addCase(sendChat.rejected, (state, action) => {

        state.loading = false;

        state.error =
          action.payload || action.error.message;

      })

      // =============================
      // SAVE
      // =============================

      .addCase(saveInteraction.pending, (state) => {

        state.loading = true;

      })

      .addCase(saveInteraction.fulfilled, (state, action) => {

        state.loading = false;

        state.history.unshift(action.payload);

      })

      .addCase(saveInteraction.rejected, (state, action) => {

        state.loading = false;

        state.error =
          action.payload || action.error.message;

      })

      // =============================
      // UPDATE
      // =============================

      .addCase(editInteraction.pending, (state) => {

        state.loading = true;

      })

      .addCase(editInteraction.fulfilled, (state, action) => {

        state.loading = false;

        state.editing = null;

        const index =
          state.history.findIndex(

            (item) => item.id === action.payload.id

          );

        if (index !== -1) {

          state.history[index] =
            action.payload;

        }

      })

      .addCase(editInteraction.rejected, (state, action) => {

        state.loading = false;

        state.error =
          action.payload || action.error.message;

      })

      .addCase(removeInteraction.pending, (state) => {
        state.loading = true;
      })

      .addCase(removeInteraction.fulfilled, (state, action) => {
        state.loading = false;
        state.history = state.history.filter((item) => item.id !== action.payload);
      })

      .addCase(removeInteraction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // =============================
      // HISTORY
      // =============================

      .addCase(fetchHistory.pending, (state) => {

        state.loading = true;

      })

      .addCase(fetchHistory.fulfilled, (state, action) => {

        state.loading = false;

        state.history = action.payload;

      })

      .addCase(fetchHistory.rejected, (state, action) => {

        state.loading = false;

        state.error =
          action.payload || action.error.message;

      })

      // =============================
      // SEARCH
      // =============================

      .addCase(searchHistory.pending, (state) => {

        state.loading = true;

      })

      .addCase(searchHistory.fulfilled, (state, action) => {

        state.loading = false;

        state.history = action.payload;

      })

      .addCase(searchHistory.rejected, (state, action) => {

        state.loading = false;

        state.error =
          action.payload || action.error.message;

      });

  },

});

export const {

  userMessage,

  setEditing,

  clearEditing,

  clearMessages,

} = interactionSlice.actions;

export default interactionSlice.reducer;
