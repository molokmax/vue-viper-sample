import BaseInteructor from '../BaseInteructor'

class Inteructor extends BaseInteructor {

  userInteructor; // TODO: make private
  roleInteructor; // TODO: make private

  setUserInteructor(userInteructor) {
    this.userInteructor = userInteructor
  }
  setRoleInteructor(roleInteructor) {
    this.roleInteructor = roleInteructor
  }

  userSelected(user) {
    return this.roleInteructor.viewRoles(user)
  }

  setRolesLoading(loading) {
    return this.roleInteructor.setLoading(loading)
  }
  
  notifyUser(role) {
    return this.userInteructor.onNotifyFromRole(role)
  }
}

export default Inteructor