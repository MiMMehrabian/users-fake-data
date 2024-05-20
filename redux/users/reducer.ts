import { FAIL_GET_USERS, FETCH_USERS_COUNT, GET_USERS, SUCCESS_GET_USERS, FETCH_USERS_PAGES, FETCH_USERS_PERPAGES, FETCH_THIS_USERS } from "./types";

const initialAdminsState: any = {
    loading: false,
    data: [],
    error: null,
    count: "",
    totalPages: "",
    perPage: "",
    user: {}
};

const userReducer = (state = initialAdminsState, { type, payload }: any) => {
    switch (type) {
        case GET_USERS:
            return {
                ...state,
                loading: true
            };
        case SUCCESS_GET_USERS:
            return {
                ...state,
                loading: false,
                data: payload
            };
        case FAIL_GET_USERS:
            return {
                ...state,
                loading: false,
                error: "error"
            };
        case FETCH_USERS_PAGES:
            return {
                ...state,
                totalPages: payload
            };
        case FETCH_USERS_PERPAGES:
            return {
                ...state,
                perPage: payload
            };
        case FETCH_USERS_COUNT:
            return {
                ...state,
                count: payload,
            };
        case FETCH_THIS_USERS:
            return {
                ...state,
                user: payload,
            };
        default:
            return state;
    }
};

export default userReducer;
