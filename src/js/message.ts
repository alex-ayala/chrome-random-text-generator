import * as $ from 'jquery';
import Random from "./Random";

let r = new Random();

const messageHandler = function(request, sender, sendResponse) {
  let length = NaN;

  while(! length ) {
    let result = prompt("Enter the required text length");
    if(result === null){
      return;
    }

    length = Number(result);

    if(isNaN(length)) {
      alert("Dude!! Enter a number");
    }
  }

  let text = r.getLorem(length);
  let lastFocused = document.activeElement;

  if(lastFocused != null
      && ($(lastFocused).is('input') || $(lastFocused).is('textarea'))
      && ! ($(lastFocused).is('input:radio') || $(lastFocused).is('input:radio'))
  ) {
    const lastFocusedInput = lastFocused as HTMLInputElement;
    lastFocusedInput.focus();
    lastFocusedInput.value = text;
    sendResponse({ data: 'Copy Successfull' });

    return;
  }
  else {
    alert('Select any Input element first');
  }
};

export default messageHandler;
