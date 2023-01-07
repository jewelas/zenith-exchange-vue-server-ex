const os = require('os');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const tinify = require("tinify");
const tokens = [
  "R8MgRTNlFPdyNSLj8cyjHL2KdQKQzDQk",
  'cGl31wbDmznvDQlv9GdVl1M5n1mtM7rQ',
  'QpRqXYWJW7ms56mymvqHt7rTp8XsbdKv',
  'XQV5cNvcz0gwZnDGNTYl8gsqdVmgt17w ',
  'xVbsX847rkG0V7Mz4T39rsyjdhRcnsYr'];
let count = 0;
const imgPath = path.join(__dirname, '../imgTheme');
const tinyImgMapPath = path.join(__dirname, '../tinyImgMap.json');
let tinyImgMap = {};
try{
  tinyImgMap = JSON.parse(fs.readFileSync(tinyImgMapPath));
}catch (e) {
  //console.log(e);
}
let splitStr = '/';
if(os.platform().indexOf('win') > -1){
  splitStr = '\\';
}

function checkTinify(){
  tinify.key = tokens[count];
  tinify.validate(function(err) {
    count++;
    if (err instanceof tinify.AccountError) {
      if(count <= tokens.length){
        checkTinify();
      }else{
        throw err;
      }
    }
    if(500 - tinify.compressionCount > 20){
      tinyImage();
    }else{
      checkTinify();
    }
  });
}

checkTinify();

function tinyImage() {
  const dirs = fs.readdirSync(imgPath);
  dirs.forEach((dir) => {
    if(!fs.statSync(path.join(imgPath, dir)).isDirectory()) return;
    const imgs = fs.readdirSync(path.join(imgPath, dir));
    if(!tinyImgMap[dir]){
      tinyImgMap[dir] = {};
    }
    imgs.forEach((item) => {
      fs.readFile(path.join(imgPath, dir, item), (err, sourceData) => {
        if (err) throw err;
        let md5sum = crypto.createHash('md5');
        md5sum.update(sourceData);
        let md5 = md5sum.digest('hex');
        if(!tinyImgMap[dir][md5]){
          tinify.fromBuffer(sourceData).toBuffer(function(err, resultData) {
            if (err instanceof tinify.AccountError) {
              checkTinify();
              return;
            }
            let md5sum = crypto.createHash('md5');
            md5sum.update(resultData);
            let md5 = md5sum.digest('hex');
            tinyImgMap[dir][md5] = true;
            fs.writeFileSync(tinyImgMapPath, JSON.stringify(tinyImgMap));
            fs.writeFileSync(path.join(imgPath, dir, item), resultData);
            console.log(`${path.join(imgPath, dir, item)} is ready`)
          });
        }
      });
    })
  });
}
