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
});

downloadBtnEl.click(() => {
  saveData();
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
      host: hostInputEl.val(),
      port: portInputEl.val(),
      username: usernameInputEl.val(),
      password: passwordInputEl.val()
  }
  
  conn.on('ready', function() {
      conn.sftp(function(err, sftp) {
          if (err) console.log(err);
  
          fileList.forEach(file => {
              let moveFrom = ftpPathInputEl.val() + '/' + file;
              let moveTo = filePathInputEl.val() + '/' +  file;
      
              sftp.fastGet(moveFrom, moveTo , {}, function(downloadError){
                  if(downloadError) throw downloadError;
      
                  console.log(file + " downloaded");
              });
          });
      });
  }).connect(connSettings);
}

let saveData = () => {
  let downloadData = {
    output: outputBtnEl.val(),
    ftpPath: ftpPathInputEl.val(),
    fileList: fileList
  }

  let configData = {
    host: hostInputEl.val(),
    port: portInputEl.val(),
    username: usernameInputEl.val(),
    password: passwordInputEl.val()
  }

  localStorage.setItem('download', JSON.stringify(downloadData));
  localStorage.setItem('config', JSON.stringify(configData));
}

let loadData = () => {

  let download = JSON.parse(localStorage.getItem('download'));
  let config = JSON.parse(localStorage.getItem('config'));
  
  fileList = [
    'N66M_20180101_212438_7446.zip',
    'N66M_20180101_212439_7940.zip',
    'N66M_20180101_212437_9901.zip'
  ];
  fileListEl.empty();
  fileList.forEach(file => fileListEl.append(`<li class="collection-item">${file}</li>`));

  ftpPathInputEl.val(download.ftpPath);
  hostInputEl.val(config.host);
  portInputEl.val(config.port);
  usernameInputEl.val(config.username);
  passwordInputEl.val(config.password);
  
  ftpPathLabelEl.addClass('active');
  hostLabelEl.addClass('active');
  portLabelEl.addClass('active');
  usernameLabelEl.addClass('active');
  passwordLabelEl.addClass('active');
}

