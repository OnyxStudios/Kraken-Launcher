const {app, BrowserWindow} = require('electron');

let window;
let serverProcess;

function createWindow() {
    let platform = process.platform;
    if(platform === 'win32') {
        serverProcess = require('child_process')
            .spawn('cmd.exe', ['/c', 'KrakenLauncher.bat'], {cwd: app.getAppPath() + "/KrakenLauncher/bin"});
    }else {
        serverProcess = require('child_process')
            .spawn(app.getAppPath() + '/KrakenLauncher/bin/KrakenLauncher');
    }

    if(!serverProcess) {
        console.error("Unable to start server! " + app.getAppPath());
        app.quit();
        return;
    }

    serverProcess.stdout.on('data', function (data) {
       console.log("Server: " + data);
    });

    let appUrl = 'http://localhost:8080';
    const openWindow = function() {
        window = new BrowserWindow({
            title: 'Kraken Launcher',
            icon: __dirname + "/assets/icon.ico",
            width: 1000,
            height: 700
        });

        window.loadURL(appUrl);

        window.on('closed', function () {
            window = null;
        });

        window.on('close', function (e) {
            if(serverProcess) {
                e.preventDefault();

                const kill = require('tree-kill');
                kill(serverProcess.pid, 'SIGTERM', function () {
                    console.log("Server Process Killed!");
                    serverProcess = null;
                    window.close();
                })
            }
        })
    };

    const startup = function () {
      const requestPromise = require('minimal-request-promise');
      requestPromise.get(appUrl).then(function (response) {
          console.log('Server Started!');
          openWindow();
      }, function (response) {
          console.log('Awaiting server start...');

          setTimeout(function () {
              startup();
          }, 200);
      });
    };

    startup();
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if(process.platform != 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
   if(window === null) {
       createWindow();
   }
});
