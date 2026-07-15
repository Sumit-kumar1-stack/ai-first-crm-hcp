import {

    createSlice,

    createAsyncThunk,

} from "@reduxjs/toolkit";

import {

    loginUser,

} from "../services/authApi";

import {

    saveToken,

    removeToken,

} from "../utils/token";

export const login = createAsyncThunk(

    "auth/login",

    async (

        credentials,

        { rejectWithValue }

    ) => {

        try {

            const response = await loginUser(

                credentials

            );

            saveToken(

                response.data.access_token

            );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

const authSlice = createSlice({

    name: "auth",

    initialState: {

        loading: false,

        user: null,

        token: null,

        error: null,

        authenticated: false,

    },

    reducers: {

        logout(state) {

            removeToken();

            state.user = null;

            state.token = null;

            state.authenticated = false;

        },

    },

    extraReducers: (builder) => {

        builder

        .addCase(

            login.pending,

            (state)=>{

                state.loading=true;

            }

        )

        .addCase(

            login.fulfilled,

            (state,action)=>{

                state.loading=false;

                state.user={

                    name:action.payload.full_name,

                    role:action.payload.role,

                };

                state.token=

                    action.payload.access_token;

                state.authenticated=true;

            }

        )

        .addCase(

            login.rejected,

            (state,action)=>{

                state.loading=false;

                state.error=

                    action.payload?.detail ||

                    action.error.message;

            }

        );

    }

});

export const {

    logout

}=authSlice.actions;

export default authSlice.reducer;