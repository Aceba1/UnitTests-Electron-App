const { ipcMain, dialog } = require('electron');

// Requiring this will bind 'selectDirectory' to receive from render
ipcMain.on('selectDirectory', async (event, response, defaultPath) => {
  console.log('Received ' + response);

  const r = await dialog.showOpenDialog({ // Run the folder dialog
    properties: ['openDirectory'],
    defaultPath: defaultPath,
  });

  if (!r.canceled) {
    event.sender.send(response, r.filePaths[0]); // Return to sender
  }
});