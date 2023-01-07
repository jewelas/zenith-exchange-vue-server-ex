const { Controller } = require('egg');
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const { cloneDeep, merge } = require('lodash');
const { mergeSkin } = require('BlockChain-ui/node/utils');
const hostFilter = require('../utils/host-filter');
const { defaultLanguages } = require('../utils/index');

const otherArr = {};

class HomeController extends Controller {
  getLocale(ctx) {
    const code = 0;
    const lan = this.ctx.cookies.get('lan', {
      signed: false,
    });
    let nowHost = this.ctx.request.header.host;
    if (this.config.env === 'local') {
      nowHost = this.config.devUrlProxy.ex;
    }
    // 获取到主域名
    const domain = nowHost.replace(new RegExp(`^${nowHost.split('.')[0]}.`), '');
    const fileName = domain;
    let defaultLocale = {};
    try {
      if (this.config.defaultLocales[`${lan}.json`]) {
        defaultLocale = cloneDeep(this.config.defaultLocales[`${lan}.json`]);
      }
    } catch (e) {
      this.logger.error(JSON.stringify({
        message: '默认语言包clone失败',
      }));
    }
    let locale = {};
    if (this.config.locales[fileName]
      && this.config.locales[fileName][lan]
      && Object.keys(this.config.locales[fileName][lan]).length) {
      locale = this.config.locales[fileName][lan];
    }
    try {
      merge(defaultLocale, locale);
    } catch (e) {
      this.logger.error(JSON.stringify({
        message: 'merge自定义语言包和默认语言包失败',
      }));
    }

    ctx.body = {
      data: defaultLocale,
      code,
    };
  }

  sleep() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  async fePublicInfo(ctx) {
    const lan = ctx.params.id;
    let publicInfo = null;
    let nowHost = this.ctx.request.header.host;
    if (this.config.env === 'local') {
      nowHost = this.config.devUrlProxy.ex;
    }
    // 获取到主域名
    const domain = nowHost.replace(new RegExp(`^${nowHost.split('.')[0]}.`), '');
    const fileName = domain;
    if (defaultLanguages.indexOf(lan) === -1) {
      ctx.status = 404;
      return;
    }
    if (!this.config.publicInfo[fileName]) {
      await this.sleep();
    } else if (!this.config.publicInfo[fileName][lan]) {
      await this.sleep();
    }
    ctx.set('Content-Type', 'application/javascript');
    if (this.config.publicInfo[fileName] && this.config.publicInfo[fileName][lan]) {
      publicInfo = this.config.publicInfo[fileName][lan];
    }
    ctx.body = `window.publicInfo=${JSON.stringify(publicInfo)}`;
  }

  async upDateTemplate(ctx) {
    const domainArr = {};
    const id = this.ctx.request.header.host;
    // id = id.replace('bitwind.com', 'hiex.pro');
    const fileName = id.replace(new RegExp(`^${id.split('.')[0]}.`), '');
    this.fileName = fileName;
    domainArr[fileName] = {
      fileName,
      domainName: `${this.ctx.app.httpclient.agent.protocol}//${id}`,
    };
    if (!otherArr[fileName]) {
      otherArr[fileName] = {
        time: 0,
        sendLoading: false,
      };
    }
    const defaultData = await ctx.service.publictInfo.getdataSync(domainArr[fileName], id);
    const defaultPub = defaultData['common/public_info_v5'];
    if (defaultPub && defaultPub.lan) {
      const currLanMap = {};
      const defaultLanHtmlList = [];
      const currLanList = defaultPub.lan.lanList.map(item => item.id);
      currLanList.forEach((item) => { currLanMap[item] = 1; });
      defaultLanguages.forEach((item) => {
        if (!currLanMap[item]) {
          defaultLanHtmlList.push(item);
        }
      });
      defaultPub.lan.lanList.forEach(async (item) => {
        const locale = item.id;
        const pubData = await ctx.service.publictInfo.getdataSync(domainArr[fileName], id, locale);
        this.publicInfo = pubData['common/public_info_v5'];
        const template = await ctx.renderView(`../dist/${this.config.buildEnv}-index.html`, this.getRenderObj(domainArr[fileName], locale));
        this.logger.error(`${fileName}-${locale}.html 更新成功`);
        this.writeTemplate(template, locale);
      });
      this.publicInfo = defaultPub;
      defaultLanHtmlList.forEach(async (item) => {
        const template = await ctx.renderView('../public/default.html', {
          defLan: defaultPub.lan.defLan,
          lanList: defaultPub.lan.lanList,
        });
        this.writeTemplate(template, item);
        this.logger.error(`默认${fileName}-${item}.html 更新成功`);
      });
      const template = await ctx.renderView('../public/default.html', {
        defLan: defaultPub.lan.defLan,
        lanList: defaultPub.lan.lanList,
      });
      this.writeTemplate(template);
      this.logger.error(`${fileName}-default.html 更新成功`);
    }
    ctx.body = { message: '部署成功', code: 0 };
  }

