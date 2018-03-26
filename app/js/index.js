const { ipcRenderer } = require('electron');
const { dialog } = require('electron').remote;
const Client = require('ssh2').Client;

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
const saveButtonEl = $('#save-button');

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

saveButtonEl.click(() => {
  M.toast({html: 'Saved!', classes: 'rounded'});
  saveData();
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

  const conn = new Client();
  
  conn.on('ready', () => {
      conn.sftp((err, sftp) => {
          if (err) console.log(err);
  
          fileList.forEach(file => {
              let moveFrom = ftpPathInputEl.val() + '/' + file;
              let moveTo = filePathInputEl.val() + '/' +  file;
      
              sftp.fastGet(moveFrom, moveTo , {}, (downloadError) => {
                  if(downloadError) console.log(downloadError);

                  new Notification('Ftp Downloader',{
                    body: `${file} downloaded`
                  });

                  M.toast({html: file + " downloaded", classes: 'rounded'});
                  console.log(file + " downloaded");
              });
          });
      });
  }).connect(connSettings);

}

let saveData = () => {
  let downloadData = {
    output: filePathInputEl.val(),
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
  
  if(download !== null) {
    fileListEl.empty();
    fileList = download.fileList;
    fileList.forEach(file => fileListEl.append(`<li class="collection-item">${file}</li>`));
    ftpPathLabelEl.addClass('active');
    ftpPathInputEl.val(download.ftpPath);
    filePathInputEl.val(download.output);
  }

  if(config !== null) {
    hostInputEl.val(config.host);
    portInputEl.val(config.port);
    usernameInputEl.val(config.username);
    passwordInputEl.val(config.password);
    hostLabelEl.addClass('active');
    portLabelEl.addClass('active');
    usernameLabelEl.addClass('active');
    passwordLabelEl.addClass('active');
  }
}

