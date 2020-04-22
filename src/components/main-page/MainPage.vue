<template>
  <div>
    <div>Example 1: simple-component</div>
    <card :inteructor="cardInteructor"></card>

    <div>Example 2: multisource-component</div>
    <multi-source></multi-source>

    <div>Example 3: masterdetail-component</div>
    <div>
      <master-detail></master-detail>
    </div>
  </div>
</template>

<script>
import Card from './simple-component/Card'
import CardInteructor from './simple-component/inteructor'
import MultiSource from './multisource-component/MultiSource'
import MasterDetail from './masterdetail-component/MasterDetail'

export default {
  name: 'MainPage',
  components: {
    Card,
    MultiSource,
    MasterDetail
  },
  data() {
    return {
      cardInteructor : null
    }
  },
  methods: {

  },
  created() {
    this.cardInteructor = new CardInteructor();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
