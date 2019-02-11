//const electron = require('electron');
const electron = require('electron')
const {ipcMain} = require('electron')
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const child_process = require('child_process')
const fs = require('fs')
const os = require('os')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

ipcMain.on('write-open-py-file', (event, arg)=>{
    //arg has two keys, arg.fileName and arg.fileContent
    //write python file by arguments passed in
    //tmpPythonFilePath combine tmdir with fileName of original python file
    //if wrting succeed, return message and filePath just wrting
    //if wrting failed, return message and empty string
    const tmpPythonFilePath = os.tmpdir() + '/' + arg.fileName

    fs.writeFile(tmpPythonFilePath, arg.fileContent,function(error){
        if(error){
            event.sender.send('write-py-file-reply', {
                'message': 'failed',
                'filePath': ''
            });
        } 
        else{
            //electron's console can't show directly by remote connect electron and create-react-app
            //use a reply as a replacement.
            //when tmpFile has been written open it using VS Code
            child_process.exec('code' + ' ' + tmpPythonFilePath)
            event.sender.send('write-py-file-reply', {
                'message': 'success'
            });
        }
    })

    
})

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800, 
        height: 600, 
        title: 'Python Classwork Explorer',
        webPreferences:
        {
            nodeIntegration: true
        }}
    );

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });

    mainWindow.loadURL(startUrl);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
