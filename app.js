const { app, BrowserWindow } = require('electron');
const Client = require('ssh2').Client;

const connSettings = {
    host: '172.26.103.36',
    port: 22,
    username: 'ahead_datalink',
    password: 'mudar@123'
};

app.on('ready', () => {
    
    let mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    });

    // mainWindow.loadURL("http://www.alura.com.br");

    // const conn = new Client();
    
    // conn.on('ready', function() {
    //     conn.sftp(function(err, sftp) {
    //         if (err) throw err;
    
    //         const filesToDownload = [
    //             'XALOB_20180104_000839_1624.zip',
    //             'N795W_20180111_182613_7514.zip',
    //             'N795W_20180111_182611_7978.zip'
    //         ];
    
    //         filesToDownload.forEach(file => {
    //             let moveFrom = '/stage/ahe/sent/' + file;
    //             let moveTo = '/Users/GIOVASIL/Desktop/teste/' +  file;
        
    //             sftp.fastGet(moveFrom, moveTo , {}, function(downloadError){
    //                 if(downloadError) throw downloadError;
        
    //                 console.log(file + " downloaded");
    //             });
    //         });
    //     });
    // }).connect(connSettings);
});

