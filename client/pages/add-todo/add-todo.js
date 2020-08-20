import { invokeFunction } from '../../lib/serverless';

const app = getApp();

Page({
  data: {
    inputValue: '',
  },

  onBlur(e) {
    this.setData({
      inputValue: e.detail.value,
    });
  },

  async add() {
    my.showLoading()

    await invokeFunction({
      name: 'todo',
      url: 'todo/create',
      data: {
        text: this.data.inputValue,
        completed: false,
      }
    })

    my.hideLoading()

    my.navigateBack();
  },
  async cloudInvoke () {
    const res = await invokeFunction({
      name: 'todo',
      url: 'cloud/qrcodeCreate',
      data: {
        urlParam: 'pages/todos/todos',
        describe: '我的二维码描述',
        queryParam: 'key=value'
      }
    })
  }
});
