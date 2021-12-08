// import
// import { step } from './classTest.js';


// *****
// variables
// *****

let port;

// Output Stream
let outputDone;
let outputStream;

// Input Stream
let inputDone;
let inputStream;

// *****
// connect and disconnect functions
// *****

async function connect() {
  // request port for serial connection
  if (!('serial' in navigator)) {
    label = "Error: Could not find serial interface!";
  } else {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    // create encoder to send data
    // connect done-flags
    
	/*
	let decoder = new TextDecoderStream();
    inputDone = port.readable.pipeTo(decoder.writable);
	inputStream = decoder.readable;
	*/
	
	//receive();	
	
	const encoder = new TextEncoderStream();
    outputStream = encoder.writable;
	// apo
	// outputDone = port.readable.pipeTo(encoder.writable);
    outputDone = encoder.readable.pipeTo(port.writable);
  }
}

async function disconnect() {
  // close output stream
  if (outputStream) {
    await outputStream.getWriter().close();
    await outputDone;
    outputStream = null;
    outputDone = null;
  }
  
  // TODO: close Input Stream

  // close port
  if (port) {
    await port.close();
    port = null;
  }
}

// *****
// tx
// *****
async function send(txData) {
  const writer = outputStream.getWriter();
  // for debugging: log sent messages
  console.log("[TX]:", txData);
  writer.write(txData);
  writer.releaseLock();
}

/*
async function receive() {
	const reader = inputStream.getReader();
	while (true) {
	  const { value, done}  = await reader.read();                	  
	  
	  if (value){
		  console.log("[RX]:", value);
	  }
	  
	  
	  //console.log("done flag: ", done);
	  if (done) {
		// Allow the serial port to be closed later.		
		reader.releaseLock();
		break;
	  }
	  
	  receivePacket(value);
	}
}

function receivePacket(value) {
	if(value == '1') { // Tür offen
		step = 3; // warten
	} else if(value == '2') { // Tür zu
		step = 0; // reset
	}
}
*/