const { ipcRenderer, remote: {shell} } = require('electron');

const {dialog, app} = require('electron').remote;
const Pages = require('../utils/pages');
const eventSelectDirectory = require('../msg/selectDirectory');

//const page = document.getElementById('start');
//const form = document.getElementById('start-form');
const err = document.getElementById('start-err');
const pathInput = document.getElementById('start-path');
const continueBtn = document.getElementById('start-continue');

const callGameSelectDirectory = eventSelectDirectory('start-gameDir', (event, path) => {
  console.log('GameDir - Received back ' + path);
  pathInput.value = path;  
})

pathInput.addEventListener('dblclick', event => {
  callGameSelectDirectory(app.getPath('desktop'));
})

continueBtn.addEventListener('click', event => {
  shell.beep();
  event.preventDefault();
  if (pathInput.value && pathInput.value != '')
    Pages.ShowPage('main');
  else 
    err.innerHTML = 'Game Directory is invalid!';
});