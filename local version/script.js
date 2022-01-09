let list = document.querySelector(".list > div");
let tree;
let link = "./M-learn"; // or ./moocs/...
let Stack = new Array();

function getTree(adresse){
    let rqst = new XMLHttpRequest();
    rqst.open("POST",adresse);
    rqst.onload = function(){
        tree = JSON.parse(rqst.response);
        fillOnList(tree);
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
                document.querySelector(".video > div >h3").innerHTML =  element.id;
            }                
            else{
                document.querySelector(".list>h3").innerHTML = element.id;
                var item= {
                    list : tree,
                    ads: link
                };
                link+="/"+element.id;
                Stack.push(item);
                tree=tree[element.id];
                fillOnList(tree);
            }
        });
    });
}

document.querySelector("h4").addEventListener("click",()=>{
    if (Stack.length != 0){
        let ob = Stack.pop()
        tree = ob.list;fillOnList(tree);
        link = ob.ads;
    }
        
})

getTree("./root.php");