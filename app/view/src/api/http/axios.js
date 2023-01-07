import axios from 'axios';
import { getCookie, logImg } from '@/utils';
import bus from '../bus';

const ignoreCode = {
  10002: true,
  10003: true,
  10004: true,
  10005: true,
  10006: true,
  10007: true,
  10008: true,
  10009: true,
  10010: true,
  10011: true,
  10012: true,
  10013: true,
  10014: true,
  10015: true,
  10016: true,
  10017: true,
  10018: true,
  10019: true,
  10020: true,
  10021: true,
  10022: true,
  10023: true,
  10024: true,
  10025: true,
  10026: true,
  10027: true,
  10028: true,
  10029: true,
  10030: true,
  10031: true,
  10032: true,
  10033: true,
  10034: true,
  10035: true,
  10036: true,
  10037: true,
  10038: true,
  10039: true,
  10040: true,
  10041: true,
  10043: true,
  10044: true,
  10045: true,
  10046: true,
  10047: true,
  10048: true,
  10049: true,
  10050: true,
  10051: true,
  10052: true,
  10053: true,
  10054: true,
  10055: true,
  10056: true,
  10057: true,
  10058: true,
  10059: true,
  10060: true,
  10061: true,
  10062: true,
  10063: true,
  10065: true,
  10066: true,
  10067: true,
  10068: true,
  10069: true,
  10070: true,
  10071: true,
  10072: true,
  10073: true,
  10074: true,
  10075: true,
  10076: true,
  10077: true,
  10078: true,
  10079: true,
  10080: true,
  10081: true,
  10086: true,
  10087: true,
  10088: true,
  10089: true,
  10090: true,
  10091: true,
  10092: true,
  10093: true,
  10094: true,
  10095: true,
  10096: true,
  10097: true,
  10098: true,
  10099: true,
  10100: true,
  10101: true,
  10102: true,
  10103: true,
  10104: true,
  10200: true,
  10201: true,
  10202: true,
  10203: true,
  10204: true,
  10205: true,
  11001: true,
  101114: true,
  10042: true,
  10064: true,
  0: true,
};
// import md5 from 'js-md5'
const formatTime = (dateTime) => {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  function s(t) {
    return t < 10 ? `0${t}` : t;
  }

  return `${year}-${s(month)}-${s(day)} ${s(hours)}:${s(minutes)}:${s(seconds)}`;
};
// 参数
const formatParams = (acParams = {}) => {
  let data;
  //   const {
  //     org, device, language, platform, timezone, adblock, userAgent, plugins,
  //     sessionStorage, localStorage, indexedDb, touchSupport,
  //     fonts, availableScreenResolution, screenResolution,
  //   } = window.secur;
  //   const securityInfo = JSON.stringify({
  //     id: '',
  //     org: process.env.NODE_ENV === 'development'
  //       ? 'www.fe.com'
  //       : org,
  //     timestamp: formatTime(new Date().getTime()),
  //     userAgent,
  //     availableScreenResolution,
  //     screenResolution,
  //     touchSupport,
  //     sessionStorage,
  //     localStorage,
  //     indexedDb,
  //     plugins,
  //     fonts,
  //     adblock,
  //     client_type: '',
  //     identity: '',
  //     original: device,
  //     device: getCookie('CHFIT_DEVICEID') || '',
  //     ip: '',
  //     ip2region: '',
  //     language,
  //     platform,
  //     browser: '',
  //     browser_version: '',
  //     os: '',
  //     os_version: '',
  //     resolution: '',
  //     timezone,
  //     ctime: '',
  //     mtime: '',
  //   });
  const authObj = {};
  if (window.authData && (Object.prototype.toString.call(window.authData) === '[object Array]')) {
    window.authData.forEach((item) => {
      authObj[item.key] = item.value;
    });
    authObj.log_BSDeviceFingerprint = '1';
  } else {
    authObj.log_BSDeviceFingerprint = '0';
  }
  if (getCookie('dId')) {
    authObj.original = getCookie('dId');
    authObj.log_original = '1';
  } else {
    authObj.log_original = '0';
  }
  if (getCookie('CHFIT_DEVICEID')) {
    authObj.device = getCookie('CHFIT_DEVICEID');
    authObj.log_CHFIT_DEVICEID = '1';
  } else {
    authObj.log_CHFIT_DEVICEID = '0';
  }
  const securityInfo = JSON.stringify(authObj);
  if (Object.prototype.toString.call(acParams) === '[object FormData]') {
    acParams.append('uaTime', formatTime(new Date().getTime()));
    acParams.append('securityInfo', securityInfo);
    data = acParams;
  } else {
    data = { ...acParams };
    data.uaTime = formatTime(new Date().getTime());
    data.securityInfo = securityInfo;
  }
  return data;
};
// 请求头
const formatHeaders = (acHeaders) => {
  let headers = {};
  headers['exchange-token'] = getCookie('token') || 'c5fa97c1140aafea1ef1e84b67503d5e0db18d0ca0ff4819a0ca3f24722407df';
  headers['exchange-client'] = 'pc';
  headers['exchange-language'] = getCookie('lan') || 'zh_CN';
  // headers.device = window.secur.device;
  headers.device = getCookie('CHFIT_DEVICEID') || '';
  // headers['Content-type'] = 'application/x-www-form-urlencoded'
  // headers['exchange-time'] = formatTime(new Date().getTime())
  if (acHeaders) {
    headers = { ...headers, ...acHeaders };
  }
  return headers;
};

