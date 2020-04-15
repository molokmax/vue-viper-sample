
import BasePresenter from '../../BasePresenter'

class Presenter extends BasePresenter {
  getUsers() {
    return this.inteructor.getUsers().then((data) => {
      let result = data.map(x => this.entityToViewModel(x))
      return result
    })
  }
  addNewUser(viewModel) {
    let entity = this.viewModelToEntity(viewModel)
    return this.inteructor.addNewUser(entity).then((rec) => {
      return this.entityToViewModel(rec)
    })
  }
  deleteUser(viewModel) {
    return this.inteructor.deleteUser(viewModel.id).then((rec) => {
      return this.entityToViewModel(rec)
    })
  }
  updateUser(viewModel) {
    let entity = this.viewModelToEntity(viewModel)
    return this.inteructor.updateUser(entity).then((rec) => {
      return this.entityToViewModel(rec)
    })
  }
  
  userSelected(viewModel) {
    return this.inteructor.userSelected(viewModel)
  }

  viewModelToEntity(viewModel) {
    return {
      id: viewModel.id,
      login: viewModel.accountName,
      name: `${viewModel.firstName} ${viewModel.lastName}`
    }
  }

  setLoading(loading) {
    this.view.loading = loading
    return this.inteructor.setLoading(loading)
  }

  onNotifyFromRole(role) {
    let viewModel = {
      name: 'notify',
      data: role
    }
    this.view.onNotifyFromRole(viewModel)
    return Promise.resolve(true);
  }

  entityToViewModel(entity) {
    return {
      id: entity.id,
      accountName: entity.login,
      firstName: entity.name.split(' ')[0],
      lastName: entity.name.split(' ')[1]
    }
  }
}

export default Presenter