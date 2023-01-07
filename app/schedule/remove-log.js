const { removeLogConfig, removeLog } = require('BlockChain-ui/node/schedule/remove-log');

module.exports = {
  schedule: removeLogConfig,
  async task(ctx) {
    removeLog(ctx);
  },
};
