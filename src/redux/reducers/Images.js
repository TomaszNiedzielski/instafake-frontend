import { UPLOAD_IMAGE_SUCCESS, GET_IMAGES_OF_SPECIFIC_USER } from "../actions/Images";

const initialState = [];

const imagesReducer = (state = initialState, action) => {
    let updatedState = [...state];
    switch(action.type) {
        case UPLOAD_IMAGE_SUCCESS:
            updatedState.unshift(action.payload.image);
            return updatedState;
        case GET_IMAGES_OF_SPECIFIC_USER:
            updatedState = updatedState.concat(action.payload.images);
            return updatedState;
        default:
            return state;
    }
}
export default imagesReducer;