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
}
async function release(event) {
}
async function repo(event) {
}
async function page(event) {
}
function updateToken(event) {
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