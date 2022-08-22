const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";
const SEARCH_DATA_DESTINATION = "search-data-destination";
const SEARCH_DATA_COUNT_GUESTS = "search-data-count-guests";
const SEARCH_DATA_DATE_FROM = "search-data-date-from";
const SEARCH_DATA_DATE_TO = "search-data-date-to";

export function setToken({ idToken, refreshToken, localId, expiresIn = 3600 }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
    localStorage.setItem(USERID_KEY, localId);
};

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
};

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
};

export function getTokenExpiresData() {
    return localStorage.getItem(EXPIRES_KEY);
};

export function getUserId() {
    return localStorage.getItem(USERID_KEY);
};

export function removeAuthData() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(USERID_KEY);
};

export function setSearchData({ destination, countGuests, dateFrom, dateTo }) {
    localStorage.setItem(SEARCH_DATA_DESTINATION, destination);
    localStorage.setItem(SEARCH_DATA_COUNT_GUESTS, countGuests);
    localStorage.setItem(SEARCH_DATA_DATE_FROM, dateFrom);
    localStorage.setItem(SEARCH_DATA_DATE_TO, dateTo);
}

export function getSearchDataCountGuests() {   
    return Number(localStorage.getItem(SEARCH_DATA_COUNT_GUESTS)) 
}
export function getSearchDataDestination() {   
    return localStorage.getItem(SEARCH_DATA_DESTINATION)   
}
export function getSearchDataDateFrom() {   
    return Date.parse(localStorage.getItem(SEARCH_DATA_DATE_FROM))    
}
export function getSearchDataDateTo() {   
    return Date.parse(localStorage.getItem(SEARCH_DATA_DATE_TO))    
}
export function removeSearchData() {
    localStorage.removeItem(SEARCH_DATA_DESTINATION);
    localStorage.removeItem(SEARCH_DATA_COUNT_GUESTS);
    localStorage.removeItem(SEARCH_DATA_DATE_FROM);
    localStorage.removeItem(SEARCH_DATA_DATE_TO);
}
const localStorageService = {
    setToken,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresData,
    getUserId,
    removeAuthData,
    setSearchData,
    getSearchDataCountGuests,
    getSearchDataDestination,
    getSearchDataDateFrom,
    getSearchDataDateTo,
    removeSearchData
};
export default localStorageService;
