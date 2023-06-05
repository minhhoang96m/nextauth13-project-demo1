import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api/user'

const BASE_URL_WEB = 'http://localhost:3000/api/'

export const axiosWeb = axios.create({
    baseURL: BASE_URL_WEB,
    headers: {'Content-Type': 'application/json'},
    // withCredentials: true,
})

export default axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
})
export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
})
