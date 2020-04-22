<template>
  <div>
    <card :inteructor="masterInteructor"></card>
    <slave :inteructor="slaveInteructor"></slave>
  </div>
</template>

<script>

import Card from './master-component/Card'
import Slave from './slave-component/Items'
import Inteructor from './inteructor'
import MasterInteructor from './master-component/inteructor'
import SlaveInteructor from './slave-component/inteructor'

export default {
  name: 'MasterDetail',
  components: {
    Card,
    Slave
  },
  data() {
    return {
      masterInteructor: new MasterInteructor(),
      slaveInteructor: new SlaveInteructor()
    }
  },
  methods: {

  },
  mounted() {
    let inteructor = new Inteructor();
    this.masterInteructor.setParentInteructor(inteructor);
    inteructor.setMasterInteructor(this.masterInteructor)
    this.slaveInteructor.setParentInteructor(inteructor);
    inteructor.setSlaveInteructor(this.slaveInteructor)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