  fsPublicInfo(lan) {
    const domainArr = {};
    let currLan = this.lan;
    if (lan) {
      currLan = lan;
    }
    const obj = {
      isHave: false,
      data: {},
    };
    let filePath = path.join(this.config.staticPath, `${currLan}-${domainArr[this.fileName].fileName}.json`);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(this.config.staticPath, `${domainArr[this.fileName].fileName}.json`);
    }
    if (fs.existsSync(filePath)) {
      obj.isHave = true;
      obj.data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    return obj;
  }

  async getPublicInfo(v, lan) {
    const domainArr = {};
    const pub = this.fsPublicInfo(lan);
    if (pub.isHave) {
      this.publicInfo = pub.data;
      // 1.2.2 如果无此文件 则发起请求
    } else {
      await this.ctx.service.publictInfo.getdataSync(
        domainArr[this.fileName],
        this.ctx.request.header.host, lan,
      );
    }
    if (v) {
      await this.ctx.service.publictInfo.getdataSync(
        domainArr[this.fileName],
        this.ctx.request.header.host, lan,
      );
    }
  }

  async healthCheck(ctx) {
    ctx.body = 'success';
  }

  async index() {
    const domainArr = {};
    const { ctx } = this;
    // const evn = this.config.env;
    this.publicInfo = {};
    // 处理请求部分
    let nowHost = this.ctx.request.header.host;
    this.logger.error(JSON.stringify({
      message: `服务接入 来源域名${nowHost}`,
    }));
    if (this.config.env === 'local') {
      nowHost = this.config.devUrlProxy.ex;
    }
    // 获取到主域名
    const domain = nowHost.replace(new RegExp(`^${nowHost.split('.')[0]}.`), '');
    const fileName = domain;
    this.fileName = fileName;
    if (!domainArr[fileName]) {
      domainArr[fileName] = {
        fileName,
        domainName: `${ctx.app.httpclient.agent.protocol}//${nowHost}`,
      };
    }
    console.log(domain);
    let clientUrlLan = this.ctx.request.path.split('/')[1];
    if (clientUrlLan === 'none') {
      clientUrlLan = 'en_US';
      this.ctx.redirect(`${domainArr[this.fileName].domainName}/${clientUrlLan}`);
      return;
    }

    if (defaultLanguages.indexOf(clientUrlLan) === -1 && clientUrlLan !== '') {
      ctx.status = 404;
      return;
    }
    this.lan = clientUrlLan;
    const apiData = await this.ctx.service.publictInfo.getdataSync(
      domainArr[this.fileName],
      this.ctx.request.header.host,
      this.lan,
    );
    if (apiData) {
      this.publicInfo = apiData['common/public_info_v5'];
    } else {
      ctx.body = '网络连接有误，请稍后重试';
      return;
    }

    if (this.publicInfo.skin) {
      mergeSkin(this.publicInfo.skin, this.config.defaultSkin);
    }
    // lans.indexOf
    const { lanList } = this.publicInfo.lan;
    let { defLan } = this.publicInfo.lan;
    const language = ctx.header['accept-language'];
    let lanKey = language.split(',')[0];
    const lanListObj = {
      // 英文
      en: 'en_US',
      'en-au': 'en_US',
      'en-ca': 'en_US',
      'en-gb': 'en_US',
      'en-nz': 'en_US',
      'en-us': 'en_US',
      'en-za': 'en_US',
      // 中文简体
      zh: 'zh_CN',
      'zh-cn': 'zh_CN',
      // 中文繁体
      'zh-tw': 'el_GR',
      'zh-hk': 'el_GR',
      // 日语
      ja: 'ja_JP',
      'ja-jp': 'ja_JP',
      // 越南
      vi: 'vi_VN',
      'vi-vn': 'vi_VN',
      // 韩语
      ko: 'ko_KR',
      'ko-kr': 'ko_KR',
      'ko-kp': 'ko_KR',
      // 西班牙
      es: 'es_ES',
      'es-es': 'es_ES',
      'es-mx': 'es_ES',
    };
    const lans = [];
    if (lanList.length) {
      lanList.forEach((item) => {
        lans.push(item.id);
      });
    }
    if (defLan === 'none') {
      lanKey = lanKey.toLowerCase();
      if (lanListObj[lanKey] && lans.indexOf(lanListObj[lanKey]) !== -1) {
        defLan = lanListObj[lanKey];
      } else {
        defLan = 'en_US';
      }
    }
    let template = '';

    if (clientUrlLan) {
      let hasLanguage = false;
      if (Object.prototype.toString.call(lanList) === '[object Array]' && lanList.length) {
        for (let i = 0, len = lanList.length; i < len; i += 1) {
          if (lanList[i].id === clientUrlLan) {
            hasLanguage = true;
          }
        }
      }
      if (hasLanguage) {
        template = await ctx.renderView(`../dist/${this.config.buildEnv}-index.html`, this.getRenderObj(domain));
      } else {
        template = await ctx.renderView('../public/default.html', {
          defLan,
          lanList,
        });
      }
    } else {
      template = await ctx.renderView('../public/default.html', {
        defLan,
        lanList,
      });
    }
    this.writeTemplate(template, this.lan);
    ctx.body = template;
  }

