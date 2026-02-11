import {AUTH_LOGIN_URL} from "./api.js"

const loginForm = document.getElementById("login-form")
const loginMessageDisplay = document.getElementById("login-error")

async function logInUser (loginDetails){
    loginMessageDisplay.textContent= "" //Resets the error/success message
    loginMessageDisplay.className= "" //Resets the styling of the error/success meddage
}

loginForm.addEventListener("submit", function(event){
    event.preventDefault()
} )