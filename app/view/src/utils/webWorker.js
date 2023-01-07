import webworkerMap from '@/assets/js/webworker-map';

let workers = null;

webworkerMap.baseUrl = process.env.BASE_URL;

function worker() {
  if (!workers) {
    workers = new Worker(`/static/web-worker/${webworkerMap.websocket}?fileMap=${JSON.stringify(webworkerMap)}`);
  }
  return workers;
}

export default worker;
