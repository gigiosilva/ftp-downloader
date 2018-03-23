const { ipcRenderer } = require('electron');
const process = require('process');

let linkSobre = document.querySelector('#link-fechar');
let versaoElectron = document.querySelector('#versao-electron');

window.onload = () => {
    versaoElectron.textContent = process.versions.electron;
}

linkSobre.addEventListener('click', () => {
    ipcRenderer.send('fechar-janela-sobre');
});