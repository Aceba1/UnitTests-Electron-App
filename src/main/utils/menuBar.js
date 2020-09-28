const { Menu } = require('electron');
const { openSite } = require('./misctools');

const template = [{
  label: 'File',
  submenu: [{
    label: 'Install Patch',
    enabled: false
  }, {
    label: 'Remove Patch',
    enabled: false
  }, {
    label: 'Download latest Patcher',
    enabled: false
  }, {
    type: 'separator'
  }, {
    label: 'Go to mod folder',
    enabled: false
  }, {
    label: 'Download all mod updates',
    enabled: false
  }, {
    type: 'separator'
  }, {
    label: 'Update program',
    enabled: false
  }, {
    label: 'Check for program updates',
    enabled: false
  }]
}, {
  label: 'Config',
  submenu: [{
    label: 'Skip Start page',
    enabled: false
  }, {
    label: 'Show Details panel',
    enabled: false
  }, {
    label: 'Set Github token',
    enabled: false
  }, {
    label: 'Toggle Developer Tools',
    accelerator: (() => {
      if (process.platform === 'darwin') { return 'Alt+Command+I' } 
      else { return 'Ctrl+Shift+I' }})(),
    click: (item, focusedWindow) => {
      if (focusedWindow) { focusedWindow.toggleDevTools() }
    }
  }]
}, {
  label: 'Help',
  submenu: [{
    label: 'Links',
    submenu: [{
      label: 'CareerDevs',
      click: () => { openSite('https://careerdevs.com/') } // Update when published
    }, {
      label: 'My Github',
      click: () => { openSite('https://github.com/Aceba1') }
    }, {
      label: 'My Twitter',
      click: () => { openSite('https://twitter.com/Aceba1_') }
    }]
  }, {
    label: 'About...',
    enabled: false
  }]
}];

Menu.setApplicationMenu(Menu.buildFromTemplate(template));

// Simply by 'requiring' this, it should load up the template as the menu 