const Client = require('ssh2').Client;
const connSettings = {
    host: '172.26.103.36',
    port: 22,
    username: 'ahead_datalink',
    password: 'mudar@123'
};

const conn = new Client();
conn.on('ready', function() {
    conn.sftp(function(err, sftp) {
        if (err) throw err;

        const filesToDownload = [
            'XALOB_20180104_000839_1624.zip'
        ];

        filesToDownload.forEach(file => {
            let moveFrom = '/stage/ahe/sent/' + file;
            let moveTo = '/Users/GIOVASIL/Desktop/teste/' +  file;
    
            sftp.fastGet(moveFrom, moveTo , {}, function(downloadError){
                if(downloadError) throw downloadError;
    
                console.log(file + " downloaded");
            });
        });
    });
}).connect(connSettings);