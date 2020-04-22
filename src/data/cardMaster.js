// import CardFullApiModel from './CardFullApiModel'

const data = [
  { id: 1, number: 110, name: 'test name 10', description: 'test 1', count: 321 },
  { id: 2, number: 120, name: 'test name 20', description: 'test 2', count: 654 },
  { id: 3, number: 130, name: 'test name 30', description: 'test 3', count: 987 },
  { id: 4, number: 140, name: 'test name 40', description: 'test 4', count: 112 }
]

let lastId = data.sort(x => x.id)[data.length-1].id

const store = {
  get() { 
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve(data) }, 1500) // emulate long operation
    })
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
