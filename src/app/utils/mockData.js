import { useState, useEffect } from "react";
import cities from "../mockData/cities.json";
import countries from "../mockData/countries.json";
import comments from "../mockData/comments.json";
import users from "../mockData/users.json";
import hotels from "../mockData/hotels.json";
import rooms from "../mockData/rooms.json";
import booking from "../mockData/booking.json";
import hotelServices from "../mockData/hotelServices.json";
import httpService from "../services/http.service";

const statuses = {
    idle: "Not started",
    pending: "In process",
    successed: "Ready",
    error: "Error ocurred"
};
const useMockData = () => {
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statuses.idle);
    const [count, setCount] = useState(0);
    const [progress, setProgress] = useState(0);
    const maxCount = cities.length + countries.length + users.length + hotels.length + rooms.length + comments.length + hotelServices.length + booking.length;
    const incrementCount = () => {
        setCount(prevState => prevState + 1);
    };
    const changeProgress = () => {
        if (count !== 0 && status === statuses.idle) {
            setStatus(statuses.pending);
        }
        const newProgress = Math.floor(count / maxCount * 100);
        if (progress < newProgress) setProgress(() => newProgress);
        if (newProgress === 100) setStatus(statuses.successed);
    };

    useEffect(() => { changeProgress(); }, [count]);

    async function initialize() {
        try {
            for (const user of users) {
                await httpService.put("user/" + user._id, user);
                incrementCount();
            }
            for (const city of cities) {
                await httpService.put("city/" + city._id, city);
                incrementCount();
            }
            for (const country of countries) {
                await httpService.put("country/" + country._id, country);
                incrementCount();
            }
            for (const hotelService of hotelServices) {
                await httpService.put("hotelService/" + hotelService._id, hotelService);
                incrementCount();
            }
            for (const hotel of hotels) {
                await httpService.put("hotel/" + hotel._id, hotel);
                incrementCount();
            }
            for (const room of rooms) {
                await httpService.put("room/" + room._id, room);
                incrementCount();
            }            
            for (const comment of comments) {
                await httpService.put("comment/" + comment._id, comment);
                incrementCount();
            }
            for (const book of booking) {
                await httpService.put("booking/" + book._id, booking);
                incrementCount();
            }
            
        } catch (error) {
            setError(error);
            setStatus(statuses.error);
        }
    }
    return { error, initialize, progress, status };
};

export default useMockData; 