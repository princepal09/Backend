const BASE_URL = import.meta.env.VITE_BASE_URL;


export const auth = {
    LOGIN_API : BASE_URL + `/auth/login`,
    SIGNUP_API : BASE_URL + `/auth/signup`,
    AUTH_CHECK_API : BASE_URL + `/auth/check`,
    LOGOUT_API : BASE_URL + `/auth/logout`,
    PROFILE_UPDATE_API : BASE_URL + `auth/update-profile`
}