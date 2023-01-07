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
  let argv = {};
  try {
    argv = JSON.parse(process.argv[2]);
  } catch (e) {

  }
  if(argv.buildEnv && !argv.testEnv){
    config.logger = {
      dir: path.join(__dirname, `./../../exchange-fe-server-${argv.buildEnv}-log`),
    };
  }


  return {
    ...config,
  };
};
