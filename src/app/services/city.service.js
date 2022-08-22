import httpService from "./http.service";

const cityEndpoint = "city/";

const cityService = {
    create: async(city) => {
        const { data } = await httpService.put(cityEndpoint + city._id, city);
        return data;
    },
    get: async() => {
        const { data } = await httpService.get(cityEndpoint);
        return data;
    },
    remove: async(cityId) => {
        const { data } = await httpService.delete(cityEndpoint + cityId);
        return data;
    }
};

export default cityService;