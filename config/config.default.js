/* eslint valid-jsdoc: "off" */


const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   * */
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_1572334094719_3964`;

  // add your middleware config here
  config.middleware = ['compress', 'conditional', 'etag'];

  config.compress = {
    threshold: 1024,
  },

  config.static = {
    prefix: '/',
    gzip: true,
    maxAge: 365 * 24 * 60 * 60,
    usePrecompiledGzip: true,
    dir: path.join(__dirname, '../app/dist'),
  };

  config.logger = {
    disableConsoleAfterReady: false, // 在正式环境下，默认会关闭终端日志输出 true为关闭，false为开启
  };

  config.view = {
    root: [
      path.join(__dirname, '../app/dist'),
      path.join(__dirname, '../app/public/'),
    ].join(','),
    mapping: {
      '.html': 'nunjucks',
    },
  };

  // 禁用csrf攻击预警
  config.security = {
    csrf: {
      enable: false
    }
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.devUrlProxy = {
    ex: 'https://www.xfnh.com',
    otc: 'http://dev10otc.chaindown.com',
    co: 'http://dev10co.chaindown.com'
  }

  return {
    ...config,
    ...userConfig,
  };
};
