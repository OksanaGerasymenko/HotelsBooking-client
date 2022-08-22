import { createSlice, createAction } from "@reduxjs/toolkit";
import cityService from "../services/city.service";
import { nanoid } from "nanoid";

const citiesSlice = createSlice({
    name: "cities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        requested: (state) => {
            state.isLoading = true;
        },
        recived: (state, action) => {
            state.isLoading = false;
            state.entities = action.payload;
        },
        requestFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        createdSuccess: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            };
            state.entities.push(action.payload);
        },
        removedSuccess: (state, action) => {
            state.entities = state.entities.filter(c => c._id !== action.payload.id);
        }
    }
});

const { reducer: citiesReducer, actions } = citiesSlice;
const { requested, recived, requestFailed, createdSuccess, removedSuccess } = actions;
const createRequested = createAction("cities/createRequested");
const createRequestFailed = createAction("cities/createRequestFailed");
const removeRequested = createAction("cities/removeRequestedd");
const removeRequestFailed = createAction("cities/removeRequestFailed");

export const loadCitiesList = () => async(dispatch) => {
    dispatch(requested());
    try {
        const { content } = await cityService.get();
        dispatch(recived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const createCity = ({ data }) => async(dispatch) => {
    dispatch(createRequested());
    const city = {
        ...data,
        _id: nanoid()
    };
    try {
        const { content } = await cityService.create(city);
        dispatch(createdSuccess(content));
    } catch (error) {
        dispatch(createRequestFailed());
    }
};

export const removeCity = (id) => async(dispatch) => {
    dispatch(removeRequested());
    try {
        const { content } = await cityService.remove(id);
        if (content === null) {
            dispatch(removedSuccess({ id }));
        }
    } catch (error) {
        dispatch(removeRequestFailed(error.message));
    }
};
export const getCities = () => (state) => state.cities.entities;
export const getCitiesLoadingStatus = () => (state) => state.cities.isLoading;
export const getCityById = (id) => (state) => state.cities.entities?.find( city => city._id ===id)
export default citiesReducer;