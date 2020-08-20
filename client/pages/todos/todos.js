import { changeCloudSpace, invokeFunction } from '../../lib/serverless';


Page({
  // 声明页面数据
  data: {},
  // 监听生命周期回调 onLoad
  async onLoad() {
    this.isFirstShow = true
    this.getToDoList()
  },
  // 监听生命周期回调 onShow
  onShow() {
    if (this.isFirstShow) {
      this.isFirstShow = false
      return
    }

    this.getToDoList()
  },
  // 点击标题可以切换空间
  onTitleClick() {
    changeCloudSpace();
  },

  async getToDoList () {
    const todoList = await invokeFunction({
      name: 'todo',
      url: 'todo/list'
    })

    this.setData({ todos: todoList });
  },

  // 事件处理函数
  async onTodoChanged(e) {
    const id = e.currentTarget.dataset.id;
    const completed = e.detail.value

    my.showLoading()

    await invokeFunction({
      name: 'todo',
      url: 'todo/update',
      data: {
        _id: id,
        completed
      }
    })

    const { todos } = this.data

    this.setData({
      todos: todos.map(item => {
        if (item._id === id) {
          return {
            ...item,
            completed
          }
        }

        return item
      })
    })

    my.hideLoading()
  },

  addTodo() {
    // 进行页面跳转
    my.navigateTo({ url: '../add-todo/add-todo' });
  },
});
