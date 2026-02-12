const hamburgerMenu = document.getElementById("hamburger-toggle")
const nav = document.getElementById("site-nav")
const closeButton = document.getElementById("close-button")

//Click hamburger icon, .open class is added to the hamburger menu
//Hamburger menu is displayed/opened
hamburgerMenu.addEventListener("click", ()=>{
    nav.classList.toggle("open")
})

//Close-button click removes .open class (this hides the hamburger menu)
closeButton.addEventListener("click", ()=>{
    nav.classList.remove("open")
})

//Close hamburger menu when screen-size gets >= 768px
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    nav.classList.remove("open");
  }
});