const fs = require('fs');
const path = require('path');
const { GraphQLClient } = require('graphql-request');
const dirExists = require('../utils/mkdir');
let timer = null;

const client = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    Authorization: 'Bearer e63f0e10a3a0c779c9f14feadd4030399df6aead',
  },
});

function getDefaultLocale(schedule, localePath, logger) {
  const fileBasePath = localePath;
  dirExists(path.join(fileBasePath, 'defaultLocales'));
  const query = `{
          repository(owner:"chainup-fe", name:"locales"){
            folder:object(expression: "master:web") {
              ... on Tree {
                entries {
                  name
                  object{
                    ... on Blob{
                      text
                    }
                  }
                }
              }
            }
          }
        }`;
  client.request(query).then((data) => {
    let list = [];
    try {
      list = data.repository.folder.entries;
    } catch (e) {
      logger.error(JSON.stringify({
        message: 'github语言列表错误', // 描述
      }));
    }
    logger.error(JSON.stringify({
      message: 'github获取默认语言包成功', // 描述
    }));
    schedule.disable = false;
    timer = clearTimeout(timer);
    list.forEach((item) => {
      const { name } = item;
      const content = item.object.text;
      if (content) {
        fs.writeFileSync(
          path.join(fileBasePath, 'defaultLocales', name),
          content,
        );
      }
    });
  }).catch(() => {
    schedule.disable = true;
    timer = clearTimeout(timer);
    setTimeout(() => {
      logger.error(JSON.stringify({
        message: 'github获取默认语言包失败，暂停定时任务，5秒后执行重新获取', // 描述
      }));
      getDefaultLocale(schedule, localePath, logger);
    }, 5000)
  });
}

module.exports = getDefaultLocale;
