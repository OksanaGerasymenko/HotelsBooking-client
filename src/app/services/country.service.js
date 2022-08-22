import httpService from "./http.service";

const countryEndpoint = "country/";

const countryService = {
    create: async(country) => {
        const { data } = await httpService.put(countryEndpoint + country._id, country);
        return data;
    },
    get: async() => {
        const { data } = await httpService.get(countryEndpoint);
        return data;
    },
    remove: async(countryId) => {
        const { data } = await httpService.delete(countryEndpoint + countryId);
        return data;
    }
};

export default countryService;