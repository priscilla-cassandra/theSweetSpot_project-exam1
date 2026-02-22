import {getAccessToken, isLoggedIn, siteAuthentication } from "./auth.js"
import { BLOG_POSTS_URL } from "./api.js"
siteAuthentication()
getAccessToken()
isLoggedIn()

const params = new URLSearchParams(window.location.search)
const id = params.get("id")
const url = `${BLOG_POSTS_URL}/${id}`
const deleteButton = document.getElementById("delete-button")
const editForm = document.getElementById("edit-form")

const accessToken = getAccessToken()
const messageDisplay = document.getElementById("edit-message-display")

async function fetchPostToEdit(){
    try{
        const response = await fetch(url)
        const result = await response.json()

        if(!response.ok){
            //If no API error message, show HTTP status number
            throw new Error(result?.errors?.[0].message || response.status)
        }

        const blogPost = result.data
        document.getElementById("edit-imageURL").value = blogPost.media.url 
        document.getElementById("edit-title").value = blogPost.title
    
        const blogPostParagraphs = blogPost.body.split("---INSTRUCTIONS---")
    
        document.getElementById("edit-ingredients").value = blogPostParagraphs[0].trim() || ""
        document.getElementById("edit-instructions").value = blogPostParagraphs[1].trim() || ""

    }catch (error){
        editForm.textContent = "Something went wrong. Could not get post for editing"
        console.log(error.message)
    }
}

//Update blog-post function
async function updateBlogPost (url, data){
    try{
        const options = {
            method: "PUT",
            body: JSON.stringify(data),
            headers:{
                "Content-type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
        }

        const response = await fetch(url, options)
        const result = await response.json()

        if(!response.ok){
            throw new Error(result?.errors?.[0].message || response.status)
        }

        messageDisplay.textContent = "Your post has been updated! Redirecting to post..."
        messageDisplay.classList.add("success-message")

        setTimeout(()=>{
            window.location.href = `../post/index.html?id=${id}`
        }, 1500)

    }catch (error){
        messageDisplay.textContent = error.message
        messageDisplay.classList.add("error-message")
    }
}

//Delete blog-post function
async function deleteBlogPost(url){
    try{
        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }

        const response = await fetch (url, options)

        if(response.status === 204){
            editForm.reset()
            messageDisplay.textContent = "Your post has been deleted. Redirecting to homepage..."
            setTimeout(()=>{
                window.location.href = "../index.html"
            }, 2000)
            return
        }

        if(response.ok){
            const result = await response.json()
            messageDisplay.textContent = "Deletion successful"
            return
        }

        const errorData = await response.json()
        throw new Error(`Failed to delete post: ${JSON.stringify(errorData)}`)
    }catch (error){
        messageDisplay.textContent = error.message
        messageDisplay.classList.add("error-message")
    }
}

function handleUpdateSubmit (event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const formFields = Object.fromEntries(formData)

    //REBUILD THE BODY HERE
    const ingredients = formFields.ingredients
    const instructions = formFields.instructions
    const blogpostBody = `${ingredients}
        
        ---INSTRUCTIONS---

        ${instructions}`

    const blogpostContent = {
        media: {
            url: formFields.imageURL,
            alt: formFields.title
        },
        title: formFields.title,
        body: blogpostBody
    }

    updateBlogPost(url, blogpostContent)
}

editForm.addEventListener("submit", handleUpdateSubmit)
deleteButton.addEventListener("click", ()=> {
    const deleteConfirmation = confirm("Are you sure you want to delete this post?")
    
    if(deleteConfirmation){
        deleteBlogPost(url)
    }
})
fetchPostToEdit()
