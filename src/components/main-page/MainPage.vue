<template>
  <div>
    <div>Example 1: simple-component</div>
    <card :inteructor="cardInteructor"></card>
    <!-- <user :presenter="userPresenter"></user>
    <role :presenter="rolePresenter"></role> -->
  </div>
</template>

<script>
// import User from './user-component/User'
// import UserPresenter from './user-component/presenter'
// import UserInretuctor from './user-component/inteructor'

// import Role from './role-component/Role'
// import RolePresenter from './role-component/presenter'
// import RoleInretuctor from './role-component/inteructor'

import Card from './simple-component/Card'
import CardInteructor from './simple-component/inteructor'


// import Presenter from './presenter'
// import Inretuctor from './inteructor'

export default {
  name: 'MainPage',
  components: {
    // User,
    // Role,
    Card
  },
  data() {
    return {
//      presenter : null,
//      inteructor: null,
//      userPresenter: null,
//      rolePresenter: null,
      cardInteructor : null
    }
  },
  methods: {

  },
  created() {
    this.cardInteructor = new CardInteructor();
    // this.rolePresenter = new RolePresenter()
    // const roleInteructor = new RoleInretuctor()
    // this.rolePresenter.setInteructor(roleInteructor)
    // roleInteructor.setPresenter(this.rolePresenter)

    // this.userPresenter = new UserPresenter()
    // const userInteructor = new UserInretuctor()
    // this.userPresenter.setInteructor(userInteructor)
    // userInteructor.setPresenter(this.userPresenter)

    // this.presenter = new Presenter()
    // this.inteructor = new Inretuctor()
    // this.presenter.setInteructor(this.inteructor)
    // this.inteructor.setPresenter(this.presenter)
    // this.presenter.setView(this)

    // this.inteructor.setUserInteructor(userInteructor)
    // this.inteructor.setRoleInteructor(roleInteructor)

    // roleInteructor.setParentInteructor(this.inteructor)
    // userInteructor.setParentInteructor(this.inteructor)

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
