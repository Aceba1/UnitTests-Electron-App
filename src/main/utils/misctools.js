const cp = require('child_process');

const tools = {
  openSite: (url) => {
    var start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');
    cp.exec(start + ' ' + url);
  },
  
}

module.exports = tools;