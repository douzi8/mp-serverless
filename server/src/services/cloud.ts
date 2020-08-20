import Context from './context'

class Cloud extends Context {
  async qrcodeCreate(data) {
    const { cloud } = this

    const result = await cloud.base.qrcode.create(data)

    return result
  }
}

export default Cloud