import {isLoggedIn, logout} from "./auth.js"

const hamburgerMenu = document.getElementById("hamburger-toggle")
const nav = document.getElementById("site-nav")
const closeButton = document.getElementById("close-button")

const createPostNavLink = document.getElementById("create-post-navigation")
const createUserNavLink = document.getElementById("create-user-navigation")
const logoutNavLink = document.getElementById("logout-navigation")
const loginNavLink = document.getElementById("login-navigation")

const loggedInGreeting = document.getElementById("greet-user")
const username = localStorage.getItem("username")

//Click hamburger icon, .open class is added to the hamburger menu
//Hamburger menu is displayed/opened
hamburgerMenu.addEventListener("click", ()=>{
    nav.classList.toggle("open")
})

//Close-button click removes .open class (this hides the hamburger menu)
closeButton.addEventListener("click", ()=>{
    nav.classList.remove("open")
})

//Close hamburger menu automatically when screen-size gets >= 768px
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    nav.classList.remove("open");
  }
});

//Hide or display nav-links depending on if a user is logged in or not
if (isLoggedIn()){
  createPostNavLink.classList.remove("hidden")
  logoutNavLink.classList.remove("hidden")
  loginNavLink.classList.add("hidden")
  createUserNavLink.classList.add("hidden")

  if(loggedInGreeting && username){
    loggedInGreeting.textContent = `Hello, ${username}!`
  }
}else{
  createPostNavLink.classList.add("hidden")
  logoutNavLink.classList.add("hidden")
  loginNavLink.classList.remove("hidden")
  createUserNavLink.classList.remove("hidden")
}

logoutNavLink.addEventListener("click", (e) =>{
  e.preventDefault()
  logout()
})