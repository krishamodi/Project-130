song1="";
song2="";

scoreRightWrist="";
scoreLeftWrist="";

song1_status="";
song2_status="";

rightWristX=0;
rightWristY=0;

leftWristX=0;
leftWristY=0;

function preload(){
    song1=loadSound("song1.mp3");
    song2=loadSound("song2.mp3");

}

function modelLoaded(){
console.log("PoseNet is Initialized");
}
function gotPoses(results)
{
if(results.length>0)
{
    console.log(results);
    scoreRightWrist=results[0].pose.keypoints[10].score;
    scoreLeftWrist=results[0].pose.keypoints[9].score;

    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;

    lefttWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;

    
}

}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw(){
image(video,0,0,600,500);
song1_status=song1.isPlaying();
song2_status=song2.isPlaying();

fill("#4ff790");
stroke("#4ff790");

if(scoreRightWrist>0.2){
    circle(rightWristX,rightWristY,20);

    song2.stop();
    if(song1_status==false){
        song1.play();
        document.getElementById("song").innerHTML="Playing - Memories";

    }
}

if(scoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,20);

    song1.stop();
    if(song2_status==false){
        song2.play();
        document.getElementById("song").innerHTML="Playing - Passori";
        
    }
}
}

function song_name(){
song1.play();
song1.setVolume(0.2);
song1.rate(1);
}