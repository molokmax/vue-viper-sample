
import BasePresenter from '../../../BasePresenter'
import CardViewModel from './CardViewModel'
import CardDomainModel from './CardDomainModel'

class Presenter extends BasePresenter {

  commandNames = {};
  eventNames = {
    'getCards': 'getCards',
    'addNewCard': 'addNewCard',
    'deleteCard': 'deleteCard',
    'updateCard': 'updateCard'
  };

  registerCommandHandlers() {

  }

  registerEventHandlers() {
    this.registerEvent(this.eventNames.getCards, 'getCards', this.noTransform, this.listDomainToListView)
    this.registerEvent(this.eventNames.addNewCard, 'addNewCard', this.viewItemToDomainItem, this.domainItemToViewItem)
    this.registerEvent(this.eventNames.deleteCard, 'deleteCard', this.viewItemToDomainItem, this.domainItemToViewItem)
    this.registerEvent(this.eventNames.updateCard, 'updateCard', this.viewItemToDomainItem, this.domainItemToViewItem)
  }

  noTransform(x) { return x }

  listDomainToListView(domainList) {
    let n = 0;
    let rowNumGen = () => n++;
    let result = domainList.map(x => this.domainItemToViewItem(x, rowNumGen))
    return result
  }

  viewItemToDomainItem(viewModel) {
    let result = new CardDomainModel();
    result.id = viewModel.id;
    let displayNameArr = viewModel.displayName.split(' - ');
    result.number = displayNameArr[0];
    result.name = displayNameArr[1];
    result.description = viewModel.description;
    result.count = viewModel.count;
    return result;
  }

  domainItemToViewItem(domainModel, rowNumGen) {
    let result = new CardViewModel();
    result.rowNum = rowNumGen ? rowNumGen() : 0;
    result.id = domainModel.id;
    result.displayName = `${domainModel.number} - ${domainModel.name}`;
    result.description = domainModel.description;
    result.count = domainModel.count;
    return result;
  }
}

export default Presenter