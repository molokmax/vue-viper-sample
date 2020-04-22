import persist from '../../../data/storage'

import CardDomainModel from './view-component/CardDomainModel'
import CardFullApiModel from '../../../data/CardFullApiModel'

import BaseInteructor from '../../BaseInteructor'

class Inteructor extends BaseInteructor {

  getCards() {
    return persist.cardFull.get().then(data => {
      let result = data.map(x => this.apiToDomainModel(x));
      return result;
    })
  }

  addNewCard(domainModel) {
    let cardApiModel = this.domainToCardApiModel(domainModel)
    return persist.cardFull.add(cardApiModel).then(cardApiResult => {
      return this.apiToDomainModel(cardApiResult)
    })
  }

  deleteCard(domainModel) {
    let cardApiModel = this.domainToCardApiModel(domainModel)
    return persist.cardFull.delete(cardApiModel.id).then(() => {
      return Promise.resolve(domainModel)
    })
  }

  updateCard(domainModel) {
    let cardApiModel = this.domainToCardApiModel(domainModel)
    return persist.cardFull.update(cardApiModel).then(cardApiResult => {
      return this.apiToDomainModel(cardApiResult)
    })
  }
  
  domainToCardApiModel(domainModel) {
    let result = new CardFullApiModel();
    result.id = domainModel.id;
    result.number = domainModel.number;
    result.name = domainModel.name;
    result.description = (domainModel.description || "").replace("test#", "test ");
    result.count = domainModel.count;
    return result;
  }
  
  apiToDomainModel(cardApiModel) {
    let result = new CardDomainModel();
    result.id = cardApiModel.id;
    result.number = cardApiModel.number;
    result.name = cardApiModel.name;
    result.description = (cardApiModel.description || "").replace("test ", "test#");;
    result.count = cardApiModel.count;
    return result;
  }
}

export default Inteructor
