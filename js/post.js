import { BLOG_POSTS_URL} from "./api.js"
import { getAccessToken, isLoggedIn } from "./auth.js"

//Run this first to check logged-in status
getAccessToken()
isLoggedIn()

const params = new URLSearchParams(window.location.search)
const id = params.get("id")
const url = `${BLOG_POSTS_URL}/${id}`
const editButton = document.getElementById("edit-button")
const recipeLink = document.getElementById("recipe-link")

async function fetchSingleBlogPost(){
    try{
        const response = await fetch(url)
        const result = await response.json()

         if(!response.ok){
            throw new Error(result?.errors?.[0].message || response.status)
        }

        const blogPost = result.data 
        document.getElementById("post-image").src = blogPost.media.url
        document.getElementById("post-title").textContent = blogPost.title
        document.getElementById("post-date").textContent = new Date(blogPost.created).toLocaleDateString()
        document.getElementById("post-author").textContent = blogPost.author.name
        
        const blogpostParagraphs = blogPost.body.split("---INSTRUCTIONS---") 

        document.getElementById("post-ingredients").textContent = blogpostParagraphs[0].trim()
        document.getElementById("post-instructions").textContent = blogpostParagraphs[1].trim()

        if(isLoggedIn() && localStorage.getItem("username") === blogPost.author.name){
            editButton.classList.remove("hidden")
            
            editButton.addEventListener("click", ()=>{
            window.location.href= `../post/edit.html?id=${blogPost.id}`
        })
        }

    }catch(error){
        console.error(error)
    }
}

recipeLink.addEventListener("click", function(){
    navigator.clipboard.writeText(window.location.href)
    const successMessage = document.getElementById("link-copied-message")
    successMessage.classList.add("success-message")
    successMessage.classList.remove("copy-hidden")
    successMessage.classList.add("copy-visible")

    setTimeout(() =>{
        successMessage.classList.remove("copy-visible")
        successMessage.classList.add("copy-hidden")
    }, 2000)
} )

fetchSingleBlogPost()