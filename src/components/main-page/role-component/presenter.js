import BasePresenter from '../../BasePresenter'

class Presenter extends BasePresenter {
  getRoles(userViewModel) {
    return this.inteructor.getRoles(userViewModel.id).then((data) => {
      return data.map(x => this.entityToViewModel(x))
    })
  }
  addNewRole(viewModel) {
    let entity = this.viewModelToEntity(viewModel)
    return this.inteructor.addNewRole(entity).then((rec) => {
      return this.entityToViewModel(rec)
    })
  }
  deleteRole(viewModel) {
    return this.inteructor.deleteRole(viewModel.id).then((rec) => {
      return this.entityToViewModel(rec)
    })
  }

  viewRoles(userViewModel) {
    return this.view.onUserSelected(userViewModel)
  }
  
  notifyUser(role) {
    return this.inteructor.notifyUser(role)
  }

  setLoading(loading) {
    this.view.setLoading(loading)
    return Promise.resolve(true)
  }

  viewModelToEntity(viewModel) {
    return {
      id: viewModel.id,
      userid: viewModel.user.id,
      name: viewModel.displayName
    }
  }

  entityToViewModel(entity) {
    return {
      id: entity.id,
      user: {
        id: entity.userid
      },
      displayName: entity.name
    }
  }
}

export default Presenter