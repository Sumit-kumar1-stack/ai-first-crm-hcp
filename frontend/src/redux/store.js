import { configureStore } from "@reduxjs/toolkit";

import interactionReducer from "./interactionSlice";
import interactionFormReducer from "./interactionFormSlice";

import dashboardReducer from "./dashboardSlice";
import authReducer from "./authSlice";

export const store = configureStore({

    reducer: {

        interaction: interactionReducer,

        interactionForm: interactionFormReducer,

        dashboard: dashboardReducer,

        auth: authReducer,

    },

});