import persist from '../../../../data/storage'

import ItemDomainModel from './ItemDomainModel'
import ItemApiModel from '../../../../data/ItemApiModel'

import BaseInteructor from '../../../BaseInteructor'

class Inteructor extends BaseInteructor {

  getItems(cardDomainModel) {
    return persist.items.get(cardDomainModel.id).then(data => {
      let result = data.map(x => this.apiToDomainModel(x))
      return result
    })
  }

  onMasterRecordSelected(cardDomainModel) {
    let eventName = this.presenter.eventNames.cardSelected
    return this.presenter.fireEvent(eventName, cardDomainModel)
  }

  onMasterRecordVer2Selected(cardDomainModel) {
    return persist.items.get(cardDomainModel.id).then(results => {
      let eventName = this.presenter.eventNames.cardSelectedVer2
      let args = {
        selectedCard: cardDomainModel,
        items: results.map(x => this.apiToDomainModel(x))
      }
      return this.presenter.fireEvent(eventName, args)
    })
  }

  addNewItem(domainModel) {
    let itemApiModel = this.domainToApiModel(domainModel)
    return persist.items.add(itemApiModel).then(itemApiResult => {
      return this.apiToDomainModel(itemApiResult)
    })
  }

  deleteItem(domainModel) {
    let itemApiModel = this.domainToApiModel(domainModel)
    return persist.items.delete(itemApiModel.id).then(() => {
      return Promise.resolve(domainModel)
    })
  }

  updateItem(domainModel) {
    let itemApiModel = this.domainToApiModel(domainModel)
    return persist.items.update(itemApiModel).then(itemApiResult => {
      return this.apiToDomainModel(itemApiResult)
    })
  }
  
  domainToApiModel(domainModel) {
    let result = new ItemApiModel();
    result.id = domainModel.id;
    result.cardId = domainModel.cardId;
    result.name = domainModel.name;
    return result;
  }
  
  apiToDomainModel(apiModel) {
    let result = new ItemDomainModel();
    result.id = apiModel.id;
    result.cardId = apiModel.cardId;
    result.name = apiModel.name;
    return result;
  }
}

export default Inteructor
