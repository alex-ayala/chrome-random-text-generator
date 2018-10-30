import messageHandler from "./message";

chrome.runtime.onMessage.addListener(messageHandler);
