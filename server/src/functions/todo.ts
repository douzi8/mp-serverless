import util from "util";
import Todo from "../services/todo"
import Cloud from '../services/cloud'

async function entry(ctx) {
  const { args, logger } = ctx;
  const { data, url } = args;
  const live = new Todo(ctx)
  const cloud = new Cloud(ctx)

  let res;
  switch (url) {
    case 'todo/list':
      res = await live.getList();
      break;
    case 'todo/create':
      res = await live.create(data);
      break;
    case 'todo/update':
      res = await live.update(data);
      break;
    case 'cloud/qrcodeCreate':
      //res = await ctx.cloud.base.qrcode.create(data)
      res = await cloud.qrcodeCreate(data)
      break;
    default:
      throw new Error(`缺少对应的action: ${url}`)
  }

  //响应日志
  logger.info(
    `function response:`,
    util.inspect(res, {
      depth: 3,
      breakLength: Infinity
    })
  );

  return res;
}
export default entry;