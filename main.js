const electron = require('electron')
const { app, BrowserWindow } = electron

app.on('ready', () => {
    const defaultWindow = new BrowserWindow({
        height: 1000,
        width: 800
    })
    defaultWindow.setMenu(null)
    defaultWindow.loadFile('./src/index.html')
})