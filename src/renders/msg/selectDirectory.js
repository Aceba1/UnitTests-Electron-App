const { ipcRenderer } = require('electron');

/**
 * Returns a method to call 'selectDirectory' and subscribes a function to method response 
 * @param {string} uniqueID 
 * @param {(event: Electron.IpcRendererEvent, path: string) => void} onReceived
 * @returns {(defaultPath: string) => void} sendEvent
 */
module.exports = function eventSelectDirectory(uniqueID, onReceived) {
  const uID = 'selectDirectory-response-' + uniqueID;

  ipcRenderer.on(uID, onReceived); // Attaches this ID to supplied response function

  return (defaultPath) => { // Returns a unique function to call ipcMain
    ipcRenderer.send('selectDirectory', uID, defaultPath);
  }
}