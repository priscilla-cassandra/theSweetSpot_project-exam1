import { BLOG_POSTS_URL } from "./api.js";
const thumbnailContainer = document.getElementById("thumbnail-container")
thumbnailContainer.classList.add("thumbnail-grid")


async function getBlogPostThumbnail(){
    try{
        const response = await fetch(BLOG_POSTS_URL)
        
        if(!response.ok){
            throw new Error(result?.errors?.[0].message || response.status)
        }
        
        const result = await response.json()
        const blogPosts = result.data
        
        console.log(result)

        

        //if(blogPosts.length === 0){
            //thumbnailContainer.innerHTML = `<p> No posts yet! We are working on it`
        //}

        blogPosts.forEach(function(post){
            
            const thumbnailCard = document.createElement("a")
            thumbnailCard.href = `/post/index.html?id=${post.id}`
            thumbnailCard.classList.add("thumbnail")

            const imgContainer = document.createElement("div")
            imgContainer.classList.add("img-container")
            thumbnailCard.appendChild(imgContainer)

            const thumbnailImage = document.createElement("img")
            thumbnailImage.src = post.media?.url
            imgContainer.appendChild(thumbnailImage)

            const thumbnailHeading = document.createElement("h3")
            thumbnailHeading.textContent = post.title
            thumbnailCard.appendChild(thumbnailHeading)

            const heartIcon = document.createElement("i")
            heartIcon.classList.add("fa-solid", "fa-heart", "likes")

            const likes = document.createElement ("p")
            const likeCount = Math.floor(Math.random()* 100 + 10)
            likes.append(heartIcon, ` ${likeCount} likes`)
            thumbnailCard.appendChild(likes)

            thumbnailContainer.appendChild(thumbnailCard)

        })

    } catch(error){
        thumbnailContainer.textContent = "Could not fetch blog posts"
    }
}

getBlogPostThumbnail()