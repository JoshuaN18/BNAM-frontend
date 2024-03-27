import axios from 'axios'
import { BASE_URL } from '../../../utils/Api'

export function authenticate(data: FormData) {
    const url = `${BASE_URL}/auth/token/`
    const body = {
        username: data.get("username"),
        password: data.get("password"),
    }
    console.log(body)

    return axios.post(url, body, {
        headers:{
            "Content-Type": "application/json",
        }
    }).then((response) =>{
        return response;
    }).catch((error)=>{
        return error.response;
    })
}

export function register(data: FormData) {
    const url = `${BASE_URL}/auth/signup/`
    const body = {
        username: data.get("username"),
        password: data.get("password"),
        confirm_password: data.get("confirm_password"),
        email: data.get("email"),
    }

    return axios.post(url, body, {
        headers:{
            "Content-Type": "application/json",
        }
    }).then((response) =>{
        return response;
    }).catch((error)=>{
        return error.response;
    })
}

export function refreshToken(refreshToken: string) {
    const url = `${BASE_URL}/auth/token/refresh/`
    const body = {
        refresh: refreshToken
    }

    return axios.post(url, body, {
        headers:{
            "Content-Type": "application/json",
        }
    }).then((response) => {
        return response
    }).catch((error)=>{
        return error.response;
    })
}