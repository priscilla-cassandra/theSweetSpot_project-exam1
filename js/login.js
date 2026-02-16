import {AUTH_LOGIN_URL} from "./api.js"
import {logout} from "./auth.js"

const loginForm = document.getElementById("login-form")
const loginMessageDisplay = document.getElementById("login-error")

async function logInUser (loginDetails){
    loginMessageDisplay.textContent= "" //Resets the error/success message
    loginMessageDisplay.className= "" //Resets the styling of the error/success message

    try{
        const options ={
            method: "POST",
            body: JSON.stringify(loginDetails),
            headers: {
                "Content-Type": "application/json",
            }
        }

        const response = await fetch(AUTH_LOGIN_URL, options)
        const result = await response.json()

        if(!response.ok){
            console.log(result)
            throw new Error(result?.errors?.[0].message || response.status) //If response is not okay, show error msg
        }

        //If response is OK, do this:
        const {name, accessToken} = result.data //Destructure the data object to extract properties
        localStorage.setItem("accessToken", accessToken) //Save properties to localStorage
        localStorage.setItem("username", name)

        loginMessageDisplay.textContent = "Login successfull! Redirecting..."
        loginMessageDisplay.classList.add("success-message")

        setTimeout(()=>{
            window.location.href = "../index.html"
        }, 1500)


    }catch(error){
        loginMessageDisplay.textContent  = error.message
        loginMessageDisplay.classList.add("error-message")
    }
}

function onLoginFormSubmit(event){
event.preventDefault()
const formData = new FormData(event.target) //event.target = the form that was submitted. FormData collects all the values from the input fields in the form
const formFields = Object.fromEntries(formData) //Object.fromEntries turns FormData into a JavaScript Object
logInUser(formFields)
}

loginForm.addEventListener("submit", onLoginFormSubmit)

