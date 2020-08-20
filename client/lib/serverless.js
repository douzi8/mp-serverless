import MPServerless from "@alicloud/mpserverless-sdk";
import { memoize, throttle } from "lodash-es";

async function authorize() {
  const res = await my.serverless.user
    .authorize({
      authProvider: "alipay_openapi"
    })
    .catch(() => {
      return {
        success: false
      };
    });

  if (res.success) {
    return true;
  }

  authorizeCache.cache.clear();

  return Promise.reject(new Error("用户信息获取失败"));
}

/**
 * 获取用户信息
 * @example
 * getUserInfo()
 */
const authorizeCache = memoize(authorize);

/**
 * @example
 * await invokeFunction({
 *   name: "todo",
 *   url: "todo/list",
 *   // 可为空
 *   data: {}
 * });
 */
export async function invokeFunction(options) {
  await authorizeCache();
  const { name, url, data } = options;
  console.log(`function.invoke ${url} request:`, data);
  const res = await my.serverless.function.invoke(name, {
    url,
    data
  });
  if (res.success) {
    console.log(`function.invoke ${url} response:`, res.result);
    return res.result;
  }
  console.log(`function.invoke ${url} error:`, res);
  return Promise.reject(res);
}

// 修改成自己小程序的appId
const appId = "2021001136614025";

/**
 * 这里的代码需要替换成对应阿里云账号的空间配置
 */
const serverlessConfig = {
  local: {
    spaceId: "d3256972-e23e-4eb6-9bea-123456",
    clientSecret: "DaDGmRAJ5Nx8Ec59/hVtww=="
  },
  dev: {
    spaceId: "d3256972-e23e-4eb6-9bea-123456",
    clientSecret: "DaDGmRAJ5Nx8Ec59/hVtww=="
  },
  test: {
    spaceId: "c8c5bb53-3da8-4129-8be4-123456",
    clientSecret: "MA5S3CHso1uZhLIrWnoijg=="
  },
  prod: {
    spaceId: "3f34066d-a939-4990-a0a6-123456",
    clientSecret: "+3rG6lqWZi4Y84O6cmrOMw=="
  }
};

/**
 * 管理员,切换小程序空间
 */
async function changeCloudSpaceService() {
  // 判断用户当前十分有权限
  const canChange = await invokeFunction({
    name: "admin",
    url: "space/change"
  }).catch(() => false);

  if (!canChange) return;

  const spaces = ["重启小程序", "dev", "test", "prod"];

  if (my.isIDE) {
    spaces.splice(1, 0, "local");
  }

  my.showActionSheet({
    title: "选择小程序Serverless空间",
    items: spaces,
    success: res => {
      // 重启小程序
      if (res.index === 0) {
        my.reLaunch({
          url: `/${getCurrentPages()[0].route}`
        });
        return;
      }

      const space = spaces[res.index];

      if (!space) return;

      // 设置缓存
      my.setStorageSync({
        key: "cloud_space",
        data: space
      });

      // 清空授权缓存
      authorizeCache.cache.clear();

      serverlessInit();

      my.showToast({
        content: `${space}空间切换成功`
      });
    }
  });
}

export const changeCloudSpace = throttle(changeCloudSpaceService, 1000, {
  trailing: false
});

export function serverlessInit() {
  // 默认生产空间
  const env =
    my.getStorageSync({
      key: "cloud_space"
    }).data || "prod";

  const endpoint =
    env === "local" ? "http://localhost:3636" : "https://api.bspapp.com";

  my.serverless = new MPServerless(
    {
      uploadFile: my.uploadFile,
      request: my.request,
      getAuthCode: my.getAuthCode,
      getFileInfo: my.getFileInfo,
      getImageInfo: my.getImageInfo
    },
    {
      appId,
      endpoint,
      ...serverlessConfig[env]
    }
  );

  // 提前授权
  authorizeCache();
}
