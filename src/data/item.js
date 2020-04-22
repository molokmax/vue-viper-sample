
const data = [
  { id: 1, cardId: 1, name: 'test item name 1' },
  { id: 2, cardId: 1, name: 'test item name 2' },
  { id: 3, cardId: 1, name: 'test item name 3' },
  { id: 4, cardId: 1, name: 'test item name 4' },

  { id: 5, cardId: 2, name: 'test item name 5' },
  { id: 6, cardId: 2, name: 'test item name 6' },
  { id: 7, cardId: 2, name: 'test item name 7' },

  { id: 8, cardId: 3, name: 'test item name 8' },
  { id: 9, cardId: 3, name: 'test item name 9' },
  { id: 10, cardId: 3, name: 'test item name 10' },
  { id: 11, cardId: 3, name: 'test item name 11' },

  { id: 12, cardId: 4, name: 'test item name 12' },
  { id: 13, cardId: 4, name: 'test item name 13' }
]

let lastId = data.sort(x => x.id)[data.length-1].id

const store = {
  get(cardId) { 
    let result = data.filter(x => x.cardId === cardId)
    return Promise.resolve(result)
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
