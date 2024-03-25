status=""
function setup(){
    canvas=createCanvas(300,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(300,300);
}
function start(){
    objectDeyector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status: detecting objects";
    object=document.getElementById("object").value;
}
function modelLoaded(){
    console.log("modelLoaded");
    status=true;
}
function draw(){
    image(video,0,0,300,300);
}