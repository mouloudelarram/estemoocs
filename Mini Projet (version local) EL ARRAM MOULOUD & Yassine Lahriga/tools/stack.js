let temp = "./M-learn//";
function getTree(adresse){
    let rqst = new XMLHttpRequest();
    list.innerHTML = "<center><div class=\"loading loading--full-height\"></div></center>";
    rqst.open("POST",adresse);
    rqst.onload = function(){
        if (rqst.status == 200 && rqst.readyState == 4){
            tree = JSON.parse(rqst.response);
            
            if (treeStack.length>0){
                while (treeStack.length>1){
                    treeStack.shift();
                    var item= {
                        list : tree,
                        ads: link
                    };
                    Stack.push(item);
                    link= treeStack[0];
                    let t = link.replace(temp,"");
                    t= t.replaceAll("/","");
                    
                    console.log(t);
                    console.log(link);
                    fillOnList(tree[t]);
                    tree= tree[t];
                    temp = link;
                    //getTree(`./tools/root.php?root=${treeStack.shift()}`);
                    
                }
            }else{
                fillOnList(tree);
            }
        }
    }
    rqst.send();
};

function getStack(adresse){
    let rqst = new XMLHttpRequest();
    list.innerHTML = "<div class=\"loading loading--full-height\"></div>";
    rqst.open("POST",adresse);
    rqst.onload = function(){
        if (rqst.status == 200 && rqst.readyState == 4){
             treeStack = JSON.parse(rqst.response);
            if (treeStack != null){
                let infoVideo =  treeStack.shift();
                document.querySelector("video").setAttribute('src',infoVideo);
                linkVideo = infoVideo;
                infoVideo = "&#10061;  "+infoVideo.replaceAll('http://este.ovh/moocs/','');
                infoVideo = infoVideo.replaceAll('//',' &#10148; ');
                infoVideo = infoVideo.replaceAll('/',' &#10148; ');
                infoVideo = infoVideo.replaceAll('mp4','');
                document.querySelector(".video > div >h3").innerHTML =  infoVideo;
                getTree(`./tools/root.php?root=${treeStack.shift()}`);
            }
            else
                getTree(`./tools/root.php`);
        }
    }
    rqst.send();
};

getStack("./tools/stack.php"); 
