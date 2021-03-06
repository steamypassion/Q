const { app, Menu } = require('electron');
const path = require('path');
const openAboutWindow = require('about-window');

function setMainMenu(mainWindow, initializeMixerWindow) {

  const template = [
    {
      label: app.getName(),
      submenu: [
        {
          role: 'aboot',
          label: 'Aboot Q',
          click: () => openAboutWindow.default({
            'icon_path': path.join(app.getAppPath(), 'public/icons/icon.png'),
            license: 'Creative Commons (BY-NC-SA 4.0)',
            description: 'Nodular Synthesizer/Sequencer'
          })
        },
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            try {
              mainWindow.webContents.send('QEvents', 'quit');
            } catch (err) {
              app.quit();
            }
          }
        }
      ]
    }, {
      label: 'File',
      submenu: [
        {
          label: 'New',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.send('QEvents', 'new');
          }
        }, {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            mainWindow.webContents.send('QEvents', 'open');
          }
        }, {
          type: 'separator'
        }, {
          label: 'Save As...',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            mainWindow.webContents.send('QEvents', 'saveAs');
          }
        }
      ]
    }, {
      label: 'Edit',
      submenu: [
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          click: () => {
            mainWindow.webContents.send('QEvents', 'selectAll');
          }
        }
      ]
    }, {
      label: 'View',
      submenu: [
        {
          label: 'Visualizer',
          submenu: [{
            label: 'Off',
            click: () => {
              mainWindow.webContents.send('QEvents', 'visualizerOff');
            }
          }, {
            label: 'Waveform',
            click: () => {
              mainWindow.webContents.send('QEvents', 'visualizerWaveform');
            }
          }, {
            label: 'Bars',
            click: () => {
              mainWindow.webContents.send('QEvents', 'visualizerBars');
            }
          }]
        }, {
          label: 'Mixer',
          accelerator: 'CmdOrCtrl+M',
          click: () => {
            initializeMixerWindow();
          }
        }
      ]
    }, {
      role: 'window',
      submenu: [
        {role: 'close'},
        {role: 'minimize'},
        {role: 'zoom'},
        {type: 'separator'},
        {role: 'front'},
      ]
    }, {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() { 
            require('electron').shell.openExternal('https://github.com/bocasfx/Q');
          }
        }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

module.exports = {
  setMainMenu
};
