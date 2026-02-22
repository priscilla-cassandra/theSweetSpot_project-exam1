//Gets the accesToken saved in local storage when user is logged in
export function getAccessToken(){
    return localStorage.getItem("accessToken")
}

//Checks if there is an accessToken (if a user is logged in)
export function isLoggedIn(){
    return !!getAccessToken() //Return "true" if there is an accessToken, return "false" if there is no accessToken
}

//If there is no user logged in, redirect to login-page
export function siteAuthentication(){
    if(!isLoggedIn()){
        window.location.href = "../account/login.html"
    }
}

//When user logs out
export function logout(){
    localStorage.removeItem("accessToken")
    localStorage.removeItem("username")

    //This makes logout link work on both LiveServer and Github pages
    const isGithubPages = window.location.hostname.includes("github.io")
    if(isGithubPages){
        window.location.replace("/theSweetSpot_project-exam1/") //This alone did not work on LiveServer
    }else{
        window.location.replace("/") //This alone did not work on github pages
    }
}