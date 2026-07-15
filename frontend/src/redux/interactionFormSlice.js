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

    loading: false,

};

const interactionFormSlice = createSlice({

    name: "interactionForm",

    initialState,

    reducers: {

        setEntities(state, action) {

            Object.assign(state, action.payload);

        },

        updateField(state, action) {

            const {

                field,

                value,

            } = action.payload;

            state[field] = value;

        },

        approveExtraction(state) {

            state.approved = true;

        },

        rejectExtraction(state) {

            state.approved = false;

        },

        clearForm() {

            return initialState;

        },

    },

});

export const {

    setEntities,

    updateField,

    approveExtraction,

    rejectExtraction,

    clearForm,

} = interactionFormSlice.actions;

export default interactionFormSlice.reducer;