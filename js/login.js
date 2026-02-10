import {BASE_API_URL} from "./api.js"

const AUTH_LOGIN_URL = `${BASE_API_URL}/auth/login`
const loginForm = document.getElementById("login-form")

loginForm.addEventListener("submit", function(event){
    event.preventDefault()
} )