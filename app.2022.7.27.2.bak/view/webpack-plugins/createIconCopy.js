const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const crypto = require('crypto');
const iconThemePath = path.join(__dirname, '../iconTheme');
const domain = 'https://chaindown-oss.oss-cn-hongkong.aliyuncs.com/static/';
const outPutDir = path.join(__dirname, '../iconThemeCopy');

const iconCopyMap = {};

function createFiles() {
  rimraf.sync(outPutDir);
  fs.mkdirSync(outPutDir);
  const dirs = fs.readdirSync(iconThemePath);
  dirs.forEach((item) => {
    const iconKeys = item.split('.');
    const suffix = iconKeys[1];
    const iconKey = iconKeys[0];
    const source = fs.readFileSync(path.join(iconThemePath, item));
    const md5sum = crypto.createHash('md5');
    md5sum.update(source);
    const md5 = md5sum.digest('hex');
    iconCopyMap[iconKey] = `${domain}${iconKey}/${md5}.${suffix}`;
    fs.writeFileSync(path.join(outPutDir, `${md5}.${suffix}`), source, 'utf-8');
  });
  fs.writeFileSync(path.join(outPutDir, `iconMap.json`), JSON.stringify(iconCopyMap), 'utf-8');
}

createFiles();
