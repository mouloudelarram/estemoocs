let like = document.querySelectorAll('.like_dislike>i')[0];
let dislike = document.querySelectorAll('.like_dislike>i')[1];

let tableLikes = new Array();
let tableDisLikes = new Array();

let pressedLike=false;
let pressedDislike=false;
like.addEventListener("click",()=>{
    if(!pressedLike)
    {
        pressedLike=true;
        like.style.color ="#02b3e4";
        dislike.style.color ="grey";
    }else{
        pressedLike=false;
        like.style.color ="grey";
        dislike.style.color ="grey";
    }
    
    sendVote(linkVideo,"like");
        
});
dislike.addEventListener("click",()=>{
    if(!pressedDislike)
    {
        pressedDislike=true;
        like.style.color ="grey";
        dislike.style.color ="#02b3e4";
        
    }else{
        pressedDislike=false;
        like.style.color ="grey";
        dislike.style.color ="grey";
    }    
    sendVote(linkVideo,"dislike");

});
let fullname = document.querySelector(".userData>.username>h5").innerHTML;
function sendVote(video,vote)
{
    if(fullname === "Anonymous.Anonymous")
    {
        
        if(confirm("Vous ne pouvez pas faire un like ou dislike en tant qu'un guest! Voulez-vous se connecter?"))
        location.replace("./index.php?logout=true");
    }else{
        
        let rqst = new XMLHttpRequest();
        let status;
    rqst.open("POST","./tools/checkLikes.php");

    rqst.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    rqst.send("video="+video+"&vote="+vote);
    getLikes(linkVideo);
    }  
}
