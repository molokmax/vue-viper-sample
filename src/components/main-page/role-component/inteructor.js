import persist from '../../../data/storage'
import BaseInteructor from '../../BaseInteructor'

class Inteructor extends BaseInteructor {
  getRoles(userId) {
    return persist.role.get(userId)
  }

  addNewRole(model) {
    return persist.role.add(model)
  }

  deleteRole(id) {
    return persist.role.delete(id)
  }

  updateRole(model) {
    return persist.role.update(model)
  }

  viewRoles(user) {
    return this.presenter.viewRoles(user)
  }

  setLoading(loading) {
    return this.presenter.setLoading(loading)
  }
  
  notifyUser(role) {
    return this.parentInteructor.notifyUser(role)
  }
}

export default Inteructor