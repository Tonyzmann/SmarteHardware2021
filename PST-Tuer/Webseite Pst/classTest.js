// imports
// import { send } from './serial.js';

// variables
let label = "Klassifikation nicht aktiv."; // displays classification results
let enable = false;

// video elements
let video;

// button elements
const butStart = document.getElementById("butStart");
const butStop = document.getElementById("butStop");

// *****
// Laden des Modells
// *****

// URL vom Modell
let basicURL = "https://teachablemachine.withgoogle.com/models/";
let imageModelURL = "";
// Classifier (ausgeführtes Modell)
let classifier;
let micro;
let resultVideo;
let microResult;

// values: 0 -> Gesicht erkennen, 1 -> Frage beantworten
let step = 0;

function preload() {
  clickLoad();
}

// pre-load model
function startup() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
  micro = ml5.soundClassifier("SpeechCommands18w", {
    probabilityThreshold: 0.92,
  });
  generateRandomQuestion();
  micro.classify(testMicro);
  classify();
}

// *****
// Setup der Seitenelemente (Knoepfe + Video)
// *****

// add event listener to buttons
document.addEventListener("DOMContentLoaded", () => {
  butLoad.addEventListener("click", clickLoad);
});
document.addEventListener("DOMContentLoaded", () => {
  butStart.addEventListener("click", clickStart);
});
document.addEventListener("DOMContentLoaded", () => {
  butStop.addEventListener("click", clickStop);
});

function displayResults(results) {
  if (results[0].confidence > 0.92) {
    resultVideo = results[0].label;
    testFaceStep();
  }

  classify();
}

function setup() {
  let cnv = createCanvas(320, 260);
  cnv.position(100, 300);
}

function testMicro(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  if (step == 1) {
    microResult = results[0].label;
    testMicroStep();
  }
}

function testMicroStep() {
  console.info(microResult + " - " + answer);
  if (microResult == answer) {
    step = 2;
    label = "Welcome!";

    send("1"); // Tür öffnen
    waitReset();
  }
}

async function waitReset() {
  //   await delay(10);

  //   step = 1;
  //   generateRandomQuestion();

  setTimeout(function () {
    step = 1;
    generateRandomQuestion();

    //your code to be executed after 1 second
  }, 15000);
}

function draw() {
  background("#999999");
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// *****
// Funktionalitaet fuer die Knoepfe
// *****

function clickLoad() {
  // read model ID
  let modelName = "W7OMTBJAG";
  // set path
  imageModelURL = basicURL + modelName + "/";
  // display selection
  document.getElementById("modelDisplay").innerHTML = imageModelURL;
}

function clickStart() {
  // load model
  startup();

  //label = 'Klassifikation ist aktiv';

  // check if video has already been initialized
  if (!video) {
    // create video
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.position(100, 300);
  }

  // begin classification
  enable = true;
  classify();
}

function clickStop() {
  label = "Beendet";
  enable = false;
  step = 0;
  generateRandomQuestion();
}

// *****
// KI Integration
// *****

// Aufruf des Modells (Klassifizierung)
async function classify() {
  if (step == 0) {
    flippedVideo = ml5.flipImage(video);
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();
  }
}

function testFaceStep() {
  console.info("step : " + resultVideo);
  if (
    resultVideo == "Adrian" ||
    resultVideo == "Max" ||
    resultVideo == "Nico" ||
    resultVideo == "Malik"
  ) {
    step = 1;
    label = "Hallo! " + question;
    console.info("step = 1");
  }
}

let a;
let b;
let answer = null;
let question;

function generateRandomNumber() {
  a = Math.round(Math.random() * 4);
  b = Math.round(Math.random() * 5);
}

function generateRandomQuestion() {
  generateRandomNumber();
  let x = a + b;

  question = "Was ist " + a + "*" + b + "?";

  if (x == 0) {
    answer = "zero";
  } else if (x == 1) {
    answer = "one";
  } else if (x == 2) {
    answer = "two";
  } else if (x == 3) {
    answer = "three";
  } else if (x == 4) {
    answer = "four";
  } else if (x == 5) {
    answer = "five";
  } else if (x == 6) {
    answer = "six";
  } else if (x == 7) {
    answer = "seven";
  } else if (x == 8) {
    answer = "eight";
  } else if (x == 9) {
    answer = "nine";
  }

  label = question;
}

// Abfangen des Ergebnisses
async function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);       // Anzeigen des Ergebnisses in der Konsole des Browsers
  displayResults(results);
  console.info("Results erhalten: " + results[0].label);
}
