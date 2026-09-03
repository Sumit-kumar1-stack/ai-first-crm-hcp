import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctor: "",
  hospital: "",
  specialty: "",
  product: "",
  interaction_type: "",
  sentiment: "",
  follow_up: "",
  notes: "",
  confidence: 0,
  approved: false,
  rejected: false,
  saved: false,
  loading: false,
};

const interactionFormSlice = createSlice({
  name: "interactionForm",
  initialState,
  reducers: {
    setEntities(state, action) {
      Object.assign(state, action.payload);
      state.approved = false;
      state.rejected = false;
      state.saved = false;
    },

    updateField(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    },

    approveExtraction(state) {
      state.approved = true;
      state.rejected = false;
    },

    rejectExtraction(state) {
      state.approved = false;
      state.rejected = true;
    },

    markSaved(state) {
      state.saved = true;
      state.approved = false;
    },

    clearForm() {
      return {
        ...initialState,
        saved: true,
      };
    },

    resetForm() {
      return initialState;
    },
  },
});

export const {
  setEntities,
  updateField,
  approveExtraction,
  rejectExtraction,
  markSaved,
  clearForm,
  resetForm,
} = interactionFormSlice.actions;

export default interactionFormSlice.reducer;