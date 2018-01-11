'use strict'
import path from 'path'
import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron'

import envjs from 'loadenvjs'

// loading .env
const config = envjs({mount: false})
// console.log(config)
process.env.APP_NAME = config.APP_NAME = config.APP_NAME || 'Electron Browser'
config.APP_TITLE = config.APP_TITLE || ''
config.APP_VERSION = '1.1.0'
config.contextmenu = typeof config.contextmenu === 'undefined' ? true : config.contextmenu

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  // vue
  ? `http://localhost:9080`
  // ? path.resolve(path.join(__dirname, 'browser-view.html'))
  : `file://${__dirname}/index.html`

let winOptions = {
  ...config.other,
  frame: !!config.frame,
  title: config.APP_NAME,
  kiosk: config.kiosk,
  transparent: config.transparent,
  useContentSize: config.useContentSize,
  skipTaskbar: config.skipTaskbar
}

function createWindow () {
  mainWindow = null
  /**
   * Initial window options
   */
  var options = Object.assign({
    icon: path.join(__dirname, '../renderer/assets/logo.png'),
    // frame: true,
    title: 'Electron Browser',
    // height: 800,
    // useContentSize: true,
    // width: 1000,
    autoHideMenuBar: true
    // transparent: false,
    // minimizable: true,
    // maximizable: true,
    // fullscreenable: true
  }, winOptions)

  mainWindow = new BrowserWindow(options)

  mainWindow.loadURL(winURL)
  console.log(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

ipcMain.on('close', () => {
  console.log('close')
  console.log(mainWindow.isMaximized())
})

ipcMain.on('reload', (opts) => {
  mainWindow.close()
  if (typeof opts === 'object') {
    Object.assign(winOptions, opts)
  }
  createWindow()
})

ipcMain.on('relaunch', () => {
  app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
  // relaunch不会退出当前应用，需要调用exit或者quit
  app.exit(0)
})

// 设置配置
ipcMain.on('get-config', (event) => {
  // 同步返回
  event.returnValue = config
})

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
