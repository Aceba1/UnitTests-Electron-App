const { ipcRenderer, remote, remote: {shell, dialog, app} } = require('electron');

const eventSelectDirectory = require('../msg/selectDirectory');
const queryGithub = require('../utils/queryGithub');

//const page = document.getElementById('start');
//const form = document.getElementById('start-form');
const err = document.getElementById('start-err');
const pathInput = document.getElementById('start-path');
const continueBtn = document.getElementById('start-continue');

// ---- Functions ----

function openPage() {
  console.log('Opened start!');
}

function closePage() {
  console.log('Closed start!');
  //queryGithub.getRateLimit();
}

// ---- Paging ----

const Pages = require('../utils/pages');
Pages.LinkPage('start', openPage, closePage);

// ---- Messaging ----

// Handle receiving directory path
const callGameSelectDirectory = eventSelectDirectory('start-gameDir', (event, path) => {
  console.log('GameDir - Received back ' + path);
  pathInput.value = path;
});

// ---- HTML Hooks ----

// Handle sending directory path
pathInput.addEventListener('dblclick', event => {
  callGameSelectDirectory(app.getPath('desktop'));
})


continueBtn.addEventListener('click', event => {
  event.preventDefault();
  shell.beep();
  if (pathInput.value && pathInput.value != '')
    Pages.ShowPage('main');
  else 
    err.innerHTML = 'Game Directory is invalid!';
});