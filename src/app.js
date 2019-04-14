const {app, BrowserWindow} = new require('electron');

let window;

function createWindow() {
    window = new BrowserWindow({
        title: 'Kraken Launcher',
        icon: 'public/assets/images/favicon.ico',
        width: 950,
        height: 700
    });

    window.setResizable(false);
    //window.setMenu(null);
    window.loadFile('public/index.html');

    window.on('closed', () => {
       window = null;
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
   if(process.platform !== 'darwin') {
       app.quit();
   }
});
app.on('activate', () => {
   if(window === null) {
       createWindow();
   }
});