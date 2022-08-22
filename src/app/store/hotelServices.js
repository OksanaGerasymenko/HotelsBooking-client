import { createSlice, createAction } from "@reduxjs/toolkit";
import hotelServiceService from "../services/hotelService.service";
import { nanoid } from "nanoid";

const hotelServicesSlice = createSlice({
    name: "hotelServices",
    initialState: {
        entities: [],
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

const { reducer: hotelServicesReducer, actions } = hotelServicesSlice;
const { requested, recived, requestFailed, createdSuccess, removedSuccess } = actions;
const createRequested = createAction("hotelServices/createRequested");
const createRequestFailed = createAction("hotelServices/createRequestFailed");
const removeRequested = createAction("hotelServices/removeRequestedd");
const removeRequestFailed = createAction("hotelServices/removeRequestFailed");

export const loadHotelServicesList = () => async(dispatch) => {
    dispatch(requested());
    try {
        const { content } = await hotelServiceService.get();
        dispatch(recived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const createHotelService = ({ data }) => async(dispatch) => {
    dispatch(createRequested());
    const hotelService = {
        ...data,
        _id: nanoid()
    };
    try {
        const { content } = await hotelServiceService.create(hotelService);
        dispatch(createdSuccess(content));
    } catch (error) {
        dispatch(createRequestFailed());
    }
};

export const removeHotelService = (id) => async(dispatch) => {
    dispatch(removeRequested());
    try {
        const { content } = await hotelServiceService.remove(id);
        if (content === null) {
            dispatch(removedSuccess({ id }));
        }
    } catch (error) {
        dispatch(removeRequestFailed(error.message));
    }
};
export const getHotelServices = () => (state) => state.hotelServices.entities;
export const getHotelServicesLoadingStatus = () => (state) => state.hotelServices.isLoading;
export const getHotelServiceById = (id) => (state) => state.hotelServices.entities?.find(service => service._id ===id);

export default  hotelServicesReducer;