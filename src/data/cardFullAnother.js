// import CardFullApiModel from './CardFullApiModel'

const data = [
  { id: 1, number: 1100, name: 'name #10', description: 'description 1', count: 3210 },
  { id: 2, number: 1200, name: 'name #20', description: 'description 2', count: 6540 },
  { id: 3, number: 1300, name: 'name #30', description: 'description 3', count: 9870 },
  { id: 4, number: 1400, name: 'name #40', description: 'description 4', count: 1120 }
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
