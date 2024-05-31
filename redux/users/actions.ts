import { Dispatch } from "redux";
import { FAIL_GET_USERS, FETCH_USERS_COUNT, FETCH_USERS_PAGES, GET_USERS, SUCCESS_GET_USERS, FETCH_USERS_PERPAGES, FETCH_THIS_USERS } from "./types";
import queryString from "query-string";
import axios from "@/configs/axios";
import { USER_ROUTE } from "@/configs/routes";

// action : get user data from API
export const userFetchRequest = (query: object): any => async (dispatch: Dispatch<any>) => {
    dispatch({ type: GET_USERS, payload: null });
    const queryS: any = queryString.stringify(query, { encode: false });
    axios
        .get(`${USER_ROUTE}?${queryS}`)
        .then((e) => {
            dispatch({ type: SUCCESS_GET_USERS, payload: e?.data?.data, });
            dispatch({ type: FETCH_USERS_COUNT, payload: e?.data?.per_page });
            dispatch({ type: FETCH_USERS_PAGES, payload: e?.data?.total_pages });
        })
        .catch((err) => {
            dispatch({ type: FAIL_GET_USERS, payload: err });
        });
};

// action : fetch a user data
export const fetchUser = (id: any): any => async (dispatch: Dispatch<any>, getState: any) => {
    const { data } = getState().users;
    const filteredUser = data.find((user: any) => user.id == id);
    dispatch({
        type: FETCH_THIS_USERS,
        payload: filteredUser,
    });
};