  getRenderObj(domain, lan) {
    this.logger.error(JSON.stringify({
      message: `8888${domain}获取成功`, // 描述
    }));
    const nowHost = this.ctx.request.header.host;
    // 获取到主域名
    const nowDomain = nowHost.replace(new RegExp(`^${nowHost.split('.')[0]}.`), '');
    let securityUrl = this.publicInfo.common_user_behavior;
    if (this.publicInfo.common_user_behavior
      && this.publicInfo.common_user_behavior.length) {
      let str = this.publicInfo.common_user_behavior;
      if (str.indexOf('{deviceId}') !== -1) {
        str = str.replace('{deviceId}', '');
      }
      if (str.indexOf('{custID}') !== -1) {
        str = str.replace('{custID}', nowDomain);
      }
      securityUrl = str;
    }

    const renderObject = {
      title: '',
      description: '',
      keywords: '',
      pageContent: '',
      staticDomain: '',
      eChartsUrl: 'https://cdn.bootcss.com/echarts/4.2.1/echarts.min.js',
      icon: '',
      publicInfo: this.publicInfo,
      isDocker: this.config.isDocker,
      securityUrl,
    };
    let currentLan = this.lan;
    if (lan) {
      currentLan = lan;
    }
    renderObject.lan = currentLan;
    renderObject.staticDomain = this.app.config.staticDomain;
    if (JSON.stringify(this.publicInfo) !== '{}') {
      const publicData = this.publicInfo;
      if (publicData
        && publicData.msg
        && publicData.msg.iconUrl) {
        renderObject.icon = publicData.msg.iconUrl;
        // this.config.siteFile = {
        //   '/favicon.ico': publicData.msg.iconUrl,
        // };
      } else {
        const errorData = {
          domain,
          message: '未拿到publicInfo.msg.iconUrl',
          key: 'publicInfo.msg',
          data: publicData.msg,
        };
        if (!hostFilter.test(domain)) {
          this.logger.error(JSON.stringify(errorData));
        }
      }
      // 设置语言
      // 设置 eCharts地址
      if (currentLan !== 'zh_CN') {
        renderObject.eChartsUrl = 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.2.1/echarts.min.js';
      }
      // 设置title
      let indexHeaderTitle = '';
      if (publicData.indexHeaderTitle) {
        indexHeaderTitle = publicData.indexHeaderTitle[currentLan];
      } else {
        const errorData = {
          domain,
          message: '未拿到publicInfo.indexHeaderTitle',
          key: 'publicInfo.indexHeaderTitle',
          data: publicData.indexHeaderTitle,
        };
        if (!hostFilter.test(domain)) {
          this.logger.error(JSON.stringify(errorData));
        }
      }
      // renderObject.title = indexHeaderTitle;
      // seo
      if (publicData && publicData.seo) {
        const seoLan = publicData.seo;
        const {
          description, keywords, pageContent, title,
        } = seoLan;
        renderObject.description = description || '';
        renderObject.keywords = keywords || '';
        renderObject.pageContent = pageContent || '';
        renderObject.title = title || indexHeaderTitle;
      } else {
        const errorData = {
          domain,
          message: '未拿到publicInfo.seo',
          key: 'publicInfo.data.seo',
          data: publicData.seo,
        };
        if (!hostFilter.test(domain)) {
          this.logger.error(JSON.stringify(errorData));
        }
      }
    }
    return cloneDeep(renderObject);
  }

