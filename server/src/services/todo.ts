import Context from './context'

class Todo extends Context {
  async getList() {
    const { mpserverless } = this

    const { result } = await mpserverless
      .db
      .collection('todo')
      .find()

    return result || []
  }

  async create(item) {
    const { mpserverless } = this

    const { result } = await mpserverless
      .db
      .collection('todo')
      .insertOne(item)

    return result
  }

  async update(item) {
    const { mpserverless } = this
    const { result } = await mpserverless
      .db
      .collection('todo')
      .updateOne({
        _id: item._id
      }, {
        $set: {
          completed: item.completed
        }
      })

      return result
  }
}

export default Todo