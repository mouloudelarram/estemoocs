let list = document.querySelector(".list > div");
let tree = new Array();
let link = "http://este.ovh/moocs/";
let Stack = new Array();
let treeStack = new Array();
let linkVideo = "http://este.ovh/moocs/AI/Advanced Machine Learning Specialization/01-intro-to-deep-learning/01_introduction-to-optimization/01_specialization-promo/01_about-the-university.mp4";
let lastIdVideo = "01_about-the-university.mp4";
let index = 1;

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
                blueLike(linkVideo);
                blueLikeDataBase(linkVideo);
                getNumberLikes(linkVideo);
                getNumberDisLikes(linkVideo);
            }      
            else if (!(element.id).includes("/") && (element.id).localeCompare(".mp4") ){
                open(`${link}/${element.id}`);
            }   
            else{
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
        });
    });
}

document.querySelector("h4").addEventListener("click",()=>{
    if (Stack.length >0 ){
        let ob = Stack.pop();
        tree = ob.list;
        fillOnList(tree);
        link = ob.ads;
    }
        
})

/* dislike and like */

let like = document.querySelectorAll('.like_dislike>i')[0];
let dislike = document.querySelectorAll('.like_dislike>i')[1];
let tableLikes = new Array();
let tableDisLikes = new Array();

like.addEventListener("click",()=>{
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
    blueLike(linkVideo);
        
});

dislike.addEventListener("click",()=>{
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
    blueLike(linkVideo);
});

document.querySelector(".stack").addEventListener("click",()=>{
    console.log(linkVideo)
    let links= "./index.php?stack="+(Stack.length+1)+"&"+"video="+linkVideo+"&";;
    let i=0;
    if (Stack.length>0){
        for (i; i<Stack.length;i++){
            links += "link"+i+"="+Stack[i].ads+"&";
        } 
    }
    links += "link"+i+"="+link+"&";
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
});


function blueLike(video){
    if (tableLikes.includes(video))
        like.style.color = "#02b3e4";
    else
        like.style.color = "gray";
    if (tableDisLikes.includes(video))
        dislike.style.color = "crimson";
    else
        dislike.style.color = "gray";
}


/* like dislike from databse */
let videos = new Array();


function getVideos(adresse){
    let rqst = new XMLHttpRequest();
    rqst.open("POST",adresse);
    rqst.onload = function(){
        if (rqst.status == 200 && rqst.readyState == 4){
            videos = JSON.parse(rqst.response);
            if (videos != null){
                blueLikeDataBase(linkVideo);
            }
        }
    }
    rqst.send();
};

getVideos("./tools/videos.php"); 
 

function blueLikeDataBase(video){
    if (videos != null){
        videos.forEach(index=>{
            if (index[2] == video){
                if (index[3] == "like")
                    tableLikes.push(index[2]);
                else 
                    tableDisLikes.push(index[2]);
            }
            
        })
        blueLike(video);
    }
}

let NumberLikes = new Array();

function getLikes(adresse){
    let rqst = new XMLHttpRequest();
    rqst.open("POST",adresse);
    rqst.onload = function(){
        if (rqst.status == 200 && rqst.readyState == 4){
            NumberLikes = JSON.parse(rqst.response);
            if (NumberLikes != null){
                getNumberLikes(linkVideo)
            }
        }
    }
    rqst.send();
};

getLikes("./tools/like.php"); 

function getNumberLikes(video){
    let found = false;
    if (NumberLikes != null){
        NumberLikes.forEach(index=>{
            if (index[0] == video){
                console.log("like")
                document.querySelectorAll(".like_dislike > h6")[0].innerHTML = index[1];
                tableLikes.push(index[0]);
                //blueLike(video);
                found = true;
            }
        })
    }
    if (found == false)
        document.querySelectorAll(".like_dislike > h6")[0].innerHTML = '0';
    
}



let NumberDisLikes = new Array();

function getDisLikes(adresse){
    let rqst = new XMLHttpRequest();
    rqst.open("POST",adresse);
    rqst.onload = function(){
        if (rqst.status == 200 && rqst.readyState == 4){
            NumberDisLikes = JSON.parse(rqst.response);
            if (NumberDisLikes != null){
                getNumberDisLikes(linkVideo);
            }
        }
    }
    rqst.send();
};

getDisLikes("./tools/dislike.php"); 

function getNumberDisLikes(video){
    let found = false;
    if (NumberDisLikes != null){
        NumberDisLikes.forEach(index=>{
            if (index[0] == video){
                console.log("dislike")
                document.querySelectorAll(".like_dislike > h6")[1].innerHTML = index[1];
                found = true;
                tableDisLikes.push(index[0]);
                //blueLike(video);
            }
        })
    }
    if (found == false)
        document.querySelectorAll(".like_dislike > h6")[1].innerHTML = '0';
    
}