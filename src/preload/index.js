import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  setDirectory: (path) => ipcRenderer.send('set-directory', path),
  setWorkspace: (workspace) => ipcRenderer.send('set-workspace', workspace),
  onListDirectoryContent: (callback) => ipcRenderer.on('list-directory-content', (_event,value)=>callback(value)),
  onListWorkspaces: (callback)=> ipcRenderer.on('list-workspaces', (_event,value)=>callback(value))
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
