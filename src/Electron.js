const {app, BrowserWindow} = require('electron');
const path = require('path');
const fs = require('fs');
const isDev = require('electron-is-dev');

let window;

function createWindow () {
  if(!fs.existsSync(app.getPath('userData') + '/instances')) {
    fs.mkdirSync(app.getPath('userData') + '/instances');
  }

  window = new BrowserWindow({
    title: "Kraken Launcher",
    width: 1152,
    height: 720,
    minWidth: 640,
    minHeight: 360,
    resizable: true,
    frame: false,
    backgroundColor: '#FFF',
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  });

  if(!isDev) {
    window.setMenu(null);
  }

  window.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  window.on('closed', () => {
    window = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (window === null) {
    createWindow();
  }
});
