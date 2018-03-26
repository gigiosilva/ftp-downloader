const { app, BrowserWindow, ipcMain, Menu, globalShortcut } = require('electron');
const Client = require('ssh2').Client;
const templateGenerator = require('./template');

app.on('ready', () => {
    
    let mainWindow = new BrowserWindow({
        width: 870,
        height: 540,
        backgroundColor: '#202121'
    });

    // mainWindow.openDevTools();
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

    let templateMenu = templateGenerator.geraMenuPrincipalTemplate(app);
    let menuPrincipal = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(menuPrincipal);

    globalShortcut.register('CmdOrCtrl+I', () => {
        ipcMain.emit('abrir-janela-sobre');
    });
});

app.on('window-all-closed', () => {
    app.quit();
});

let sobreWindow = null;

ipcMain.on('abrir-janela-sobre', () => {

    if(sobreWindow == null) {
        sobreWindow = new BrowserWindow({
            width: 300,
            height: 200,
            alwaysOnTop: true,
            autoHideMenuBar: true
        });

        sobreWindow.on('closed', () => {
            sobreWindow = null;
        });
    }

    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`)
});

ipcMain.on('fechar-janela-sobre', () => {
    
    sobreWindow.close();
});