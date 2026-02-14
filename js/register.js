import { AUTH_REGISTER_URL } from "./api.js"

const registerForm = document.getElementById("register-form")
const messageDisplay = document.getElementById("auth-error")

async function registerUser(userDetails){
    messageDisplay.textContent= ""
    messageDisplay.className= ""
    
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
        
        //If register is succsessfull
        messageDisplay.textContent = "New user created! You can now log in"
        messageDisplay.classList.add("success-message")
        registerForm.reset() //Reset the form when a new user has been created

        const registeredUser = result.data
        console.log(response)
        console.log(registeredUser)
        
    }catch(error){
        messageDisplay.textContent = error.message
        messageDisplay.classList.add("error-message")
    }
}

function onRegisterFormSubmit(event){
event.preventDefault()
const formData = new FormData(event.target) //event.target = the form that was submitted. FormData collects all the values from the input fields in the form
const formFields = Object.fromEntries(formData) //Object.fromEntries turns FormData into a JavaScript Object
registerUser(formFields)
}

registerForm.addEventListener("submit", onRegisterFormSubmit)



