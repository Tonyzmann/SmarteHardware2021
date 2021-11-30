// Variablen
let port;
let isConnected = false;
// tx
let outputDone;
let outputStream;

// verbinden über serielle Schnittstelle
async function connect() {
    // nach seriellen Port fragen
    if(!('serial' in navigator)) {
        label = 'Error: Could not find serial interface!';
    } else {
        port = await navigator.serial.requestPort();
        await port.open({baudRate: 115200});

        // encoder zum senden erstellen
        const encoder = new TextEncoderStream();
        outputStream = encoder.writable;
        outputDone = encoder.readable.pipeTo(port.writable);
    }
    isConnected = true;
}

// serielle Schnittstelle schließen
async function disconnect() {
    if (outputStream) {
        await outputStream.getWriter().close();
        await outputDone;
        outputStream = null;
        outputDone = null;
    }
    if (port) {
        await port.close();
        port = null;
    }
    isConnected = false;
}

// senden
async function send(txData) {
    if(isConnected) {
        const writer = outputStream.getWriter();
        console.log('[TX]:', txData);
        writer.write(txData);
        writer.releaseLock();    
    } else {
        console.log('Error: no serial connection');
    }    
}