  writeTemplate(template, lan) {
    const domainPath = path.join(this.config.templatePath, this.ctx.request.header.host);
    let lanPath = domainPath;
    if (lan) {
      lanPath = path.join(
        domainPath,
        lan,
      );
    }

    if (!fs.existsSync(this.config.templatePath)) {
      fs.mkdirSync(this.config.templatePath);
    }
    if (!fs.existsSync(domainPath)) {
      fs.mkdirSync(domainPath);
    }
    const distPath = path.join(this.config.distPath, '*');
    const temPath = `${path.join(this.config.templatePath, this.ctx.request.header.host)}/`;
    if (!fs.existsSync(path.join(temPath, 'css')) && this.config.env !== 'local') {
      cp.execSync(`ln -s ${distPath} ${temPath}`, { cwd: '.' });
    }
    if (!fs.existsSync(lanPath)) {
      fs.mkdirSync(lanPath);
    }
    fs.writeFileSync(path.join(lanPath, 'index.html'), template);
  }

  async setLan(domain) {
    // 取得client一级路由 clientUrlLan
    const clientUrlLan = this.ctx.request.path.split('/')[1];
    // 取得client cookie中语言 clientCookLan
    const clientCookLan = this.ctx.cookies.get('lan');
    const cookieDomain = domain === 'hiex.pro' ? 'bitwind.com' : domain;
    const dLan = 'en_US';
    const reg = /^[a-z]{2}_[A-Z]{2}$/;
    if (this.publicInfo
      && this.publicInfo.lan) {
      // 针对 publicInfo => lan => defLan 兼容处理
      let serverDefLan = dLan;
      if (this.publicInfo.data.lan.defLan) {
        serverDefLan = this.publicInfo.data.lan.defLan;
      } else {
        const errorData = {
          domain,
          message: `未拿到publicInfo.lan.defLan对象, 语言强制转为${serverDefLan}`,
          key: 'publicInfo.lan.defLan',
          data: this.publicInfo.lan.defLan,
        };
        if (!hostFilter.test(domain)) {
          this.logger.error(JSON.stringify(errorData));
        }
      }

      // 针对 publicInfo => lan => lanList 兼容处理
      let severLanList = [];
      if (this.publicInfo.lan.lanList instanceof Array) {
        severLanList = this.publicInfo.lan.lanList;
      } else {
        const errorData = {
          domain,
          message: '未拿到publicInfo.lan.lanList对象, 转为[]',
          key: 'publicInfo.lan.lanList',
          data: this.publicInfo.lan.lanList,
        };
        if (!hostFilter.test(domain)) {
          this.logger.error(JSON.stringify(errorData));
        }
      }

      // 处理数据 lans
      const lans = [];
      if (severLanList.length) {
        severLanList.forEach((item) => {
          lans.push(item.id);
        });
      } else {
        lans.push(serverDefLan);
      }
      // 如果url中的语言合法，则同步cookie
      if (lans.indexOf(clientUrlLan) !== -1) {
        this.ctx.cookies.set('lan', clientUrlLan, {
          httpOnly: false,
          domain: cookieDomain,
        });
      } else {
        const lan = lans.indexOf(clientCookLan) !== -1 ? clientCookLan : serverDefLan;
        let redirectUrl = '';
        if (reg.test(clientUrlLan)) {
          const vu = this.ctx.request.url.split(`/${clientUrlLan}`)[1];
          redirectUrl = vu;
        } else {
          redirectUrl = this.ctx.request.url;
        }
        this.ctx.redirect(`/${lan}${redirectUrl}`);
      }

      this.lan = clientUrlLan;
    } else {
      const errorData = {
        domain,
        message: `未拿到publicInfo.lan对象, 语言强制转为${dLan}`,
        key: 'publicInfo.lan',
        data: this.publicInfo.lan,
      };
      if (!hostFilter.test(domain)) {
        this.logger.error(JSON.stringify(errorData));
      }
      if (clientUrlLan === dLan) {
        this.ctx.cookies.set('lan', dLan, {
          httpOnly: false,
          domain: cookieDomain,
        });
      } else {
        let redirectUrl = '';
        if (reg.test(clientUrlLan)) {
          const vu = this.ctx.request.url.split(`/${clientUrlLan}`)[1];
          redirectUrl = vu;
        } else {
          redirectUrl = this.ctx.request.url;
        }
        this.ctx.redirect(`/${dLan}${redirectUrl}`);
      }
      this.lan = clientUrlLan;
    }
  }
}

module.exports = HomeController;
