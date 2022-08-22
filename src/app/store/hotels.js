import { createSlice, createAction } from "@reduxjs/toolkit";
import hotelService from "../services/hotel.service";
import { nanoid } from "nanoid";

const hotelsSlice = createSlice({
    name: "hotels",
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

const { reducer: hotelsReducer, actions } = hotelsSlice;
const { requested, recived, requestFailed, createdSuccess, removedSuccess } = actions;
const createRequested = createAction("hotels/createRequested");
const createRequestFailed = createAction("hotels/createRequestFailed");
const removeRequested = createAction("hotels/removeRequestedd");
const removeRequestFailed = createAction("hotels/removeRequestFailed");

export const loadHotelsList = () => async(dispatch) => {
    dispatch(requested());
    try {
        const { content } = await hotelService.get();
        dispatch(recived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const createHotel = ({ data }) => async(dispatch) => {
    dispatch(createRequested());
    const hotel = {
        ...data,
        _id: nanoid()
    };
    try {
        const { content } = await hotelService.create(hotel);
        dispatch(createdSuccess(content));
    } catch (error) {
        dispatch(createRequestFailed());
    }
};

export const removeHotel = (id) => async(dispatch) => {
    dispatch(removeRequested());
    try {
        const { content } = await hotelService.remove(id);
        if (content === null) {
            dispatch(removedSuccess({ id }));
        }
    } catch (error) {
        dispatch(removeRequestFailed(error.message));
    }
};

export const getPopularDestinationHotels = () => (state) => {    
    const popularHotels = [];
    state.hotels.entities?.forEach(hotel => {
        if (hotel.isPopularDestination) {
            popularHotels.push({
                _id: nanoid(),
                hotelId: hotel._id,
                image: hotel.images[0],
                name: hotel.name,
                address: hotel.address.slice(hotel.address.indexOf(',') + 1).trim()
            })
        }
    });
    return popularHotels;
}

export const getSalesHotels = () => (state) => {
    const salesHotels = [];
    state.hotels.entities?.forEach(hotel => {
        if (hotel.isSales) {            
            salesHotels.push({
                _id: nanoid(),
                hotelId: hotel._id,
                image: hotel.images[0],
                name: hotel.name,
                address: hotel.address.slice(hotel.address.indexOf(',') + 1).trim(),
                salesPercent: hotel.salesPercent
            })
        }
    });
    return salesHotels;
}

export const getHotelsByDestination = (destinationId) => (state) => {
    if (destinationId === "") return state.hotels.entities;
    return state.hotels.entities?.filter( hotel => 
    hotel.countryID === destinationId || hotel.cityID === destinationId )
}

export const getHotels = () => (state) => state.hotels.entities;
export const getHotelsLoadingStatus = () => (state) => state.hotels.isLoading;
export const getHotelById = (id) => (state) => state.hotels.entities?.find(hotel => hotel._id ===id);
export default hotelsReducer;