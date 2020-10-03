// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.s

const {dialog, app} = require('electron').remote;

const path = require('path');

// Add logic here to see if configuration was done
// ... Also add file system utility 

const Pages = require('./src/renders/utils/pages');

console.log(JSON.stringify(Pages.knownPages));
require('./src/renders/pages/startPage');
require('./src/renders/pages/mainPage');


console.log('Ran');

Pages.ShowPage('start');