const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const defaultLocal = {};
const defFiles = ['default', 'el', 'en', 'ko', 'ja', 'mn', 'ru'];

rimraf.sync(path.join(__dirname, '../default-locales/'));
fs.mkdirSync(path.join(__dirname, '../default-locales/'));

function resolveFiles(file) {
  delete require.cache[require.resolve(file)]
  let locale = require(file);
  createFiles(locale, defaultLocal);
  defFiles.forEach((item) => {
    fs.writeFileSync(path.join(__dirname, `../default-locales/${item}.js`), `export default ${JSON.stringify(defaultLocal)}`, 'utf-8');
  });
}

function createFiles(locale, defObj){
  const keys = Object.keys(locale);
  keys.forEach((item) => {
    const obj = locale[item];
    if(Object.prototype.toString.call(obj) === '[object Object]'){
      defObj[item] = {};
      createFiles(obj, defObj[item]);
    }else{
      if(Object.prototype.toString.call(obj) === '[object Array]'){
        defObj[item] = [];
      }else{
        defObj[item] = "";
      }
    }
  });
}

resolveFiles('../src/locale/zh_CN.js')
