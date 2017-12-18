'use strict'
import path from 'path'
import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron'
import {env} from './utils'
import dotenv from 'dotenv'
// loading .env
dotenv.config()
process.env.APP_VERSION = 'v1.0.0'
process.env.APP_NAME = process.env.APP_NAME || 'Electron Browser'
process.env.APP_TITLE = process.env.APP_TITLE || ''
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

const title = process.env.APP_TITLE ? ` - ${process.env.APP_TITLE}` : ''
const appName = (process.env.APP_NAME + ` ${process.env.APP_VERSION}`) + title
let winOptions = {
  frame: env.bool(process.env.frame),
  title: appName,
  kiosk: env.bool(process.env.kiosk),
  transparent: env.bool(process.env.transparent),
  useContentSize: env.bool(process.env.useContentSize),
  skipTaskbar: env.bool(process.env.skipTaskbar)
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

app.on('ready', () => {
  createWindow()
  console.log('app ready')
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
