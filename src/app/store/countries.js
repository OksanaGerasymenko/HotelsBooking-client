import { createSlice, createAction } from "@reduxjs/toolkit";
import countryService from "../services/country.service";
import { nanoid } from "nanoid";

const countriesSlice = createSlice({
    name: "countries",
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

const { reducer: countriesReducer, actions } = countriesSlice;
const { requested, recived, requestFailed, createdSuccess, removedSuccess } = actions;
const createRequested = createAction("countries/createRequested");
const createRequestFailed = createAction("countries/createRequestFailed");
const removeRequested = createAction("countries/removeRequestedd");
const removeRequestFailed = createAction("countries/removeRequestFailed");

export const loadCountriesList = () => async(dispatch) => {
    dispatch(requested());
    try {
        const { content } = await countryService.get();
        dispatch(recived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const createCountry = ({ data }) => async(dispatch) => {
    dispatch(createRequested());
    const country = {
        ...data,
        _id: nanoid()
    };
    try {
        const { content } = await countryService.create(country);
        dispatch(createdSuccess(content));
    } catch (error) {
        dispatch(createRequestFailed());
    }
};

export const removeCountry = (id) => async(dispatch) => {
    dispatch(removeRequested());
    try {
        const { content } = await countryService.remove(id);
        if (content === null) {
            dispatch(removedSuccess({ id }));
        }
    } catch (error) {
        dispatch(removeRequestFailed(error.message));
    }
};
export const getCountries = () => (state) => state.countries.entities;
export const getCountriesLoadingStatus = () => (state) => state.countries.isLoading;
export const getCountryById = (id) => (state) => state.countries.entities?.find( country => country._id ===id)
export default countriesReducer;