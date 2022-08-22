import { combineReducers, configureStore } from "@reduxjs/toolkit"
import usersReducer from "./users"
import citiesReducer from "./cities"
import commentsReducer from "./comments"
import countriesReducer from "./countries"
import hotelServicesReducer from "./hotelServices"
import hotelsReducer from "./hotels"
import roomsReducer from "./rooms";
import bookingsReducer from "./booking"

const rootReducer = combineReducers({
    users: usersReducer,
    cities: citiesReducer,
    comments: commentsReducer,
    countries: countriesReducer,
    hotelServices: hotelServicesReducer,
    hotels: hotelsReducer,
    rooms: roomsReducer,
    bookings: bookingsReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer})

}