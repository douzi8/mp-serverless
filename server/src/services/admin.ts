import Context from './context'
import { CHANGE_SPACE } from '../common/config'

class Admin extends Context {
  /**
   * 查询当前用户是否能切换小程序空间
   */
  async canChangeSpace () {
    const userId = await this.getAuthUserId()

    return CHANGE_SPACE.includes(userId)
  }
}

export default Admin