
import BasePresenter from '../../../BasePresenter'
import ItemViewModel from './ItemViewModel'
import ItemDomainModel from './ItemDomainModel'
import CardViewModel from '../master-component/CardViewModel'
import CardDomainModel from '../master-component/CardDomainModel'

class Presenter extends BasePresenter {

  commandNames = {
    'cardSelected': 'cardSelected',
    'cardSelectedVer2': 'cardSelectedVer2'
  };
  eventNames = {
    'getItems': 'getItems',
    'addNewItem': 'addNewItem',
    'deleteItem': 'deleteItem',
    'updateItem': 'updateItem'
  };

  registerCommandHandlers() {
    this.registerCommand(this.commandNames.cardSelected, 'onCardSelected', this.cardDomainToCardView, this.listViewToListDomain)
    this.registerCommand(this.commandNames.cardSelectedVer2, 'onCardSelectedVer2', this.customModelToViewModel, this.listViewToListDomain)
  }

  registerEventHandlers() {
    this.registerEvent(this.eventNames.getItems, 'getItems', this.cardViewToCardDomain, this.listDomainToListView)
    this.registerEvent(this.eventNames.addNewItem, 'addNewItem', this.viewItemToDomainItem, this.domainItemToViewItem)
    this.registerEvent(this.eventNames.deleteItem, 'deleteItem', this.viewItemToDomainItem, this.domainItemToViewItem)
    this.registerEvent(this.eventNames.updateItem, 'updateItem', this.viewItemToDomainItem, this.domainItemToViewItem)
  }

  customModelToViewModel(data) {
    return {
      selectedRecord: this.cardDomainToCardView(data.selectedCard),
      items: this.listDomainToListView(data.items)
    }
  }

  cardViewToCardDomain(viewModel) {
    let result = new CardDomainModel();
    result.id = viewModel.id;
    result.description = viewModel.description;
    return result;
  }

  cardDomainToCardView(domainModel) {
    let result = new CardViewModel();
    result.id = domainModel.id;
    result.description = domainModel.description;
    return result;
  }

  noTransform(x) { return x }

  listDomainToListView(domainList) {
    let result = domainList.map(x => this.domainItemToViewItem(x))
    return result
  }

  listViewToListDomain(viewList) {
    let result = viewList.map(x => this.viewItemToDomainItem(x))
    return result
  }

  viewItemToDomainItem(viewModel) {
    let result = new ItemDomainModel();
    result.id = viewModel.id;
    result.name = viewModel.name;
    result.cardId = viewModel.cardId;
    return result;
  }

  domainItemToViewItem(domainModel) {
    let result = new ItemViewModel();
    result.id = domainModel.id;
    result.name = domainModel.name;
    result.cardId = domainModel.cardId;
    return result;
  }
}

export default Presenter