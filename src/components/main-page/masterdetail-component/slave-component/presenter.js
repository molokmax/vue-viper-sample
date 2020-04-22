
import BasePresenter from '../../../BasePresenter'
import ItemViewModel from './ItemViewModel'
import ItemDomainModel from './ItemDomainModel'
import CardViewModel from '../master-component/CardViewModel'
import CardDomainModel from '../master-component/CardDomainModel'

class Presenter extends BasePresenter {

  commandNames = {
    'getItems': 'getItems',
    'addNewItem': 'addNewItem',
    'deleteItem': 'deleteItem',
    'updateItem': 'updateItem'
  };
  eventNames = {
    'cardSelected': 'cardSelected',
    'cardSelectedVer2': 'cardSelectedVer2'
  };

  registerCommandHandlers() {
    this.registerCommand(this.commandNames.getItems, 'getItems', this.cardViewToCardDomain, this.listDomainToListView)
    this.registerCommand(this.commandNames.addNewItem, 'addNewItem', this.viewItemToDomainItem, this.domainItemToViewItem)
    this.registerCommand(this.commandNames.deleteItem, 'deleteItem', this.viewItemToDomainItem, this.domainItemToViewItem)
    this.registerCommand(this.commandNames.updateItem, 'updateItem', this.viewItemToDomainItem, this.domainItemToViewItem)
  }

  registerEventHandlers() {
    this.registerEvent(this.eventNames.cardSelected, 'onCardSelected', this.cardDomainToCardView, this.listViewToListDomain)
    this.registerEvent(this.eventNames.cardSelectedVer2, 'onCardSelectedVer2', this.customModelToViewModel, this.listViewToListDomain)
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