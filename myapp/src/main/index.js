import { app } from 'electron'

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Load here all startup windows
require('./mainWindow')

