import { makeThunkActionType } from "./actionTypes";

export const scheduleConstants = {
    OPEN_CLOSE_MODAL_ADD_SHIFT: "OPEN_CLOSE_MODAL_ADD_SHIFT",
    OPEN_MODAL_VIEW_SHIFT: "OPEN_MODAL_VIEW_SHIFT",
    CLOSE_MODAL_VIEW_SHIFT: "CLOSE_MODAL_VIEW_SHIFT",

    OPEN_VIEW_SCHOOL: "OPEN_VIEW_SCHOOL",
    CLOSE_VIEW_SCHOOL: "CLOSE_VIEW_SCHOOL",
    OPEN_SCHOOL_DISABLE_MODAL: "OPEN_SCHOOL_DISABLE_MODAL",
    ACCOUNT_ENA_DIS: "ACCOUNT_ENA_DIS",

    UPDATE_SCHOOL_REQUEST: "UPDATE_SCHOOL_REQUEST",
    UPDATE_SCHOOL_SUCCESS: "UPDATE_SCHOOL_SUCCESS",
    UPDATE_SCHOOL_FAILURE: "UPDATE_SCHOOL_FAILURE",

    ADD_SCHOOL_REQUEST: "ADD_SCHOOL_REQUEST",
    ADD_SCHOOL_SUCCESS: "ADD_SCHOOL_SUCCESS",
    ADD_SCHOOL_FAILURE: "ADD_SCHOOL_FAILURE",

    GETALL_SCHOOL_REQUEST: "GETALL_SCHOOL_REQUEST",
    GETALL_SCHOOL_SUCCESS: "GETALL_SCHOOL_SUCCESS",
    GETALL_SCHOOL_FAILURE: "GETALL_SCHOOL_FAILURE",
    NEW_SHIFT: makeThunkActionType("NEW_SHIFT"),
    LOAD_SHIFT_DETAILS: makeThunkActionType("LOAD_SHIFT_DETAILS"),
    COPY_SHIFTS: makeThunkActionType("COPY_SHIFTS"),

    JOIN_SHIFT: makeThunkActionType("JOIN_SHIFT"),
    LEAVE_SHIFT: makeThunkActionType("LEAVE_SHIFT"),
    DELETE_SHIFT: makeThunkActionType("DELETE_SHIFT"),
    UPDATE_SHIFT_CAPACITY: makeThunkActionType("UPDATE_SHIFT_CAPACITY"),
    LOAD_AVAILABLE_SHIFTS: makeThunkActionType("LOAD_AVAILABLE_SHIFTS"),
    LOAD_MY_SCHEDULE: makeThunkActionType("LOAD_MY_SCHEDULE"),
    SET_SCHEDULE_VIEW_STATE: "SET_SCHEDULE_VIEW_STATE",
    GET_ALL: makeThunkActionType("SCHEDULES_GET_ALL"),
    PREPARE_LOADING_STATE: "PREPARE_LOADING_STATE",
    FETCH_SHIFT_DETAILS: makeThunkActionType("FETCH_SHIFT_DETAILS"),
};
