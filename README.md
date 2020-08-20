## 项目启动
1. 模块安装
```
cd client & npm install
cd server & npm install
```
2. 把整个项目导入到支付宝IDE
3. 修改``client/lib/serverless``文件的阿里云空间配置
```javascript
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
```

## 帮助文档
* [小程序Serverless开通](https://opendocs.alipay.com/mini/cloudservice/aban9r)
* [alipay-dev](https://www.npmjs.com/package/alipay-dev)
* [云函数操作](https://help.aliyun.com/document_detail/121998.html?spm=a2c4g.11186623.6.633.2e81564cqLoKVu)
* [云调用](https://opendocs.alipay.com/mini/cloudservice/khf843)