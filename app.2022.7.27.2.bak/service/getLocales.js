const {Service} = require('egg');
const fs = require('fs');
const path = require('path');
const {merge} = require('lodash');
const dirExists = require('../utils/mkdir');

class GetLocales extends Service {
  async getLocales(domainData, callBack, CusLocales, curLan) {
    let lan = this.ctx.cookies.get('lan', {
      signed: false,
    });
    if (curLan){
      lan = curLan;
    }
    const fileName = domainData.fileName;
    const fileBasePath = this.config.localesPath;
    let defaultLocalePath = path.join(fileBasePath, 'defaultLocales', `${lan}.json`);
    if (!fs.existsSync(defaultLocalePath)) {
      defaultLocalePath = path.join(fileBasePath, 'defaultLocales', 'en_US.json');
      const errorData = {
        fileName,
        message: '默认语言中没有此语言，选取英文语言包',
      };
      this.logger.error(JSON.stringify(errorData));
    }
    let defaultLocale = fs.readFileSync(defaultLocalePath, 'UTF-8');
    dirExists(path.join(fileBasePath, fileName));
    let ossLocalePath = '';
    let ossLocale = '';
    if (CusLocales) {
      if (CusLocales[lan]) {
        ossLocalePath = CusLocales[lan];
        ossLocale = await this.ctx.curl(ossLocalePath, {
          dataType: 'json',
          method: 'GET',
          timeout: '30000',
        });
      }
    }
    let mergeLocale = {};
    try{
      defaultLocale = JSON.parse(defaultLocale);
    }catch (e) {
      const errorData = {
        fileName,
        message: '默认语言包转换json失败',
      };
      this.logger.error(JSON.stringify(errorData));
    }
    let ossLocaleJSON = ossLocale.data;
    if(typeof ossLocale.data === 'String'){
      try{
        ossLocaleJSON = JSON.parse(ossLocale.data);
      }catch (e) {
        const errorData = {
          fileName,
          message: '客户自定义语言包转换json失败',
        };
        this.logger.error(JSON.stringify(errorData));
      }
    }
    mergeLocale = merge(defaultLocale, ossLocaleJSON);
    fs.writeFile(
      path.join(fileBasePath, fileName, `${lan}.json`),
      JSON.stringify(mergeLocale),
      (error) => {
        if (error) {
          callBack({
            code: 1,
            msg: '语言包保存失败',
          });
        } else {
          callBack({
            code: 0,
            msg: '语言包保存成功',
          });
        }
      },
    );
  }
}

module.exports = GetLocales;
