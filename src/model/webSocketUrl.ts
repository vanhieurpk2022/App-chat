export const wssEvent = {
    REGISTER: "REGISTER",
    LOGIN: "LOGIN",
    RE_LOGIN: "RE_LOGIN",
    LOGOUT: "LOGOUT",
    GET_USER_LIST: "GET_USER_LIST",
    CREATE_ROOM: "CREATE_ROOM",
    JOIN_ROOM: "JOIN_ROOM",
    OUT_ROOM: "OUT_ROOM",
    CHAT_PEOPLE_GET_MES: "CHAT_PEOPLE_GET_MES", // type 0 (1-1), type 1 (room)
    SEND_CHAT: "SEND_CHAT",
    CHECK_USER_ONLINE: "CHAT_CHECK_USER_ONLINE",
    CHECK_USER_EXITS: "CHAT_CHECK_USER_EXITS"
}

// check user online và check user exits: ON khác url