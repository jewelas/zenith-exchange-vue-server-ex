const os = require('os');

const getIPAddress = () => {
  const interfaces = os.networkInterfaces();
  let ip = '';
  Object.keys(interfaces).forEach((devName) => {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i += 1) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        ip = alias.address;
      }
    }
  });
  return ip;
};

const defaultLanguages = ['zh_CN', 'en_US', 'ko_KR', 'el_GR', 'mn_MN',
  'ru_RU', 'ja_JP', 'es_ES', 'vi_VN', 'th_TH', 'tr_TR',
  'fr_FR', 'kn_IN', 'nl_NL', 'pt_BR', 'it_IT', 'pl_PL', 'id_ID', 'uk_UA', 'ar_AE'];

module.exports = {
  getIPAddress,
  defaultLanguages,
};
