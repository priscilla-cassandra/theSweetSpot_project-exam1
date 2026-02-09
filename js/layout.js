const hamburgerMenu = document.getElementById("hamburger-toggle")
const nav = document.getElementById("site-nav")
const closeButton = document.getElementById("close-button")

hamburgerMenu.addEventListener("click", ()=>{
    nav.classList.toggle("open")
})

closeButton.addEventListener("click", ()=>{
    nav.classList.remove("open")
})

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    nav.classList.remove("open");
  }
});