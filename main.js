const { app, BrowserWindow, Menu, shell, session } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;
function createWindow(){
 const win=new BrowserWindow({width:1500,height:950,minWidth:1100,minHeight:700,show:false,backgroundColor:'#E9EEEE',
 webPreferences:{preload:path.join(__dirname,'preload.js'),contextIsolation:true,sandbox:true,nodeIntegration:false,devTools:isDev}});
 win.once('ready-to-show',()=>win.show());
 win.loadFile(path.join(__dirname,'app','index.html'));
 win.webContents.setWindowOpenHandler(({url})=>{shell.openExternal(url);return {action:'deny'};});
 win.webContents.on('will-navigate',(event,url)=>{if(url!==win.webContents.getURL())event.preventDefault();});
}
app.whenReady().then(()=>{session.defaultSession.setPermissionRequestHandler((_wc,_p,cb)=>cb(false));Menu.setApplicationMenu(null);createWindow();app.on('activate',()=>{if(!BrowserWindow.getAllWindows().length)createWindow();});});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit();});
