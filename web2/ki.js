/*
Nötige imports
src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js";
src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8.3/dist/teachablemachine-image.min.js";
*/

// Link zum Teachable Machine Modell
const URL = 'https://teachablemachine.withgoogle.com/models/CIe6LgF5T/';
//const URL = 'KI-DATA/';
// Variablen für KI-Model, Webcam, Container für die Darstellung und Anzahl der möglichen Zustände
let model, webcam, labelContainer, maxPredictions;
// Variable für Aktivierung und Deaktivierung der Klassifikation
let isEnable = false;
// Variable zum speichern der zu sendenden Nachricht und zum managen des Sendhandlers
let nachricht, sendID;
const sendInterval = 500;

// initialisierung der KI und der Webcam
async function init() {
    const kiModelURL = URL + 'model.json';
    const kiMetadataURL = URL + 'metadata.json';

    // KI Model und Metadaten laden
    model = await tmImage.load(kiModelURL, kiMetadataURL);
    maxPredictions = model.getTotalClasses();

    // Platzhalter für webcam-bild finden
    var placeholder = document.getElementById("webcam-canvas-placeholder");

    // Webcam laden
    const flip = true; // Webcambild flippen
    const width = placeholder.offsetWidth;
    const height = placeholder.offsetHeight;
    webcam = new tmImage.Webcam(width, height, flip);
    await webcam.setup(); // Anfrage der Webcam

    placeholder.parentNode.removeChild(placeholder);
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    
    // Labels einfügen
    labelContainer = document.getElementById('label-container');
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement('p'));
    }
    webcam.play();
    window.requestAnimationFrame(loop);

    // Senden im Intervall starten
    if (!sendID) {
        sendID = setInterval(sendhandler, sendInterval);
    }
}
// Webcam update und klassifizieren
async function loop() {
    webcam.update();
    // klassifizierung an und aus schalten
    if (isEnable) {
        await classify();
    }    
    window.requestAnimationFrame(loop);
}

// klassifizieren des Webcambildes
async function classify() {
    // classify kann image, video oder canvas element nutzen
    let prediction;
    
    prediction = await model.predict(webcam.canvas);
    
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
    // nachricht bauen
    nachricht = prediction[0].className;
    for (i = 1; i < maxPredictions; i++) {
      if (prediction[i - 1].probability.toFixed(2) < prediction[i].probability.toFixed(2)) {
        nachricht = prediction[i].className;
      }
    }
}

function stopClassify() {
    isEnable = false;
}

function startClassify() {
    isEnable = true;
    if (!webcam){
        init();    
    }
}

// daten zum senden Aufbereiten
async function sendhandler() {
    if (isEnable) {
      switch (nachricht) {
        case "Ohne Maske":
          await send("1");
          break;
        case "Kein Gesicht...":
          await send("2");
          break;
        case "Mit Maske":
          await send("3");
          break;
        default:
          await send("0");
          break;      
       }
     }   
   }