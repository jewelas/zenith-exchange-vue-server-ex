import { imgMap } from 'BlockChain-ui/utils';
import imgMapObj from '@/utils/imgMap.json';

if (!window.imgMap) {
  window.imgMap = {};
}
window.imgMap.slyAgentIcon1 = '/static/img/1/6160b6c819570c146b5a52311aa96a8d.png';
window.imgMap.slyAgentIcon2 = '/static/img/1/467e67b509c31ad0b4e17cbdfa221fcc.png';
window.imgMap.slyAgentIcon3 = '/static/img/1/a54d2e090359846674986ead4309c747.png';
window.imgMap.slyAgentIcon4 = '/static/img/1/7a3574311c05316c362a6a202c4b350a.png';
window.imgMap.ipfsBanner = '/static/img/1/45281ffba23997928bb107df4b1a8660.png';
window.imgMap.ipfsBannerH5 = '/static/img/1/3ddabcbd9e701601814496d4e5fe7d2f.png';
window.imgMap.ieotitleIcon = '/static/img/1/77a7828836274974e0284951bd630f9c.png';

const imgMapSlove = imgMap(imgMapObj[1], process.env.BASE_URL);

export { imgMapSlove as imgMap };

export {
  setCoMarket,
  setDefaultMarket,
  setLeverDefaultMarket,
  logImg,
  add, // 加法
  cut, // 减法
  division, // 乘法
  nul, // 除法3
  fixRate,
  formatTime,
  fixD,
  diff,
  lastD,
  fixUrl,
  fixInput,
  getScript,
  getComplexType,
  getTime,
  timeFn,
  fixFloat,
  getHex,
  routerEnv,
  colorMap,
  myStorage,
  browser,
  getLocationLang,
  getCoinShowName,
  thousandsComma,
  getCountryList,
  templateConfig,
  setCookie,
  getCookie,
  removeCookie,
} from 'BlockChain-ui/utils';
