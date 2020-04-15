<template>
  <div class="component-block">
    <div class="error-message" v-show="errorMessage">{{errorMessage}}</div>
    <div v-show="loading">LOADING</div>
    <div class="add-block">
      <div>accountName: <input type="text" v-model="newUser.accountName"></div>
      <div>firstName: <input type="text" v-model="newUser.firstName"></div>
      <div>lastName: <input type="text" v-model="newUser.lastName"></div>
      <button @click="addUserButtonClick">add</button>
    </div>
    <div class="grid-block">
      <div v-for="user in data" :key="user.id">
        {{user.accountName}} ({{user.lastName}} | {{user.firstName}})
        <button @click="deleteUserButtonClick(user)">delete</button>
        <button @click="selectButtonClick(user)">select</button>
      </div>
    </div>
    <div class="event-block">
      role events:
      <div v-for="(ev, index) in roleEvents" :key="index">
      {{ev.name}}: '{{JSON.stringify(ev.data)}}'
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'User',
  props: {
    presenter: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      errorMessage: '',
      loading: false,
      newUser: {
        accountName: '',
        firstName: '',
        lastName: ''
      },
      data: [],
      roleEvents: []
    }
  },
  methods: {
    addUserButtonClick() {
      return this.presenter.addNewUser(this.newUser).then((rec) => {
        this.newUser = {
          accountName: '',
          firstName: '',
          lastName: ''
        }
        console.log('user created: ', rec)
        return this.refreshUserList()
      }, (err) => {
        this.errorMessage = err
      })
    },
    deleteUserButtonClick(user) {
      return this.presenter.deleteUser(user).then((rec) => {
        console.log('user deleted: ', rec)
        return this.refreshUserList()
      }, (err) => {
        this.errorMessage = err
      })
    },
    selectButtonClick(user) {
      this.presenter.setLoading(true)
      return this.presenter.userSelected(user).then(() => {
        this.presenter.setLoading(false)
        console.log('view roles done')
      }, (err) => {
        this.presenter.setLoading(false)
        this.errorMessage = err
      })
    },

    onNotifyFromRole(roleNotify) {
      this.roleEvents.push(roleNotify)
    },

    refreshUserList() {
      return this.presenter.getUsers().then((users) => {
        this.data = users
      }, (err) => {
        this.errorMessage = err
      })
    }
  },
  mounted() {
    this.presenter.setView(this)
    this.refreshUserList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.component-block {
  height: 300px;
  width: 500px;
  border: 1px solid green;
  padding: 10px;
  margin: 10px;
}
.error-message {
  color: red;
  border: 1px solid red;
  padding: 5px;
  margin: 5px;
}
.add-block {
  border: 1px solid blue;
  padding: 5px;
  margin: 5px;
}
.grid-block {
  border: 1px solid blue;
  padding: 5px;
  margin: 5px;
}
.event-block {
  border: 1px solid blue;
  padding: 5px;
  margin: 5px;
}
</style>
