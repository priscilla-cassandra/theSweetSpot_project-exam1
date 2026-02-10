import {BASE_API_URL} from "./api.js"

const AUTH_REGISTER_URL = `${BASE_API_URL}/auth/register`

const registerForm = document.getElementById("register-form")
const errorMessageDisplay = document.getElementById("auth-error")

async function registerUser(userDetails){
    try{
        const options = {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(AUTH_REGISTER_URL, options)
        const result = await response.json()
        if(!response.ok){
            console.log(result)
            throw new Error(result?.errors?.[0].message || response.status)
        }
        
        const registerUser = result.data
        console.log(response)
    }catch(error){
        errorMessageDisplay.textContent = error.message
    }
}

function onRegisterFormSubmit(event){
event.preventDefault()
const formData = new FormData(event.target)
const formFields = Object.fromEntries(formData)
registerUser(formFields)
}

registerForm.addEventListener("submit", onRegisterFormSubmit)



