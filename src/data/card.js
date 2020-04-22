// import CardApiModel from './CardApiModel'

const data = [
  { id: 1, number: 11, name: 'test name 1', description: 'test description 1' },
  { id: 2, number: 12, name: 'test name 2', description: 'test description 2' },
  { id: 3, number: 13, name: 'test name 3', description: 'test description 3' },
  { id: 4, number: 14, name: 'test name 4', description: 'test description 4' }
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
