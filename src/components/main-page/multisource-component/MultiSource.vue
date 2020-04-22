<template>
  <div>
    <card :inteructor="src1Inteructor"></card>
    <card :inteructor="src2Inteructor"></card>
  </div>
</template>

<script>

import Card from './view-component/Card'
import Source1Inteructor from './source1-inteructor'
import Source2Inteructor from './source2-inteructor'

export default {
  name: 'MultiSource',
  components: {
    Card
  },
  data() {
    return {
      src1Inteructor: null,
      src2Inteructor: null
    }
  },
  methods: {

  },
  created() {
    this.src1Inteructor = new Source1Inteructor();
    this.src2Inteructor = new Source2Inteructor();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
