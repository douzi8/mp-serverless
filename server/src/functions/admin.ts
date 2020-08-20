import util from "util";
import Admin from "../services/admin"

/**
 * 数据库操作文档: https://help.aliyun.com/document_detail/122550.html
 */
async function entry(ctx) {
  const { args, logger } = ctx;
  const { url } = args;
  const admin = new Admin(ctx)
  let res;

  switch (url) {
    case 'space/change':
      res = await admin.canChangeSpace();
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