const Client = require('ssh2-sftp-client');
const fs = require('fs');
const archiver = require('archiver');
const JSZip = require("jszip");

let zip = new JSZip();

let sftp = new Client();

sftp.connect({
    host: '172.26.103.36',
    port: '22',
    username: 'ahead_datalink',
    password: 'mudar@123'
}).then((data) => {

    const fileName = '2018-01-03_142412_KFLL_3(36021327).csv';

    const remoteFilename = '/stage/ahe/input/' + fileName;
    const localFilename = '/Users/GIOVASIL/Desktop/teste/' +  fileName;

    sftp.get(remoteFilename).then((stream) => {
        stream.pipe(fs.createWriteStream(localFilename, { encoding: 'binary' })
        .on('close', () => {
            console.log('foi')
        }))
        
    });
}).catch((err) => {
    console.log(err, 'catch error');
});