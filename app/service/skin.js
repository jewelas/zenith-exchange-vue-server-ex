const { Service } = require('egg');
const fs = require('fs');
const dirExists = require('../utils/mkdir');

class GetSkin extends Service {
  async getSkin(domainData, callBack, skinDataPath) {
    const fileBasePath = this.config.skinsPath;
    dirExists(fileBasePath);
    this.ctx.curl(skinDataPath, {
      dataType: 'json',
      method: 'GET',
      timeout: '30000',
    }).then((res) => {
      if (res) {
        fs.writeFile(`${fileBasePath}${domainData.fileName}_skin.json`,
          JSON.stringify(res.data, 'utf8'), (error) => {
            if (error) {
              callBack({
                code: 1,
                msg: 'skin数据保存失败',
              });
            } else {
              callBack({
                code: 0,
                msg: 'skin数据保存成功',
                data: res.data,
              });
            }
          });
      } else {
        callBack({
          code: 1,
          msg: 'skin数据获取失败',
        });
      }
    }).catch((err) => {
      callBack({
        code: 1,
        msg: 'skin数据获取失败',
        content: err,
      });
    });
  }
}
module.exports = GetSkin;
