const { ipcMain } = require('electron');

module.exports = {
    geraMenuPrincipalTemplate(app) {
        let templateMenu = [
            { 
                label: 'File',
                submenu: [
                    {
                        label: 'Sobre',
                        click: () => {
                            ipcMain.emit('abrir-janela-sobre');
                        },
                        accelerator: 'CmdOrCtrl+I'
                    }
                ]
            },
            {
                label: 'View',
                submenu: [{
                    role: 'reload'
                },
                {
                    role: 'toggledevtools'
                }
                ]
            }
        ];
    
        //somente se for Mac pq por padrão ele cria o primeiro menu com o nome do app
        if(process.platform == 'darwin'){
            templateMenu.unshift({
                label: app.getName()
            })
        }
    
        return templateMenu;
    }
}