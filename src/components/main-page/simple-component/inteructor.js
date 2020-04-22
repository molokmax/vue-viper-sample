import persist from '../../../data/storage'

import CardDomainModel from './CardDomainModel'
import CardApiModel from '../../../data/CardApiModel'
import CardCountApiModel from '../../../data/CardCountApiModel'

import BaseInteructor from '../../BaseInteructor'

class Inteructor extends BaseInteructor {

  getCards() {
    let getCardsTask = persist.card.get();
    let getCardCountsTask = persist.cardCount.get();
    return Promise.all([getCardsTask, getCardCountsTask]).then(results => {
      let cards = results[0];
      let counts = results[1];
      let result = cards.map(x => this.apiToDomainModel(x, counts));
      return result;
    })
  }

  addNewCard(domainModel) {
    let cardApiModel = this.domainToCardApiModel(domainModel)
    return persist.card.add(cardApiModel).then(cardApiResult => {
      let cardCountApiModel = this.domainToCardCountApiModel(domainModel)
      cardCountApiModel.cardId = cardApiResult.id
      return persist.cardCount.add(cardCountApiModel).then(cardCountApiResult => {
        let countModels = [cardCountApiResult] // array becouse apiToDomainModel expect array for second param
        return this.apiToDomainModel(cardApiResult, countModels)
      })
    })
  }

  deleteCard(domainModel) {
    let cardApiModel = this.domainToCardApiModel(domainModel)
    let cardCountApiModel = this.domainToCardCountApiModel(domainModel)
    let saveCardTask = persist.card.delete(cardApiModel.id)
    let saveCardCountTask = persist.cardCount.delete(cardCountApiModel.id)
    return Promise.all([saveCardTask, saveCardCountTask]).then(() => {
      return Promise.resolve(domainModel)
    })
  }

  updateCard(domainModel) {
    let cardApiModel = this.domainToCardApiModel(domainModel)
    let cardCountApiModel = this.domainToCardCountApiModel(domainModel)
    let saveCardTask = persist.card.update(cardApiModel)
    let saveCardCountTask = persist.cardCount.update(cardCountApiModel)
    return Promise.all([saveCardTask, saveCardCountTask]).then(results => {
      let apiModel = results[0];
      let countModels = [results[1]] // array becouse apiToDomainModel expect array for second param
      return this.apiToDomainModel(apiModel, countModels)
    })
  }
  
  domainToCardApiModel(domainModel) {
    let result = new CardApiModel();
    result.id = domainModel.id;
    result.number = domainModel.number;
    result.name = domainModel.name;
    result.description = domainModel.description;
    return result;
  }
  
  domainToCardCountApiModel(domainModel) {
    let result = new CardCountApiModel();
    result.id = domainModel.countId;
    result.cardId = domainModel.id;
    result.count = domainModel.count;
    return result;
  }

  apiToDomainModel(cardApiModel, countApiModels) {
    let result = new CardDomainModel();
    result.id = cardApiModel.id;
    result.number = cardApiModel.number;
    result.name = cardApiModel.name;
    result.description = cardApiModel.description;
    let countApiModel = countApiModels.find(x => x.cardId === cardApiModel.id);
    result.countId = countApiModel.id;
    result.count = countApiModel.count;
    return result;
  }
}

export default Inteructor
