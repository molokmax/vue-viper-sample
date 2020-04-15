const data = [
  {id: 1, userid: 1, name: 'role1' },
  {id: 2, userid: 1, name: 'role2' },
  {id: 3, userid: 2, name: 'role3' },
  {id: 4, userid: 2, name: 'role4' }
]

let lastId = data.sort(x => x.id)[data.length-1].id

const store = {
  get(userId) { 
    const result = data.filter(x => x.userid === userId)
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve(result) }, 1500)
    })
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
