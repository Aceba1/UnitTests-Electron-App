const { ipcRenderer, remote, remote: {shell, dialog, app} } = require('electron');

//const eventSelectDirectory = require('../msg/selectDirectory');
const queryGithub = require('../utils/queryGithub');

//const page = document.getElementById('main');
const logText = document.getElementById('main-log');
const tokenInput = document.getElementById('main-token');
const repoInput = document.getElementById('main-repo');
const ratelimitButton = document.getElementById('main-getRateLimit');
const releaseButton = document.getElementById('main-getRelease');
const repoButton = document.getElementById('main-getRepo');
const pageButton = document.getElementById('main-getPage');

// ---- Functions ----

function openPage() {
  console.log('Opened main!');
}

function closePage() {
  console.log('Closed main!');
}

async function rateLimit(event) {
  logText.innerHTML = JSON.stringify(await queryGithub.getRateLimit(), null, '  ');
}
async function release(event) {
  logText.innerHTML = JSON.stringify(await queryGithub.getRelease(repoInput.value), null, '  ');
}
async function repo(event) {
  logText.innerHTML = JSON.stringify(await queryGithub.getRepo(repoInput.value), null, '  ');
}
async function page(event) {
  logText.innerHTML = JSON.stringify(await queryGithub.getPage(), null, '  ');
}
function updateToken(event) {
  queryGithub.setToken(event.target.value);
}

// ---- Paging ----

const Pages = require('../utils/pages');
Pages.LinkPage('main', openPage, closePage);

// ---- HTML Hooks ----

ratelimitButton.addEventListener('click', rateLimit);
releaseButton.addEventListener('click', release);
repoButton.addEventListener('click', repo);
pageButton.addEventListener('click', page);

tokenInput.addEventListener('change', updateToken);