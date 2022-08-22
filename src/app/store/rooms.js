import { createSlice, createAction } from "@reduxjs/toolkit";
import roomService from "../services/room.service";
import { nanoid } from "nanoid";

const roomsSlice = createSlice({
    name: "rooms",
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

const { reducer: roomsReducer, actions } = roomsSlice;
const { requested, recived, requestFailed, createdSuccess, removedSuccess } = actions;
const createRequested = createAction("rooms/createRequested");
const createRequestFailed = createAction("rooms/createRequestFailed");
const removeRequested = createAction("rooms/removeRequestedd");
const removeRequestFailed = createAction("rooms/removeRequestFailed");

export const loadRoomsList = () => async(dispatch) => {
    dispatch(requested());
    try {
        const { content } = await roomService.get();
        dispatch(recived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const createRoom = ({ data, hotelId }) => async(dispatch) => {
    dispatch(createRequested());
    const room = {
        ...data,
        _id: nanoid(),
        hotelId
    };
    try {
        const { content } = await roomService.create(room);
        dispatch(createdSuccess(content));
    } catch (error) {
        dispatch(createRequestFailed());
    }
};

export const removeRoom = (id) => async(dispatch) => {
    dispatch(removeRequested());
    try {
        const { content } = await roomService.remove(id);
        if (content === null) {
            dispatch(removedSuccess({ id }));
        }
    } catch (error) {
        dispatch(removeRequestFailed(error.message));
    }
};
export const getRooms = () => (state) => state.rooms.entities;
export const getRoomsLoadingStatus = () => (state) => state.rooms.isLoading;
export const getMinRoomPriceByHotelId = (hotelId) => (state) => {
    const rooms = state.rooms.entities.filter(room => roomsReducer._id === hotelId);
    if (rooms) {
        const prices = rooms.map(room => room.price);
        return Math.min(prices)
    }else return 0
}
export const getRoomsByHotelId = (hotelId) => (state) => state.rooms.entities?.filter(room => room.hotelId ===hotelId)
export const getRoomById = (roomId) => (state) => state.rooms.entities?.find(room => room._id === roomId)
export default roomsReducer;