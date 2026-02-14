import {getAccessToken, isLoggedIn, siteAuthentication } from "./auth.js"
import {BLOG_POSTS_URL} from "./api.js"
isLoggedIn()
getAccessToken()
siteAuthentication()

const createPostUrl = BLOG_POSTS_URL
const createPostForm = document.getElementById("new-post")
const publishedMessage = document.getElementById("create-error")

console.log("token:", localStorage.getItem("accessToken"))

async function createNewBlogPost(blogpostInput){
    const accessToken = getAccessToken() //Store current accessToken in variable
    
    try{
        
        const ingredients = blogpostInput.ingredients
        const instructions = blogpostInput.instructions
        //Combine both input fields in the form so they together can be stored in the API body
        const blogPostBody = `## Ingredients
        
        ${ingredients}
        
        ## Instructions

        ${instructions}`

        const blogPostContent = {
            title: blogpostInput.title,
            body: blogPostBody,
            media: {
                url: blogpostInput.imageURL,
                alt: blogpostInput.title
            }
        }
        
        const options = {
            method: "POST",
            body: JSON.stringify(blogPostContent),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        }

        console.log("Payload:", blogPostContent)

        const response = await fetch (createPostUrl, options)
        const result = await response.json()

        if(!response.ok){
            throw new Error(result?.errors?.[0].message || response.status)
        }

        //If blog bost was successfully posted, do this
        publishedMessage.textContent = "Your post was successfully published! Redirecting..."
        publishedMessage.classList.add("success-message")


    }catch(error){
        publishedMessage.textContent = error.message
        publishedMessage.classList.add("error-message")
    }
}


function publishBlogPost(event){
    event.preventDefault()
    const formData = new FormData(event.target) //event.target = the form that was submitted. FormData collects all the values from the input fields in the form
    const formFields = Object.fromEntries(formData) //Object.fromEntries turns FormData into a JavaScript Object
    createNewBlogPost(formFields)
}

createPostForm.addEventListener("submit", publishBlogPost)