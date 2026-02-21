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
    localStorage.removeItem("accessToken") //Remove accessToken
    localStorage.removeItem("username") //Remove username
    window.location.replace = ("/theSweetSpot_project-exam1/") //Redirect to the feed/home page
}