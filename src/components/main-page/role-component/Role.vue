<template>
  <div class="component-block">
    <div class="error-message" v-show="errorMessage">{{errorMessage}}</div>
    <div v-show="loading">LOADING</div>
    <div class="add-block">
      <div>name: <input type="text" v-model="newRole.displayName"></div>
      <button @click="addRoleButtonClick">add</button>
    </div>
    <div class="grid-block">
      <div v-for="role in data" :key="role.id">
        {{role.displayName}} 
        <button @click="deleteRoleButtonClick(role)">delete</button> 
        <button @click="notifyUserButtonClick(role)">notify</button> 
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Role',
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
      newRole: {
        displayName: ''
      },
      data: [],
      user: null
    }
  },
  mounted() {
    this.presenter.setView(this)
  },
  methods: {
    addRoleButtonClick() {
      if (!this.user) {
        this.errorMessage = 'No selected user'
        return
      }
      this.newRole.user = {
        id: this.user.id
      }
      return this.presenter.addNewRole(this.newRole).then((rec) => {
        this.newRole = {
          displayName: ''
        }
        console.log('role created: ', rec)
        return this.refreshRoleList()
      }, (err) => {
        this.errorMessage = err
      })
    },
    deleteRoleButtonClick(viewModel) {
      return this.presenter.deleteRole(viewModel).then((rec) => {
        console.log('role deleted: ', rec)
        return this.refreshRoleList()
      }, (err) => {
        this.errorMessage = err
      })
    },
    onUserSelected(userViewModel) {
      this.user = userViewModel
      return this.refreshRoleList()
    },

    notifyUserButtonClick(role) {
      return this.presenter.notifyUser(role)
    },

    refreshRoleList() {
      this.setLoading(true)
      return this.presenter.getRoles(this.user).then((roles) => {
        this.data = roles
        this.setLoading(false)
      }, (err) => {
        this.setLoading(false)
        this.errorMessage = err
      })
    },

    setLoading(loading) {
      this.loading = loading
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.component-block {
  /* height: 300px; */
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
</style>
