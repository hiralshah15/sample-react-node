import { makeThunkActionType } from "./actionTypes";

export const counselorConstants = {
    LOGIN_REQUEST: "USERS_LOGIN_REQUEST",
    LOGIN_SUCCESS: "USERS_LOGIN_SUCCESS",
    LOGIN_FAILURE: "USERS_LOGIN_FAILURE",

    ADD_COUNSELOR: makeThunkActionType("ADD_COUNSELOR"),

    GET_COUNSELOR_REVIEWS: makeThunkActionType("GET_COUNSELOR_REVIEWS"),

    LOGOUT: "USERS_LOGOUT",

    MERGED_COUNSELOR_USER_PROFILE: "MERGED_COUNSELOR_USER_PROFILE",
    SET_ACTIVE_COUNSELOR: "SET_ACTIVE_COUNSELOR",
    LOAD_COUNSELOR_DETAILS: makeThunkActionType("LOAD_COUNSELOR_DETAILS"),
    GET_COUNSELOR_SCHEDULE: makeThunkActionType("GET_COUNSELOR_SCHEDULE"),
    AVAILABLE_SHIFTS: makeThunkActionType("AVAILABLE_SHIFTS"),
    GET_COUNSELOR_EARNINGS: makeThunkActionType("GET_COUNSELOR_EARNINGS"),
    LOAD_MORE_EARNINGS_HISTORY: makeThunkActionType(
        "LOAD_MORE_EARNINGS_HISTORY"
    ),
    CHANGE_ENABLE_STATUS: makeThunkActionType("COUNSELOR_CHANGE_ENABLE_STATUS"),

    UPDATE_COUNSELOR: makeThunkActionType("UPDATE_COUNSELOR"),
    GET_ALL: makeThunkActionType("COUNSELOR_GET_ALL"),
    FETCH_COUNSELOR_DOCUMENT: makeThunkActionType("FETCH_COUNSELOR_DOCUMENT"),
    UPLOAD_AVATAR: makeThunkActionType("UPLOAD_AVATAR"),
};
