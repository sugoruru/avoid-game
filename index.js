const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const pl = {
    "x":320,
    "y":320,
    "img":undefined,
    "score":0,
    "count":0,
    "time":0
}
const enemy = {
    "x":[],
    "y":[],
    "θ":[],
    "count":0
}
const font = {
    "gameOver":undefined
}
pl["img"]=new Image();
pl["img"].src="https://raw.githubusercontent.com/sugoruru/site-material/main/game/heart.png";
font["gameOver"]=new Image();
font["gameOver"].src="https://raw.githubusercontent.com/sugoruru/site-material/main/font/game%20over.png";
function mainloop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    style();
    pl["count"]++;
    enemy["count"]++;
    img_show();
    enemy_edit();
    enemy_show();
    enemy_move();
    time();
}
window.onkeydown=(function(e){
    if(e.key==="ArrowRight" && pl["x"]<590)pl["x"] += 3;
    if(e.key==="ArrowLeft" && pl["x"]>20)pl["x"] -= 3;
    if(e.key==="ArrowUp" && pl["y"]>20)pl["y"] -= 3;
    if(e.key==="ArrowDown" && pl["y"]<590)pl["y"] += 3;
});
const main = setInterval(mainloop,20);
function img_show(){
    ctx.drawImage(pl["img"],0,0,16,16,pl["x"],pl["y"],32,32);
}
function style(){
    ctx.beginPath();
    ctx.rect(0,0,20,640);
    ctx.fillStyle="#fff";
    ctx.fill();
    ctx.beginPath();
    ctx.rect(620,0,20,640);
    ctx.fillStyle="#fff";
    ctx.fill();
    ctx.beginPath();
    ctx.rect(0,0,640,20);
    ctx.fillStyle="#fff";
    ctx.fill();
    ctx.beginPath();
    ctx.rect(0,620,640,20);
    ctx.fillStyle="#fff";
    ctx.fill();
}
function random(min,max){
    return Math.floor( Math.random() * (max-min+1) ) + min;
}
function time(){
    if(enemy["count"]==50){
        pl["time"]++;
        enemy["count"]=0;
    }
}
function enemy_edit(){
    if(pl["count"]==1){
        let a = random(0,3);
        let b = random(20,620);
        let c = random(0,180);
        if(a===0){
            enemy["x"].push(b);
            enemy["y"].push(40);
            enemy["θ"].push(c);
        }
        if(a===1){
            enemy["x"].push(40);
            enemy["y"].push(b);
            enemy["θ"].push(c);
        }
        if(a===2){
            enemy["x"].push(600);
            enemy["y"].push(b);
            enemy["θ"].push(c);
        }
        if(a===3){
            enemy["x"].push(b);
            enemy["y"].push(600);
            enemy["θ"].push(c);
        }
        pl["count"]=0;
    }
}
function enemy_show(){
    for(let i = 0;i<enemy["x"].length;i++){
        ctx.beginPath();
        ctx.arc(enemy["x"][i],enemy["y"][i],10,0*Math.PI/180,360*Math.PI/180,false);
        ctx.fillStyle = "#4169e1";
        ctx.fill();
    }
}
function enemy_move(){
    for(let i = 0;i<enemy["x"].length;i++){
        enemy["x"][i]=enemy["x"][i]+5*Math.cos(enemy["θ"][i]);
        enemy["y"][i]=enemy["y"][i]+5*Math.sin(enemy["θ"][i]);
        if(pl["x"]-16<enemy["x"][i]&&pl["x"]+32>enemy["x"][i]&&pl["y"]-16<enemy["y"][i]&&pl["y"]+32>enemy["y"][i]){
            clearInterval(main);
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(font["gameOver"],0,0,430,107,160,200,320,80);
            ctx.fillStyle="#ffffff";
            ctx.font="50px bold monospace";
            ctx.fillText(`score:${pl["score"] * pl["time"]}`,180,350);
            style();
        }else{
            if(enemy["x"][i]<20||enemy["x"][i]>620||enemy["y"][i]<20||enemy["y"][i]>620){
                enemy["x"].splice(i,1);
                enemy["y"].splice(i,1);
                enemy["θ"].splice(i,1);
                pl["score"]++;
            }
        }
    }
}