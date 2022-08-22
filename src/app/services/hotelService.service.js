import httpService from "./http.service";

const hotelServiceEndpoint = "hotelService/";

const hotelServiceService = {
    create: async(hotelService) => {
        const { data } = await httpService.put(hotelServiceEndpoint + hotelService._id, hotelService);
        return data;
    },
    get: async() => {
        const { data } = await httpService.get(hotelServiceEndpoint);
        return data;
    },
    remove: async(hotelServiceId) => {
        const { data } = await httpService.delete(hotelServiceEndpoint + hotelServiceId);
        return data;
    }
};

export default hotelServiceService;