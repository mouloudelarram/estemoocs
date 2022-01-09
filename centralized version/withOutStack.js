let list = document.querySelector(".list > div");
let tree = new Array();
let link = "http://este.ovh/moocs";
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

function linkTolesson(){
    document.querySelectorAll(".item").forEach(element => {
        element.addEventListener("click",()=>{    
            if (element.id.includes(".mp4")){
                document.querySelector("video").setAttribute('src',link+"/"+element.id);
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
                var item= {
                    list : tree,
                    ads: link
                };
                Stack.push(item);
                document.querySelector(".list>h3").innerHTML = element.id;
                link+="/"+element.id;         
                tree=tree[element.id];
                getTree(`./root.php?root=${link}`);

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
getTree("./root.php"); 
