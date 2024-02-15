var SpeechRecognition=window.webkitSpeechRecognition;
var recognition=new SpeechRecognition();
var textbox=document.getElementById("textbox");
var camera=document.getElementById("camera");

function start(){
    textbox.innerHTML="";
    recognition.start();
}

recognition.onresult=function(event){
    console.log(event)
    var content=event.results[0][0].transcript;
    textbox.innerHTML=content;
    console.log(content)
    if(content=="tirar a foto"){
        console.log("tirando foto")
        speak();
    }
}

function speak(){
    var synth=window.speechSynthesis;
    speakdata="tirando sua foto em 5 segundos";
    var utterThis=new SpeechSynthesisUtterance(speakdata);
    synth.speak(utterThis);
    Webcam.attach(camera);
    setTimeout(function(){
        takeSelfie();
        save();
    },5000)
}

Webcam.set({
    width:360,
    height:250,
    image_format:"jpeg",
    jpeg_quality:90
})

function takeSelfie(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="selfieImage" src="' + data_uri + '"/>';
    })
}

function save(){
    link=document.getElementById("link");
    image=document.getElementById("selfieImage");
    link.href=image;
    link.click();
}
