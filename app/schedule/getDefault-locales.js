const { getDefaultLocale, getDefaultLocaleConfig } = require('BlockChain-ui/node/schedule/getDefault-locales');

module.exports = {
  schedule: getDefaultLocaleConfig,
  async task(ctx) {
    getDefaultLocale(this.schedule, ctx.logger, ctx);
  },
};
