// Modules to control application life and create native browser window
const {
  BrowserWindow,
  app,
  shell,
  dialog,
  ipcMain
} = require('electron');
const path = require('path');
const glob = require('glob')
const fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// If this app is already running get the hEck out
if (!app.requestSingleInstanceLock()) {
  app.quit();
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    //icon: '*.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true // This line right here, chief
    },
    resizable: true
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })
};

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) 
      mainWindow.restore();
    mainWindow.focus();
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const files = glob.sync(path.join(__dirname, '/src/main/**/*.js'))
  files.forEach((file) => { require(file) })

// require('./src/main/msg/selectDirectory');
// require('./src/main/pages/mainPage');
// require('./src/main/pages/startPage');
// require('./src/main/utils/menuBar');
// require('./src/main/utils/misctools');