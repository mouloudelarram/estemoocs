let list = document.querySelector(".list > div");
let tree = new Array();
let link = "http://este.ovh/moocs/";
let Stack = new Array();
let treeStack = new Array();
let linkVideo = "http://este.ovh/moocs/AI/Advanced Machine Learning Specialization/01-intro-to-deep-learning/01_introduction-to-optimization/01_specialization-promo/01_about-the-university.mp4";
let lastIdVideo = "01_about-the-university.mp4";
let index = 1;
let paths =["ESTE MOOCS"];
function fillOnList(tree){
    list.innerHTML =  "";
    for (item in tree){
        list.innerHTML += `
            <div id="${item}" name="" class="item">
                <div class="icon">+</div>
                <div class="title">${item.replaceAll("_"," ")}</div>
            </div>`;
    };
    linkTolesson()
}


function linkTolesson(){
    document.querySelectorAll(".item").forEach(element => {
        element.addEventListener("click",()=>{    
            if (element.id.includes(".mp4")){
                document.querySelector("video").setAttribute('src',link+element.id);
                document.querySelector("video").muted = false;
                document.querySelector("video").autoplay = true;
                document.querySelector(".video > div >h3").innerHTML =  element.id;
                lastIdVideo = element.id;
                linkVideo = link+element.id;
            }      
            else if (!(element.id).includes("/") && (element.id).localeCompare(".mp4") ){
                open(`${link}/${element.id}`);
            }   
            else{
                paths.push(element.id.slice(0,element.id.length-1));
                var item= {
                    list : tree,
                    ads: link
                };
                Stack.push(item);
                let infotemp = element.id.replaceAll("_"," ");
                document.querySelector(".list>h3").innerHTML =  infotemp;
                link+=element.id;    
                lastId =element.id;           
                tree=tree[element.id];
                getTree(`./tools/root.php?root=${link}`);

            }
            sendLinks();
            getNumberOfLikes(linkVideo);
            checkStatus(linkVideo);
            lastVideo();
        });
    });
}

document.querySelector("h4").addEventListener("click",()=>{
    if(paths.length!=1){
        paths.pop();
        document.querySelector(".list>h3").innerHTML = paths[paths.length-1];
    }
    if (Stack.length >0 ){
        let ob = Stack.pop();
        tree = ob.list;
        fillOnList(tree);
        link = ob.ads;
    }
    sendLinks();
        
})

/* send links (stack) and video by ajax to index to fill on session */
function sendLinks(){
    let reqst = new XMLHttpRequest();
    reqst.open("POST","./index.php");

    let links= "stack="+(Stack.length+1)+"&"+"video="+linkVideo+"&";
    let i=0;
    if (Stack.length>0){
        for (i; i<Stack.length;i++){
            links += "link"+i+"="+Stack[i].ads+"&";
        } 
    }
    links += "link"+i+"="+link+"&";

    reqst.onload = function(){
        //console.log("links send");
    }    
    reqst.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    reqst.send(links);
}













/* dislike and like */
like = document.querySelectorAll(".like_dislike > i")[0];
dislike = document.querySelectorAll(".like_dislike > i")[1];
likeStatus = false;
dislikeStatus = false;

like.addEventListener("click",()=>{
    (likeStatus)? sendStatus(linkVideo) : sendLike(linkVideo);

    /* fixe */
    likeStatus =!likeStatus;
    if (dislikeStatus)
        dislikeStatus = false;
    changeColor()
})

dislike.addEventListener("click",()=>{
    (dislikeStatus)? sendStatus(linkVideo) : sendDisLike(linkVideo);
    /* fixe */
    dislikeStatus =!dislikeStatus;
    if (likeStatus)
        likeStatus = false;
    changeColor();
})

function changeColor(){
    if (likeStatus === true)
        like.style.color = "#02b3e4";
    else 
        like.style.color = "gray";
    if (dislikeStatus === true)
        dislike.style.color = "crimson";
    else
        dislike.style.color = "gray";
}

/* get number of likes and dislikes */

function getNumberOfLikes(video){
    let reqst = new XMLHttpRequest();
    reqst.open("POST","./tools/videos.php");
    reqst.onload = function(){
        if (reqst.readyState == 4 && reqst.status == 200){
            let data = JSON.parse(reqst.response);
            /* affiche numbers */
            if (data[0] != null)
                InfoVideo(data[0]['likes'], data[0]['dislikes'])
            else 
                InfoVideo(0, 0);
        }
    }
    reqst.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    reqst.send("video="+video+"&");
}

/* send like to database */

function sendLike(video){
    let reqst = new XMLHttpRequest();
    reqst.open("POST","./tools/like.php");
    reqst.onload = function(){
        //console.log("send Like");
        getNumberOfLikes(linkVideo);
    }
    reqst.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    reqst.send("video="+video+"&like=like");
}
/* sendLike(linkVideo); */

/* send dislike to database */

function sendDisLike(video){
    let reqst = new XMLHttpRequest();
    reqst.open("POST","./tools/dislike.php");
    reqst.onload = function(){
        /* console.log("send disLike"); */
        getNumberOfLikes(linkVideo);
    }
    reqst.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    reqst.send("video="+video+"&dislike=dislike");
}
/* sendDisLike(linkVideo); */

/* send status = null to database */

function sendStatus(video){
    let reqst = new XMLHttpRequest();
    reqst.open("POST","./tools/like.php");
    reqst.onload = function(){
       /*  console.log("send status"); */
        getNumberOfLikes(linkVideo);
    }
    reqst.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    reqst.send("video="+video+"&like=null");
}
/* sendStatus(linkVideo) */

/* show info video (number of like and number of dislike) */
function InfoVideo(likes, dislikes){
    document.querySelectorAll(".like_dislike > h6")[0].innerHTML = likes;
    document.querySelectorAll(".like_dislike > h6")[1].innerHTML = dislikes;
}

/* check if this user liked or disliked this video */

function checkStatus(video){
    let reqst = new XMLHttpRequest();
    reqst.open("POST","./tools/checkStatus.php");
    reqst.onload = function(){
        if (reqst.readyState == 4 && reqst.status == 200){
            let data = JSON.parse(reqst.response);
            if (data[0] != null){
                if (data[0][0] == "like")
                    likeStatus = true;
                else
                    likeStatus = false;
                if ((data[0][0] == "dislike"))
                    dislikeStatus = true;
                else
                    dislikeStatus = false;
            }
            else{
                likeStatus = false;
                dislikeStatus = false;
            }
            changeColor();
        }
    }
    reqst.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    reqst.send("video="+video+"&");
}
checkStatus(linkVideo);

/* get the last video */

function lastVideo(){
    let reqst = new XMLHttpRequest();
    reqst.open("POST","./tools/stack.php");
    reqst.onload = function(){
        if (reqst.readyState == 4 && reqst.status == 200){
            let data = JSON.parse(reqst.response);
            if (data != null){
                data = data.shift()
                linkVideo = data;
                getNumberOfLikes(linkVideo);
                checkStatus(linkVideo);
            }
            else{
                getNumberOfLikes(linkVideo);
                checkStatus(linkVideo);
            }
        }
    }
    reqst.send();
}
lastVideo();