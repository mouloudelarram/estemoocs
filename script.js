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
});


document.querySelector(".stack").addEventListener("click",()=>{
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
    
});