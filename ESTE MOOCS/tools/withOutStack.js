let list = document.querySelector(".list > div");

let Stack = new Array();

//The Welcome video:
let linkVideo = "http://este.ovh/moocs/AI/Advanced%20Machine%20Learning%20Specialization/01-intro-to-deep-learning/01_introduction-to-optimization/01_specialization-promo/01_about-the-university.mp4";
getLikes(linkVideo)


let lastIdVideo = "01_about-the-university.mp4";
let path = "../M-learn";
function getTree(adresse){
    let rqst = new XMLHttpRequest();
    list.innerHTML = "<center><div class=\"loading loading--full-height\"></div></center>";
    rqst.open("POST","./tools/root.php/");
    rqst.onload = function(){
            path=adresse;
            tree = JSON.parse(rqst.responseText);

            fillOnList(tree);        
    }
    rqst.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    rqst.send("nextLink="+path);
};

function fillOnList(tree){
    list.innerHTML =  "";
    for (item in tree){
        list.innerHTML += `
            <div id="${item}" name="" class="item">
                <div class="icon">+</div>
                <div class="title">${item}</div>
            </div>`;
    };
    linkTolesson();
}
let paths =["Cours disponibles"];
function linkTolesson(){
    document.querySelectorAll(".item").forEach(element => {
        element.addEventListener("click",()=>{
            reachedFirst=false; 
            if (element.id.endsWith(".mp4")){
                
                linkVideo=(path.slice(3,path.length)+"/"+element.id);

                document.querySelector("video").setAttribute('src',linkVideo);
                document.querySelector("video").muted = false;
                document.querySelector("video").autoplay = true;
                changeTitle(linkVideo);

                lastIdVideo = linkVideo;
                changeSessionVideo(lastIdVideo,element.id); 
                getLikes(linkVideo)
            }      
             
            else{
                paths.push(element.id);
                document.querySelector(".list>h3").innerHTML = element.id;
                console.log(path);
                path+="/"+element.id;
                console.log(path);         
                getTree(path);
            }
        });
    });
}
let reachedFirst=false;
document.querySelector("h4").addEventListener("click",()=>{
    
    if(paths.length!=1)
    {
        paths.pop();
        document.querySelector(".list>h3").innerHTML = paths[paths.length-1];
    }
    
    if (paths.length!=0 ){
        if (!(paths.length==1)) path=path.slice(0,path.lastIndexOf("/"));
        else if(!reachedFirst){
            path=path.slice(0,path.lastIndexOf("/"));
            reachedFirst=true;
        }      
    }
    
    getTree(path);
})
getTree(path);

function getLikes(adresse)
{
    let rqst = new XMLHttpRequest();
    let status;
    rqst.open("POST","./tools/checkLikes.php");
    rqst.onload = function(){
           status = JSON.parse(rqst.responseText);
           if(status['check']==="like")
           {
                like.style.color ="#02b3e4";
                dislike.style.color ="grey";
           }else if(status['check']==="dislike")
           {
                like.style.color ="grey";
                dislike.style.color ="#02b3e4";
           }else{
            like.style.color ="grey";
            dislike.style.color ="grey";
           }
           like.innerHTML=status['likes'];
           dislike.innerHTML=status['dislikes'];

    }
    rqst.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    rqst.send("requested=yes&video="+adresse);
   
}


function changeTitle(ID)
{
    document.querySelector(".video > div >h3").innerHTML =  ID.slice(ID.indexOf("/")+1,ID.length).replaceAll("/", "<span style='color:#0bc099'>&#10148</span>"); 
};


function changeSessionVideo(linkID,vidTitle)
{
    let rqst = new XMLHttpRequest();
    let status;
    rqst.open("POST","./stack.php");
   
    rqst.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    rqst.send("lastVideoID="+linkID+"&lastTitleVid="+vidTitle);
}
let v = document.querySelector("video").getAttribute("src");
console.log(v);
getLikes(v);
changeTitle(v)
