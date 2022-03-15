function setup(){
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.center();
    video.hide();
    classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}
function modelLoaded(){
    console.log("Model loaded");
}
function draw(){
    image(video, 0, 0, 500, 400);
    classifier.classify(video, gotResult);
}
var previousresult = '';
function gotResult(error, results){
    if(error){
        console.log(error);
    } else{
        if((results[0].confidence > 0.5) && (previousresult != results[0].label)){
            console.log(results);
            previousresult = results[0].label;
            var synth = window.speechSynthesis;
            speakdata = 'Object detected is ' + results[0].label;
            var utterThis = new SpeechSynthesisUtterance(speakdata);
            synth.speak(utterThis);
            document.getElementById("mobilenetresultsname").innerHTML = results[0].label;
            document.getElementById("mobilenetresultsaccuracy").innerHTML = Math.round(results[0].confidence * 100);
            document.getElementById("googlelensresultsname").innerHTML = results[0].label;
            document.getElementById("googlelensresultsaccuracy").innerHTML = Math.round(results[0].confidence * 100);
        }
    }
}