import httpService from "./http.service";

const commentEndpoint = "comment/";

const commentService = {
    create: async(comment) => {
        const { data } = await httpService.put(commentEndpoint + comment._id, comment);
        return data;
    },
    get: async(hotelId) => {
        const { data } = await httpService.get(commentEndpoint, {
            params: {
                orderBy: '"hotelId"',
                equalTo: `"${hotelId}"`
            }
        });
        return data;
    },
    remove: async(commentId) => {
        const { data } = await httpService.delete(commentEndpoint + commentId);
        return data;
    }
};

export default commentService;