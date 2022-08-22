import httpService from "./http.service";

const bookingEndpoint = "booking/";

const bookingService = {
    create: async(booking) => {
        const { data } = await httpService.put(bookingEndpoint + booking._id, booking);
        return data;
    },
    get: async() => {
        const { data } = await httpService.get(bookingEndpoint);
        return data;
    },
    remove: async(bookingId) => {
        const { data } = await httpService.delete(bookingEndpoint + bookingId);
        return data;
    }
};

export default bookingService;