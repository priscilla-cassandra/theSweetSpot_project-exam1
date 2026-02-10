import {BASE_API_URL} from "./api.js"

const AUTH_REGISTER_URL = `${BASE_API_URL}/auth/register`

const registerForm = document.getElementById("register-form")


const options = {
    method: "POST",
    body: "Some data",
    headers: {
        "Content-Type": "application/json"
    }
}