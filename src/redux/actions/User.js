import { ApiUrl } from '../../constans/ApiUrl';
import history from '../../history';

export const REGISTER_OR_LOGIN_SUCCESS = 'REGISTER_OR_LOGIN_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOG_OUT = 'LOG_OUT';
export const SET_USER_DATA = 'SET_USER_DATA';

export const register = user => {
    return dispatch => {
        console.log(user);
        fetch(ApiUrl + 'auth/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                password: user.password,
                password_confirmation: user.passwordConfirmation
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if(responseJson.user) {
                dispatch(registerOrLoginSuccess(responseJson.user));
            } else {
                console.log(responseJson);
                if(!responseJson) return;
                const errorMessages = JSON.parse(responseJson);
                if(errorMessages.name) {
                    alert(errorMessages.name);
                } else if(errorMessages.email) {
                    alert(errorMessages.email);
                } else if(errorMessages.password) {
                    alert(errorMessages.password);
                }
            }
        })
        .catch(e => {
            console.log(e);
        });
    }
}

export const login = user => {
    return dispatch => {
        fetch(ApiUrl + 'auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            const user = {...responseJson.user, token: responseJson.access_token};
            dispatch(registerOrLoginSuccess(user));
        })
        .catch(e => {
            console.log(e);
        });
    }
}

export const registerOrLoginSuccess = user => {
    console.log('registerOrLoginSuccedsadasdss');

    return async dispatch => {
        console.log('registerOrLoginSuccess');
        localStorage.setItem('user', JSON.stringify(user));
        await dispatch({
            type: REGISTER_OR_LOGIN_SUCCESS,
            payload: {
                user: user
            }
        });
        history.push('/dashboard');
        window.location.reload(true);
    }
}

export const logout = () => {
    return dispatch => {
        dispatch({ type: LOG_OUT });
        localStorage.removeItem('user');
    }
}

/*export const loadInformationAboutUser = userName => {
    return dispatch => {
        console.log('loadInformationAboutUser');
        const token = restoreToken();
        fetch(ApiUrl + 'user/information', {
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
            return responseJson;
        })
        .catch(e => {
            console.log(e);
        });
    }
}*/

export const restoreToken = () => {
    return dispatch => {
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
    
        return user.token;
    }
}