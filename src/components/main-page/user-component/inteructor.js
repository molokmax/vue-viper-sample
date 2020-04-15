import persist from '../../../data/storage'

import BaseInteructor from '../../BaseInteructor'

class Inteructor extends BaseInteructor {

  getUsers() {
    return persist.user.get()
  }

  addNewUser(model) {
    return persist.user.add(model)
  }

  deleteUser(id) {
    return persist.user.delete(id)
  }

  updateUser(model) {
    return persist.user.update(model)
  }

  userSelected(viewModel) {
    if (!this.parentInteructor) {
      return Promise.reject('parentInteructor is not initialized')
    } else {
      return this.parentInteructor.userSelected(viewModel)
    }
  }

  setLoading(loading) {
    return this.parentInteructor.setRolesLoading(loading)
  }

  onNotifyFromRole(role) {
    return this.presenter.onNotifyFromRole(role)
  }

}

export default Inteructor
