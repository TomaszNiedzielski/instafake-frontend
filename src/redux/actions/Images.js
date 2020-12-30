import { ApiUrl, ApiUrlStorage } from "../../constans/ApiUrl";

export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const GET_IMAGES_OF_SPECIFIC_USER = 'GET_IMAGES_OF_SPECIFIC_USER';

export const uploadImage = (image, endpoint) => {
    return async (dispatch, getState) => {
        const { token } = getState().user;
        if(!endpoint) {
            console.log("no endpoint - error");
        }
        await fetch(image)
        .then(res => res.blob())
        .then(res => {
            image = res;
        });

        let formData = new FormData();
        formData.append('image', image);
        fetch(ApiUrl + endpoint, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token, 
            },
            body: formData
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if(endpoint === "images/upload") {
                dispatch(uploadImageSuccess(responseJson));
            }
            if(endpoint === "avatar/upload") {
                document.getElementsByClassName("user-header__profile-image")[0].src=ApiUrlStorage + responseJson;
            }
        })
        .catch(e => {
            console.log(e);
        });
    }
}

const uploadImageSuccess = image => {
    return {
        type: UPLOAD_IMAGE_SUCCESS,
        payload: {
            image: image
        }
    }
}

export const getImagesOfSpecificUser = userName => {
    return (dispatch) => {
        console.log('get images: ', userName);
        const token = restoreToken();
        console.log('token getImagesOfSpecificUser: ', token);
        fetch(ApiUrl + 'images/load/for-user', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: userName
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            dispatch(getImagesOfSpecificUserSuccess(responseJson));
        })
        .catch(e => {
            console.log(e);
        });
    }
}

const getImagesOfSpecificUserSuccess = images => {
    return {
        type: GET_IMAGES_OF_SPECIFIC_USER,
        payload: {
            images: images
        }
    }
}

const restoreToken = () => {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);

    return user.token;
}