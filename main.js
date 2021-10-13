mp="";
obkect=[];
status="";
function preload(){
mp=createVideo("video.mp4");
}

function setup(){
    canvas=createCanvas(500,500);
    canvas.center();
    mp.hide()
}

function start(){
    objectdetector=ml5.objectDetector('cocossd' ,modelloaded);
    document.getElementById("status").innerHTML='Status =Detecting Objects';
}

function modelloaded(){
    console.log("Model Loaded");
    status=true;
    mp.loop();
    mp.speed(1);
    mp.volume(0);
}

function draw(){
    image(mp,0,0,500,500)
    if (status!=""){
        objectdetector.detect(mp,gotresults);
        for(i=0;i<obkect.length;i++){
        document.getElementById("status").innerHTML='Status =Objects Detected';
        document.getElementById("no").innerHTML='Number of objects detected='+obkect.length;
        fill ("#FF0000");
        persent=floor(obkect[i].confidence*100);
        text (obkect[i].label+" "+persent+"%",obkect[i].x+15,obkect[i].y+15);
        noFill();
        stroke("#FF0000");
        rect(obkect[i].x,obkect[i].y,obkect[i].width,obkect[i].height);
        }
    }
}

function gotresults(error,results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results);
        obkect=results;
    }
}