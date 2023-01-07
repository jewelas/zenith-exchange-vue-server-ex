const { Service } = require('egg');
const { getSetData } = require('BlockChain-ui/node/utils');

class GetpublicInfo extends Service {
  async getdataSync(domainData, host, currenLan) {
    return getSetData(domainData, host, this, this.config.staticPath, 'common/public_info_v5', currenLan, null, true);
  }

  getdata(domainData, host, currenLan) {
    getSetData(domainData, host, this, this.config.staticPath, 'common/public_info_v5', currenLan, null, true);
  }
}
module.exports = GetpublicInfo;
