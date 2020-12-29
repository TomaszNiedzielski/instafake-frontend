import { LOG_OUT, REGISTER_OR_LOGIN_SUCCESS, SET_USER_DATA } from "../actions/User";

const initialState = {};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_OR_LOGIN_SUCCESS:
        case SET_USER_DATA:
            return action.payload.user;
        case LOG_OUT:
            return {};
        default:
            return state;
    }
}
export default userReducer;