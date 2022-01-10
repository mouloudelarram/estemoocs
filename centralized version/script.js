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
    if (tableDisLikes.indexOf(linkVideo) != -1){
        let temp = new Array();
        tableDisLikes.forEach(element => {
            if (element.localeCompare(linkVideo) != 0)
                temp.push(element);
        });
        tableDisLikes = temp;
    }
    if (tableLikes.indexOf(linkVideo) == -1){
        tableLikes.push(linkVideo);
    }
        
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
    if (tableLikes.indexOf(linkVideo) != -1){
        let temp =  new Array();
        tableLikes.forEach(element => {
            if (element.localeCompare(linkVideo) != 0)
                temp.push(element);
        });
        tableLikes = temp;
    }
    if (tableDisLikes.indexOf(linkVideo) == -1)
        tableDisLikes.push(linkVideo);
});

function sendVote(video,vote)
{
    let rqst = new XMLHttpRequest();
    let status;
    rqst.open("POST","checkLikes.php");
    
    rqst.onload = function(){
           console.log(rqst.responseText);
    }
    rqst.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    rqst.send("video="+video+"&vote="+vote);
}
/*document.querySelector(".stack").addEventListener("click",()=>{
    let links= "./index.php?stack="+Stack.length+"&";
    let i=0;
    if (Stack.length>0){
        for (i; i<Stack.length;i++){
            links += "link"+i+"="+Stack[i].ads+"&";
        }
        links += "link"+i+"="+link+"&"+"video="+linkVideo+"&";
    }
    if (tableDisLikes.length>0){
        links += "dislike="+tableDisLikes.length+"&";
        for (i =0; i<tableDisLikes.length;i++){
            links += "dislike"+i+"="+tableDisLikes[i]+"&";
    }}
    if (tableLikes.length>0){
        links += "like="+tableLikes.length+"&";
        for (i =0; i<tableLikes.length;i++){
            links += "like"+i+"="+tableLikes[i]+"&";
    }}
    location.replace(links);
    if (Stack.length <=0 && tableDisLikes.length <=0 && tableLikes.length<=0){
        location.replace('./index.php');
    }
    
});*/