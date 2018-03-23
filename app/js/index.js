const { ipcRenderer } = require('electron');
const { dialog } = require('electron').remote;
const Client = require('ssh2').Client;
const conn = new Client();

const fileListEl = $(".file-list");
const outputFolderEl = $('input[type=file]')[0];
const downloadBtnEl = $('#download-button');
const clearBtnEl = $('#clear-button');
const outputBtnEl = $('#output-button');
const fileToDownloadInputEl = $('#file-download-input');
const filePathInputEl = $('#file-path-input');
const ftpPathInputEl = $('#ftp-path-input');
const ftpPathLabelEl = $('#ftp-path-label');
const hostInputEl = $('#host-input');
const portInputEl = $('#port-input');
const usernameInputEl = $('#username-input');
const passwordInputEl = $('#password-input');
const hostLabelEl = $('#host-label');
const portLabelEl = $('#port-label');
const usernameLabelEl = $('#username-label');
const passwordLabelEl = $('#password-label');


let fileList = [];
let outputPath;

$(document).ready(() => {
  $('.tabs').tabs();
  loadData();
});

clearBtnEl.click(() => {
  fileListEl.empty();
});

outputBtnEl.click(() => {
  let path = dialog.showOpenDialog({
      properties: ['openDirectory']
  });
  filePathInputEl.val(path);
  outputPath = path;
});

downloadBtnEl.click(() => {
  downloadFile();
});

fileToDownloadInputEl.keyup((e) => {
  if(e.keyCode == 13) {
    let target = $(e.currentTarget);
    addFileToList(target.val());
    target.val('');
  }
});

let addFileToList = (filename) => {
  if(filename !== '') {
    fileList.push(filename);
    fileListEl.empty();
    fileList.forEach(file => fileListEl.append(`<li class="collection-item">${file}</li>`));
    fileListEl.animate({scrollTop:$(document).height()}, 'slow');
  }
}

let downloadFile = () => {
  
  const connSettings = {
      host: '172.26.103.36',
      port: 22,
      username: 'ahead_datalink',
      password: 'mudar@123'
  };
  
  conn.on('ready', function() {
      conn.sftp(function(err, sftp) {
          if (err) console.log(err);
  
          fileList.forEach(file => {
              let moveFrom = ftpPathInputEl.val() + '/' + file;
              let moveTo = outputPath + '/' +  file;
      
              sftp.fastGet(moveFrom, moveTo , {}, function(downloadError){
                  if(downloadError) throw downloadError;
      
                  console.log(file + " downloaded");
              });
          });
      });
  }).connect(connSettings);
}

let loadData = () => {
  fileList = [
    'N66M_20180101_212438_7446.zip',
    'N66M_20180101_212439_7940.zip',
    'N66M_20180101_212437_9901.zip'
  ];
  fileListEl.empty();
  fileList.forEach(file => fileListEl.append(`<li class="collection-item">${file}</li>`));

  ftpPathLabelEl.addClass('active');
  ftpPathInputEl.val('/stage/ahe/sent');

  hostLabelEl.addClass('active');
  hostInputEl.val('172.26.103.36');

  portLabelEl.addClass('active');
  portInputEl.val('22');

  usernameLabelEl.addClass('active');
  usernameInputEl.val('ahead_datalink');

  passwordLabelEl.addClass('active');
  passwordInputEl.val('mudar@123');
}

