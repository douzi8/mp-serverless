const path = require("path");
const { promisify } = require("util");
const fs = require("fs");
const { values, some, forOwn } = require("lodash");

let appEntryFile = {};

const context = path.resolve();
const CLIENT = "src/client";
const srcClientContext = path.resolve(CLIENT);

async function readJsonFile(filepath) {
  const config = await promisify(fs.readFile)(filepath, "utf8");

  return JSON.parse(config);
}

// 相对地址
const RELATIVE_REG = /^\.\.?\//;

async function setPageEntry(filepath, entry) {
  try {
    const { usingComponents } = await readJsonFile(filepath);

    if (!usingComponents) return;

    // 全部处理成文件绝对地址
    const components = [];

    forOwn(usingComponents, item => {
      if (path.isAbsolute(item)) {
        components.push(path.join(srcClientContext, item));
        return;
      }

      if (RELATIVE_REG.test(item)) {
        components.push(path.join(path.dirname(filepath), item));
        return;
      }

      // node_modules模块
      components.push(path.join(context, "node_modules", item));
    });

    for (const item of components) {
      entry.add(path.relative(context, item));
    }

    // 递归遍历
    await Promise.all(
      components.map(item => {
        return setPageEntry(`${item}.json`, entry);
      })
    );
  } catch (e) {
    // eslint-disabled
  }
}

// 获取入口文件
async function getAppEntry() {
  const entry = new Set();
  const appConfig = await readJsonFile(path.join(srcClientContext, "app.json"));

  entry.add(path.join(CLIENT, "app"));

  if (appConfig.pages) {
    // 循环遍历每个页面的usingComponents
    for (const page of appConfig.pages) {
      entry.add(path.join(CLIENT, page));

      await setPageEntry(path.join(srcClientContext, `${page}.json`), entry);
    }
  }

  const appEntry = {};

  for (const item of entry) {
    appEntry[item.replace(/^src\/client\//, "")] = `./${item}`;
  }

  appEntryFile = values(appEntry).filter(item => {
    return item.startsWith("./node_modules");
  });

  return appEntry;
}

/**
 * 排除入口文件
 */
function testNodeModules(module) {
  const { userRequest } = module;

  if (!userRequest) return false;

  const relative = path.relative(process.cwd(), userRequest);

  // 排除程序入口文件的node_modules
  if (relative.startsWith("node_modules/")) {
    return !some(appEntryFile, item => item === module.rawRequest);
  }

  return false;
}

/**
 * 获取云函数目录入口
 */
async function getFunctionsEntry() {
  const functionDir = path.resolve("src/functions");
  let files = await promisify(fs.readdir)(functionDir, {
    withFileTypes: true
  });

  files = files.filter(item => !item.isDirectory());

  const entry = {};

  for (const file of files) {
    const fileName = path.basename(file.name, ".ts");

    entry[`${fileName}/index`] = `./src/functions/${fileName}`;
  }

  return entry;
}

module.exports = {
  getAppEntry,
  testNodeModules,
  getFunctionsEntry
};
