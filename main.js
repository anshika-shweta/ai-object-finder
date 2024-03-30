status=""
objects=[];
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
function gotResults(error,results){
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function draw(){
    image(video,0,0,300,300);
    if(status !=""){
        objectDetector.detect(video,gotResults);
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML= "status : objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +""+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label==object_name){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("status").innerHTML=object_name+"found";
            }
            else{
                document.getElementById("status").innerHTML=object_name+"not found";
            }
        }
    }
}