import { BASE_API_URL } from "./api";
const thumbnailContainer = document.getElementById("thumbnail-container")

async function getBlogPostThumbnail(){
    try{
        const response = await fetch(BASE_API_URL)
        const result = await response.json()
        const blogPosts = result.data 

        if(!response.ok){
            throw new Error(result?.errors?.[0].message || response.status)
        }

        blogPosts.forEach(function(post){
            const thumbnailCard = document.createElement("a")
            const imgContainer = document.createElement("div")
            const thumbnailImage = document.createElement("img")
            const thumbnailHeading = document.createElement("h3")
            const likes = document.createElement ("p")

            thumbnailCard.textContent = ""//How do I add the link to the entire post?
            thumbnailImage.textContent = post.media 
            thumbnailHeading.textContent = post.title
            likes.textContent = ""//How do I add different numbered likes on different posts?
            //How do I add the heart icon?



        })

    } catch(error){
        thumbnailContainer.textContent = "Could not fetch blog posts"
    }
}