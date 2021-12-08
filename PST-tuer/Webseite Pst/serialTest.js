
// button elements
const butConnect = document.getElementById('butConnect');
const butDisconnect = document.getElementById('butDisconnect');

// *****
// general setup
// *****

// add event listener to buttons
document.addEventListener('DOMContentLoaded', ()=>{butConnect.addEventListener('click', clickConnect)});
document.addEventListener('DOMContentLoaded', ()=>{butDisconnect.addEventListener('click', clickDisconnect)});
// document.addEventListener('DOMContentLoaded', ()=>{butSend.addEventListener('click', clickSend)});


// *****
// event functions for button clicking
// *****

async function clickConnect(){ 
  // call function from serial interface
  await connect();
}

async function clickDisconnect(){
  // call function from serial interface
  await disconnect();
}

async function clickSend(){
    let event = document.querySelector("#sendEvent").value;
    await send(event);
}
