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

getTree("./tools/root.php"); 
