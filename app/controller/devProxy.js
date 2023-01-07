const { Controller } = require('egg');

class devProxy extends Controller {
  async index(ctx) {
    const { url, method, header } = ctx.request;
    const host = this.config.devUrlProxy.ex;
    const ip = this.config.LOCAL_IP;
    header['X-Forwarded-For'] = ip;
    delete header.origin;
    delete header.host;
    delete header.referer;
    const data = await ctx.curl(`${host}${url}`, {
      method,
      headers: header,
      dataType: 'json',
      data: JSON.stringify(ctx.request.body),
    });
    ctx.body = data.res.data;
  }
}

module.exports = devProxy;
