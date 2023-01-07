const { Controller } = require('egg');
// const fs = require('mz/fs');

module.exports = class extends Controller {
  async index() {
    const apiArr = [
      '/fe-ex-api/',
      '/fe-otc-api/',
      '/fe-co-api/',
    ];
    let isApi = false;
    apiArr.forEach((item) => {
      if (this.ctx.request.url.indexOf(item)) {
        isApi = true;
      }
    });
    if (!isApi) this.ctx.body = { code: 0 };
    // console.log(`${this.config.devUrlProxy.ex}${this.ctx.request.url}`)

    const res = await this.ctx.curl(`${this.config.devUrlProxy.ex}${this.ctx.request.url}`, {
      dataType: 'json',
      method: 'POST',
      timeout: '30000',
      headers: {
        // host,
      },
    });
    if (res.status === 200) {
      this.ctx.body = res.data;
    } else {
      this.ctx.body = { code: 'error' };
      // console.log(res)
    }
  }
};
