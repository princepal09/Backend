import { VITE_BASE_URL } from "../config/secrets.config"
export const AUTH_ENDPOINTS = {
    LOGIN_API : VITE_BASE_URL + "/auth/login",
    SIGNUP_API : VITE_BASE_URL + "/auth/signup",
    LOGOUT_API : VITE_BASE_URL + "/auth/logout",
    GET_ME_API : VITE_BASE_URL + "/auth/me"
}