function getTree(adresse){
    let rqst = new XMLHttpRequest();
    list.innerHTML = "<center><div class=\"loading loading--full-height\"></div></center>";
    rqst.open("POST",adresse);
    rqst.onload = function(){
        if (rqst.status == 200 && rqst.readyState == 4){
            tree = JSON.parse(rqst.response);
            fillOnList(tree);
            if (treeStack.length>0){
                var item= {
                    list : tree,
                    ads: link
                };
                Stack.push(item);
                link= treeStack[0];
                getTree(`./tools/root.php?root=${treeStack.shift()}`);
                
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
        }
        
    }
    rqst.send();
};

getStack("./tools/stack.php"); 
