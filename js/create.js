import {getAccessToken, isLoggedIn, siteAuthentication } from "./auth.js"
import {BLOG_POSTS_URL} from "./api.js"
isLoggedIn()
getAccessToken()
siteAuthentication()

const createPostUrl = BLOG_POSTS_URL
const createPostForm = document.getElementById("new-post")
console.log(createPostForm)

async function createNewBlogPost(blogpostInput){
    const accessToken = getAccessToken() //Store current accessToken in variable
    
    try{
        const options = {
            method: "POST",
            body: JSON.stringify(blogpostInput),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        }

        const response = await fetch (createPostUrl)
        const result = await response.json()

        if(!response.ok){
            throw new Error(result?.errors?.[0].message || response.status)
        }


    }catch(error){

    }
}


function publishBlogPost(event){
    event.preventDefault()
    const formData = new FormData(event.target) //event.target = the form that was submitted. FormData collects all the values from the input fields in the form
    const formFields = Object.fromEntries(formData) //Object.fromEntries turns FormData into a JavaScript Object
    createNewBlogPost(formFields)
}

createPostForm.addEventListener("submit", publishBlogPost)