import insertFakeCommand from "./command";

window.chrome.commands.onCommand.addListener(insertFakeCommand);
