// import CardApiModel from './CardApiModel'

const data = [
  { id: 1, cardId: 4, count: 10 },
  { id: 2, cardId: 3, count: 20 },
  { id: 3, cardId: 2, count: 100 },
  { id: 4, cardId: 1, count: 200 }
]

let lastId = data.sort(x => x.id)[data.length-1].id

const store = {
  get() {
    return Promise.resolve(data)
  },
  add(apiModel) {
    lastId++
    apiModel.id = lastId
    data.push(apiModel)
    return Promise.resolve(apiModel)
  },
  update(apiModel) {
    let originalRec = data.find(x => x.id === apiModel.id)
    if (originalRec) {
      for (let key in Object.keys(originalRec)) {
        originalRec[key] = rec[key]
      }
    }
    return Promise.resolve(originalRec)
  },
  delete(id) {
    let index = data.findIndex(x => x.id === id)
    let rec = null
    if (index >= 0) {
      rec = data.splice(index, 1)[0];
    }
    return Promise.resolve(rec)
  }
}

export default store
