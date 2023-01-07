const fs = require('fs');
const path = require('path');
const { rootPath, evnConfig, seoHtml } = require('../pathConfig');
const rimraf = require('rimraf');
const crypto = require('crypto');
const { transform } = require('babel-core');
const { find } = require('lodash');

const seoHtmlList = [];
let seos = Object.keys(seoHtml);
seos.forEach((item) => {
  const li = seoHtml[item]
  if(li){
    li.forEach((sitem) => {
      seoHtmlList.push(sitem);
    })
  }
});


const outputPath = path.join(rootPath, 'build');
const distPath = path.join(rootPath, 'dist');

const webWorkerMap = {};

class MoveFiles {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {

    rimraf.sync(outputPath);
    console.log('dir build already clean');
    createEnvDir();
    if (compiler.hooks) {
      const plugin = { name: 'MoveFiles' };
    //  compiler.hooks.emit.tapAsync('afterResolvers', afterPlugins);
      compiler.hooks.afterEmit.tapAsync(plugin, afterEmit);
    } else {
   //   compiler.plugin('afterResolvers', afterPlugins);
      compiler.plugin('after-emit', afterEmit);
    }
  }
}

function afterEmit(compilation, cb) {
  createPath();
  cb();
}

function createPath() {
  const paths = Object.values(evnConfig);
  paths.forEach((value, index) => {
    copyFiles(distPath, value);
  });
}

function copyFiles(dirPath, type) {
  const files = fs.readdirSync(dirPath);
  files.forEach((value, index) => {
    let filePath = path.join(dirPath, value);
    let intoPath = path.join(rootPath, 'build' , type , filePath.replace(path.join(rootPath, 'dist'), ''));
    if (fs.statSync(filePath).isDirectory()){
      if (!fs.existsSync(intoPath)){
        fs.mkdirSync(intoPath);
      }
      copyFiles(filePath, type)
    }else{
      let codeType = /.js|.css|.html/ig.test(value) ? 'UTF-8' : null;
      let fileSource = fs.readFileSync(filePath, codeType);
      let reg = evnConfig.map((item) => `${item}-`);
      let hashValue = `${getIconFontScript(fileSource)}-${value}`;
      let htmlType = value.split('-')[0];
      if(new RegExp(reg.join('|'), 'ig').test(value)){
        if(htmlType !== type){
          return;
        }
        if (/.html/ig.test(value)){
          filePath = path.join(dirPath, value.replace(`${htmlType}-`, ''));
          intoPath = path.join(rootPath, 'build' , type , filePath.replace(path.join(rootPath, 'dist'), ''));
          fileSource = fileSource.replace(/<script[^>]*>[\s\S]*?<\/[^>]*script>/gi, (item) => {
            let val = item;
            if(item.indexOf('iconfont.js') > -1){
              val = item.replace('iconfont.js', `${getIconFontScript(fs.readFileSync(path.join(distPath, 'static/js/iconfont.js'), 'UTF-8'))}-iconfont.js`);
            }
            return val;

          });
        }
      }
      if(value.indexOf('iconfont') > -1){
        filePath = path.join(dirPath, hashValue);
        intoPath = path.join(rootPath, 'build' , type , filePath.replace(path.join(rootPath, 'dist'), ''));
      }
      if (intoPath.indexOf('web-worker') > -1){
        fileSource = transform(fileSource, {
          minified: true,
          comments: false,
        }).code;
        let hashValue = `${getIconFontScript(fileSource)}-${value}`;
        filePath = path.join(dirPath, hashValue);
        intoPath = path.join(rootPath, 'build' , type , filePath.replace(path.join(rootPath, 'dist'), ''));
      }
      const htmlList = seoHtml[type];
      if (htmlList){
        if(htmlList.indexOf(htmlType) > -1){
          let jsSource = find(fs.readdirSync(path.join(distPath, '/js')), (item) => {
            if(item.indexOf(htmlType) > -1){
              return item;
            }
          });
          fileSource = fileSource.replace(`${htmlType}.js`, `js/${jsSource}`);
        }
      }else{
        if(seoHtmlList.indexOf(htmlType) > -1){
          return false;
        }
      }
      fs.writeFileSync(intoPath, fileSource)
    }
  })
}

function getIconFontScript(source){
  let md5sum = crypto.createHash('md5');
  md5sum.update(source);
  let md5 = md5sum.digest('hex');
  return md5;
}

function createEnvDir() {
  const paths = Object.values(evnConfig);
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(path.join(outputPath));
  }
  paths.forEach((value, index) => {
    if (!fs.existsSync(path.join(outputPath, '/', value))) {
      fs.mkdirSync(path.join(outputPath, '/', value));
    }
  });
}

module.exports = MoveFiles;
