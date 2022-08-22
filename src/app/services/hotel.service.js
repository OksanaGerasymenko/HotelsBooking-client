import httpService from "./http.service";

const hotelEndpoint = "hotel/";

const hotelService = {
    create: async(hotel) => {
        const { data } = await httpService.put(hotelEndpoint + hotel._id, hotel);
        return data;
    },
    get: async() => {
        const { data } = await httpService.get(hotelEndpoint);
        return data;
    },
    remove: async(hotelId) => {
        const { data } = await httpService.delete(hotelEndpoint + hotelId);
        return data;
    }
};

export default hotelService;