const request = function request(prefix, url, headers, params, method, hostType, resolve, reject) {
  return axios({
    url: `${prefix}${url}`, // exchange-web-api线上  vue-api本地
    headers: formatHeaders(headers),
    data: formatParams(params),
    method: method || 'post',
  }).then((data) => {
    if (typeof data.data.code !== 'undefined') {
      if (data.data.code.toString() === '10002') {
        bus.$emit('outUserIsLogin');
      }

      if (!ignoreCode[Number(data.data.code)]) {
        logImg({
          host: window.location.host,
          type: 'webapi connect error',
          path: window.location.href,
          ds: '接口状态码非0',
          api: url,
          data: {
            code: data.data.code,
            msg: data.data.msg,
          },
          t: new Date().getTime(),
        });
      }
    } else {
      logImg({
        host: window.location.host,
        type: 'webapi connect error',
        path: window.location.href,
        ds: '接口没有返回错误码',
        api: url,
        data,
        t: new Date().getTime(),
      });
    }
    resolve(data.data);
  }).catch((err) => {
    logImg({
      host: window.location.host,
      type: 'webapi connect error',
      path: window.location.href,
      api: url,
      ds: '接口不通错误',
      t: new Date().getTime(),
    });
    reject(err);
    throw new Error(`Error:${err}`);
  });
};

const http = ({
  url, headers, params, method, hostType,
}) => {
  let prefix = '';
  switch (hostType) {
    case 'otc':
      prefix = '/fe-otc-api/'; // 场外
      break;
    case 'co':
      prefix = '/fe-co-api/'; // 场內
      break;
    case 'upload':
      prefix = '/fe-upload-api/'; // 上传
      break;
    case 'financing':
      prefix = '/fe-financing-api/'; // 场內
      break;
    case 'fe-increment-api':
      prefix = '/fe-increment-api/'; // 增值业务板块
      break;
    case 'def':
      prefix = '';
      break;
    case 'fe-hashrate-api':
      prefix = '/fe-hashrate-api/';
      break;
    case 'quant':
      prefix = '/fe-quant-api/';
      break;
    default:
      prefix = '/fe-ex-api/'; // 公共和交易所
  }
  return new Promise((resolve, reject) => {
    // if (!window.secur) {
    //   const msec = { org: window.location.host, server: '', sendRemote: false };
    //   window.security.init(msec, (info) => {
    //     window.secur = info;
    //     request(prefix, url, headers, params, method, hostType, resolve, reject);
    //   });
    // } else {

    // }
    request(prefix, url, headers, params, method, hostType, resolve, reject);
  });
};
export default http;
