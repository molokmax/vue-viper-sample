
import BaseInteructor from '../../BaseInteructor'

class Inteructor extends BaseInteructor {
  
  masterInteructor = null;
  slaveInteructor = null;

  setMasterInteructor(inteructor) {
    this.masterInteructor = inteructor
  }
  setSlaveInteructor(inteructor) {
    this.slaveInteructor = inteructor
  }

  selectMasterRecord(cardDomainModel) {
    if (!this.slaveInteructor) {
      let err = `Slave Inteructor is not initialized in ${this.constructor.name}`
      console.warn(err)
      return Promise.reject(err)
    } else {
      return this.slaveInteructor.onMasterRecordSelected(cardDomainModel)
      // return this.slaveInteructor.onMasterRecordVer2Selected(cardDomainModel) // yet another variant
    }
  }

  selectMasterRecordVer2(cardDomainModel) {
    if (!this.slaveInteructor) {
      let err = `Slave Inteructor is not initialized in ${this.constructor.name}`
      console.warn(err)
      return Promise.reject(err)
    } else {
      // return this.slaveInteructor.onMasterRecordSelected(cardDomainModel)
      return this.slaveInteructor.onMasterRecordVer2Selected(cardDomainModel) // yet another variant
    }
  }
}

export default Inteructor
