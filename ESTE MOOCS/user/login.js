document.querySelector("header > img").addEventListener("click",()=>{
    location.replace("../");
})
document.querySelector("header > h3").addEventListener("click",()=>{
    location.replace("../");
})
document.querySelectorAll(".item").forEach(element=>{
    element.addEventListener("mouseover",element.querySelector(".minus").addEventListener("click",e=>{
        let l = element.querySelector("video").getAttribute("src").slice(3,element.querySelector("video").getAttribute("src").length);
        sendVote2(l, "like");
        location.reload();
    }))
})
function sendVote2(video,vote)
{
    let rqst = new XMLHttpRequest();
    let status;
    rqst.open("POST","../tools/checkLikes.php");
    
    rqst.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    rqst.send("video="+video+"&vote="+vote);
}

document.querySelector(".ForgotPassword").addEventListener("click",()=>{
    //ouvrir gmail pour contacter l'administrateur
    open("https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=administrateur@gmail.com");
})
