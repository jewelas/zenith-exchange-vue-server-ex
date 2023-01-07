const { Service } = require('egg');
const fs = require('fs');
const path = require('path');
const dirExists = require('../utils/mkdir');

class setSiteMap extends Service {
  async setSiteMap(domainData, callBack, setXmlPath) {
    const fileBasePath = path.join(this.config.templatePath, this.ctx.request.header.host);
    dirExists(fileBasePath);
    this.ctx.curl(setXmlPath, {
      dataType: 'xml',
      method: 'GET',
      timeout: '30000',
    }).then((res) => {
      if (res) {
        fs.writeFile(`${fileBasePath}/sitemap.xml`, res.data.toString(), (error) => {
          if (error) {
            callBack({
              code: 1,
              msg: '数据保存失败',
            });
          } else {
            callBack({
              code: 0,
              msg: '数据保存成功',
              data: res.data,
            });
          }
        });
      } else {
        callBack({
          code: 1,
          msg: '数据获取失败',
        });
      }
    }).catch((err) => {
      callBack({
        code: 1,
        msg: '数据获取失败',
        content: err,
      });
    });
  }
}
module.exports = setSiteMap;
