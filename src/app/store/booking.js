import { createSlice, createAction } from "@reduxjs/toolkit";
import bookingService from "../services/booking.service";
import { nanoid } from "nanoid";

const bookingSlice = createSlice({
    name: "bookings",
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

const { reducer: bookingsReducer, actions } = bookingSlice;
const { requested, recived, requestFailed, createdSuccess, removedSuccess } = actions;
const createRequested = createAction("bookings/createRequested");
const createRequestFailed = createAction("bookings/createRequestFailed");
const removeRequested = createAction("bookings/removeRequestedd");
const removeRequestFailed = createAction("bookings/removeRequestFailed");

export const loadBookingList = () => async(dispatch) => {
    dispatch(requested());
    try {
        const { content } = await bookingService.get();
        dispatch(recived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};
export const createBooking = ({ data, currentUserId }) => async(dispatch) => {
    dispatch(createRequested());
    const booking = {
        ...data,
        _id: nanoid(),
        userId: currentUserId,
        created_at: Date.now(),
        status: "active"
    };
    try {
        const { content } = await bookingService.create(booking);
        dispatch(createdSuccess(content));
    } catch (error) {
        dispatch(createRequestFailed());
    }
};

export const removeBooking = (id) => async(dispatch) => {
    dispatch(removeRequested());
    try {
        const { content } = await bookingService.remove(id);
        if (content === null) {
            dispatch(removedSuccess({ id }));
        }
    } catch (error) {
        dispatch(removeRequestFailed(error.message));
    }
};
export const getBooking = () => (state) => state.bookings.entities;
export const getBookingByUserId = (userId) => (state) => state.bookings.entities.filter(b => b.userId === userId)
export const getBookingLoadingStatus = () => (state) => state.bookings.isLoading;

export default bookingsReducer;