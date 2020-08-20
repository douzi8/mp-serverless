import { Log } from '../types'

class Context {
  mpserverless: any;
  logger: Log;
  httpclient: any;
  cloud: any;
  private authUserId: string;

  constructor(ctx) {
    this.mpserverless = ctx.mpserverless;
    this.logger = ctx.logger;
    this.httpclient = ctx.httpclient;
    this.cloud = ctx.cloud;
  }
  async getAuthUserId() {
    const { mpserverless } = this;
    if (!this.authUserId) {
      const userInfo = await mpserverless.user.getInfo();
      this.authUserId = userInfo.user.oAuthUserId;
    }
    return this.authUserId
  }
}

export default Context