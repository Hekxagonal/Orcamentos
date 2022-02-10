const electron = require('electron')
const { app, BrowserWindow } = electron

app.on('ready', () => {
    const defaultWindow = new BrowserWindow({})

    defaultWindow.loadFile('./src/index.html')
})