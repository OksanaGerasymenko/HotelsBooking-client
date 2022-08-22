import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { loadCountriesList } from "../../../store/countries";
import { loadCitiesList } from "../../../store/cities";
import { loadHotelServicesList } from "../../../store/hotelServices";
import { loadHotelsList } from "../../../store/hotels";
import { loadRoomsList } from "../../../store/rooms";
import { loadBookingList } from "../../../store/booking";
import { getIsLoggedIn, loadUsersList, getUsersLoadingStatus } from "../../../store/users";
import Loader from "../../common/loader";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();    
    const isLoggedIn = useSelector(getIsLoggedIn());
    const usersLoadingStatus = useSelector(getUsersLoadingStatus())
    useEffect(() => {
        dispatch(loadCountriesList());
        dispatch(loadCitiesList());
        dispatch(loadHotelServicesList());
        dispatch(loadHotelsList());
        dispatch(loadRoomsList());
        if (isLoggedIn) {
            dispatch(loadUsersList());
            dispatch(loadBookingList());
        }    
    }, [isLoggedIn]);
    if (usersLoadingStatus) return <Loader />
    return children
};
AppLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
export default AppLoader;