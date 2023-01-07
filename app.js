const util = require('util');
const Transport = require('egg-logger').Transport;
const path = require('path');
const fs = require('fs');
const getDefaultLocale = require('./app/utils/getDefaultLocale');
const cp = require('child_process');
const { getIPAddress } = require('./app/utils/index');
const skinAll = require('BlockChain-ui/node/utils/skin_all.json');

module.exports = (app) => {
  let argv = {};
  try {
    argv = JSON.parse(process.argv[2]);
  } catch (e) {

  }

  if (argv.buildEnv) {
    app.config.buildEnv = argv.buildEnv;
  }

/*  if(app.config.env !== 'local' && !argv.testEnv){
    app.getLogger('errorLogger').set('remote', new RemoteErrorTransport({level: 'ERROR', app}));
   }*/
   // 远程拉取数据 存储地址
  app.config.distPath = path.join(__dirname, './app/dist/');
  if (app.config.env === 'local') {
    app.config.templatePath = path.join(__dirname, './app/public/template/');
  } else {
    if (!fs.existsSync( path.join(__dirname, './../exchange-fe-server-static/'))) {
      fs.mkdirSync( path.join(__dirname, './../exchange-fe-server-static/'));
    }
    app.config.templatePath = path.join(__dirname, './../exchange-fe-server-static/template/');
  }

  if (!fs.existsSync(app.config.templatePath)) {
    fs.mkdirSync(app.config.templatePath);
  }
  app.config.LOCAL_IP = getIPAddress();
  app.config.publicInfo = {};
  app.config.defaultLocales = {};
  app.config.locales = {};
  app.messenger.on('defaultData', ({defaultLocales, locales, publicInfo}) => {
    app.config.defaultLocales = defaultLocales;
    app.config.locales = locales;
    app.config.publicInfo = publicInfo;
  });
  app.messenger.sendToAgent('getLocalesAndSkin', process.pid);
  app.messenger.on('get-defaultLocale', (data) => {
    app.config.defaultLocales[data.name] = data.value;
  });
  app.messenger.on('get-Locale', ({ fileName, lan, value }) => {
    if (!app.config.locales[fileName]) {
      app.config.locales[fileName] = {};
    }
    app.config.locales[fileName][lan] = value;
  });
  app.messenger.on('get-publicInfo', ({ fileName, lan, value }) => {
    if (!app.config.publicInfo[fileName]) {
      app.config.publicInfo[fileName] = {};
    }
    app.config.publicInfo[fileName][lan] = value;
  });
  let serConfig = {};
  try{
    serConfig = JSON.parse(fs.readFileSync(path.join(__dirname, './serverConfig.json'), 'utf-8'));
  }catch (e) {

  }
  if (serConfig.curlHost.indexOf('gateway') === -1){
    app.config.isDocker = false;
  }else{
    app.config.isDocker = true;
  }
  app.config.defaultSkin = skinAll;
  app.ready(async () => {
    app.logger.error(JSON.stringify({
      message: '前端服务开始启动'
    }));
  }); 
  // 关闭前执行
  app.beforeClose(async () => {
    app.logger.error(JSON.stringify({
      message: '前端服务即将关闭'
    }));
  });
};
