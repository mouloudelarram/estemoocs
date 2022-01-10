let list = document.querySelector(".list > div");
let tree = new Array();
let link = "http://este.ovh/moocs/";
let Stack = new Array();
let linkVideo = "http://este.ovh/moocs/AI/Advanced%20Machine%20Learning%20Specialization/01-intro-to-deep-learning/01_introduction-to-optimization/01_specialization-promo/01_about-the-university.mp4";
let lastIdVideo = "01_about-the-university.mp4";
function getTree(adresse){
    let rqst = new XMLHttpRequest();
    list.innerHTML = "<center><div class=\"loading loading--full-height\"></div></center>";
    rqst.open("POST",adresse);
    rqst.onload = function(){
        
        if (rqst.status == 200 && rqst.readyState==4){
            tree = JSON.parse(rqst.response);
            fillOnList(tree);
        }
        
    }
    rqst.send();
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
            if (element.id.endsWith(".mp4")){
                
                document.querySelector("video").setAttribute('src',link+"/"+element.id);
                document.querySelector("video").muted = false;
                document.querySelector("video").autoplay = true;
                document.querySelector(".video > div >h3").innerHTML =  element.id;
                //console.log(linkVideo);
                lastIdVideo = element.id;  
                linkVideo = link+element.id;
                getLikes(linkVideo)
            }      
            else if (!(element.id).includes("/") && (element.id).localeCompare(".mp4") ){
                getLikes(linkVideo);
                console.log(2);
             
            }   
            else{
                paths.push(element.id.slice(0,element.id.length-1));
                var item= {
                    list : tree,
                    ads: link
                };
                Stack.push(item);
                document.querySelector(".list>h3").innerHTML = element.id.slice(0,element.id.length-1);
                link+=element.id;         
                tree=tree[element.id];
                getTree(`./root.php?root=${link}`);

            }
        });
    });
}
document.querySelector("h4").addEventListener("click",()=>{
    
    if(paths.length!=1)
    {
        paths.pop();
        document.querySelector(".list>h3").innerHTML = paths[paths.length-1];
    }
    

    if (Stack.length >0 ){
        let ob = Stack.pop();
        tree = ob.list;
        fillOnList(tree);
        link = ob.ads;
    }     
})
getTree("./root.php");

function getLikes(adresse)
{
    let rqst = new XMLHttpRequest();
    let status;
    rqst.open("POST","checkLikes.php");
    //console.log(linkVideo);
    rqst.onload = function(){
           status = rqst.responseText;
           if(status==="like")
           {
                like.style.color ="#02b3e4";
                dislike.style.color ="grey";
           }else if(status==="dislike")
           {
                like.style.color ="grey";
                dislike.style.color ="#02b3e4";
           }else{
            like.style.color ="grey";
            dislike.style.color ="grey";
           }
    }
    rqst.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    rqst.send("requested=yes&video="+adresse);
   
}
