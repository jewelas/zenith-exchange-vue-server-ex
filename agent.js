// agent.js
const cp = require('child_process');
const path = require('path');
const fs = require('fs');

module.exports = (agent) => {
  // 在这里写你的初始化逻辑
  if (fs.existsSync(path.join(__dirname, '../exchange-fe-server-static/template/')) && agent.config.env !== 'local') {
    cp.execSync('rm -rf ../exchange-fe-server-static/template/', { cwd: '.' });
  }
  // 也可以通过 messenger 对象发送消息给 App Worker
  // 但需要等待 App Worker 启动成功后才能发送，不然很可能丢失
  agent.messenger.on('egg-ready', () => {
    const defaultLocales = {};
    const locales = {};
    const publicInfo = {};
    agent.messenger.on('get-defaultLocale', (data) => {
      defaultLocales[data.name] = data.value;
    });
    agent.messenger.on('get-Locale', ({ fileName, lan, value }) => {
      if (!locales[fileName]) {
        locales[fileName] = {};
      }
      locales[fileName][lan] = value;
    });
    agent.messenger.on('get-publicInfo', ({ fileName, lan, value }) => {
      if (!publicInfo[fileName]) {
        publicInfo[fileName] = {};
      }
      publicInfo[fileName][lan] = value;
    });
    agent.messenger.on('getLocalesAndSkin', (pid) => {
      agent.messenger.sendTo(pid, 'defaultData', { defaultLocales, locales, publicInfo });
    });
  });
};
