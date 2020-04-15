const data = [
  { id: 1, name: 'test name1', login: 'login1' },
  { id: 2, name: 'test name2', login: 'login2' },
  { id: 3, name: 'test name3', login: 'login3' },
  { id: 4, name: 'test name4', login: 'login4' }
]

let lastId = data.sort(x => x.id)[data.length-1].id

const store = {
  get() { 
    return Promise.resolve(data)
  },
  add(rec) {
    lastId++
    rec.id = lastId
    data.push(rec)
    return Promise.resolve(rec)
  },
  update(rec) {
    let originalRec = data.find(x => x.id === id)
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
