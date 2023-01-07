const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const crypto = require('crypto');
const imgThemePath = path.join(__dirname, '../imgTheme');
const domain = 'https://chaindown-oss.oss-cn-hongkong.aliyuncs.com/static/';
const ossImgName = 'images';
const outPutDir = path.join(__dirname, '../imgThemeCopy');

const imgCopyMap = {};

function createFiles() {
  rimraf.sync(outPutDir);
  fs.mkdirSync(outPutDir);
  const dirs = fs.readdirSync(imgThemePath);
  dirs.forEach((dir) => {
    if(!fs.statSync(path.join(imgThemePath, dir)).isDirectory()) return
    const imgs = fs.readdirSync(path.join(imgThemePath, dir));
    const dirName = path.join(outPutDir, dir);
    imgCopyMap[dir] = {};
    imgs.forEach((item) => {
      const imgKeys = item.split('.');
      const suffix = imgKeys[1];
      const imgKey = imgKeys[0];
      const source = fs.readFileSync(path.join(imgThemePath, dir, item));
      const md5sum = crypto.createHash('md5');
      md5sum.update(source);
      const md5 = md5sum.digest('hex');
      imgCopyMap[dir][imgKey] = `${md5}.${suffix}`;
      if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName);
      }
      fs.writeFileSync(path.join(dirName, `${md5}.${suffix}`), source, 'utf-8');
    });
    fs.writeFileSync(path.join(dirName, `imgMap.json`), JSON.stringify(imgCopyMap[dir]), 'utf-8');
  });
}

createFiles();

