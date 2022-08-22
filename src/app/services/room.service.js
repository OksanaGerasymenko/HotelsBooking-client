import httpService from "./http.service";

const roomEndpoint = "room/";

const roomService = {
    create: async(room) => {
        const { data } = await httpService.put(roomEndpoint + room._id, room);
        return data;
    },
    get: async() => {
        const { data } = await httpService.get(roomEndpoint);
        return data;
    },
    remove: async(roomId) => {
        const { data } = await httpService.delete(roomEndpoint + roomId);
        return data;
    }
};

export default roomService;