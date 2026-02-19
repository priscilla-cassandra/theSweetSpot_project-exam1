import { BLOG_POSTS_URL } from "./api.js";
const thumbnailContainer = document.getElementById("thumbnail-container")
thumbnailContainer.classList.add("thumbnail-grid")

const params = new URLSearchParams(window.location.search)
const id = params.get("id")

const carouselContainer = document.getElementById("carousel")
const carouselImage = document.getElementById("carousel-post-image")
const nextButton = document.getElementById("next-button")
const previousButton = document.getElementById("back-button")
const viewRecipeButton = document.getElementById("view-recipe-button")
let posts = []
let currentIndex = 0

//----------CAROUSEL----------
async function getThreeLatestPosts(){
    try{
        const response = await fetch(`${BLOG_POSTS_URL}?sort=created&sortOrder=desc&limit=3&page=1`)
        const result = await response.json()

        if(!response.ok){
            throw new Error(result?.errors?.[0].message || response.status)
        }

        return result.data

    }catch(error){
        carouselContainer.textContent = "Unable to load latest recipes. Please try again"
        console.log(error)
    }
}

function renderSlide(){
    const post = posts[currentIndex]
    carouselImage.src = post.media?.url
    carouselImage.alt = post.title
    viewRecipeButton.href = `post/index.html?id=${post.id}`
}

function showCarouselImage(){
    if(currentIndex >= posts.length) currentIndex = 0
    if(currentIndex < 0) currentIndex = posts.length -1
    renderSlide()
}

nextButton.addEventListener("click", ()=>{
    currentIndex++
    showCarouselImage()
})
previousButton.addEventListener("click", ()=>{
    currentIndex --
    showCarouselImage()
})

setInterval(()=>{
    currentIndex++
    showCarouselImage()
}, 3000)

async function startCarousel(){
    posts = await getThreeLatestPosts()

    if(!posts || posts.length === 0)
        return

    currentIndex = 0
    showCarouselImage()
}


//----------THUMBNAIL GRID----------
async function getBlogPostThumbnail(){
    try{
        const response = await fetch(BLOG_POSTS_URL)
        const result = await response.json()

        if(!response.ok){
            throw new Error(result?.errors?.[0].message || response.status)
        }       
        
        const blogPosts = result.data
    
        if(blogPosts.length === 0){
            thumbnailContainer.innerHTML = `<p> No posts yet! We are working on it`
        }

        blogPosts.forEach(function(post){
            
            const thumbnailCard = document.createElement("a")
            thumbnailCard.href = `post/index.html?id=${post.id}`
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
startCarousel()
