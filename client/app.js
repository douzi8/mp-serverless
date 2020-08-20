import "./lib/lodash.polyfill";
import { serverlessInit } from "./lib/serverless";


App({
  /* todos: [
    { text: 'Learning Javascript', completed: true },
    { text: 'Learning ES2016', completed: true },
    { text: 'Learning 支付宝小程序', completed: false },
  ], */
  onLaunch () {
    serverlessInit();
  }
});
