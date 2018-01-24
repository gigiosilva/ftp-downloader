const { ipcRenderer } = require('electron');

let linkSobre = document.querySelector('#link-fechar');

linkSobre.addEventListener('click', () => {
    ipcRenderer.send('fechar-janela-sobre');
});