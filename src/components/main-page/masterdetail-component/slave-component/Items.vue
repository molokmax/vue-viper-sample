<template>
  <div class="component-block">
    <div class="error-message" v-show="errorMessage">{{errorMessage}}</div>
    <div v-show="loading">LOADING</div>
    <div class="add-block">
      <div>name: <input type="text" v-model="newRecord.name"></div>
      <button @click="addItemButtonClick">add</button>
    </div>
    <div class="grid-block">
      <div v-for="item in data" :key="item.id">
        {{item.name}} <button @click="deleteItemButtonClick(item)">delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import ItemViewModel from './ItemViewModel'
import ItemsPresenter from './presenter'

export default {
  name: 'Items',
  props: {
    inteructor: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      errorMessage: '',
      loading: false,
      selectedCard: null,
      newRecord: new ItemViewModel(),
      data: [],
      presenter: new ItemsPresenter()
    }
  },
  methods: {
    onCardSelected(cardViewModel) {
      this.selectedCard = cardViewModel
      return this.refreshData()
    },
    onCardSelectedVer2(data) {
      this.selectedCard = data.selectedRecord
      this.data = data.items
      return Promise.resolve(data.items)
    },
    addItemButtonClick() {
      if (!this.selectedCard) {
        this.errorMessage = 'There is no selected card'
      } else {
        this.loading = true
        this.newRecord.cardId = this.selectedCard.id
        // TODO: how to override handler? I think it's overhead we should configure component with config (from inteructor?)
        let eventName = this.presenter.eventNames.addNewItem;
        return this.presenter.fireEvent(eventName, this.newRecord).then((itemViewModel) => {
          this.newRecord = new ItemViewModel()
          console.log('item created:', itemViewModel)
          return this.refreshData()
        }, (err) => {
          this.loading = false
          this.errorMessage = err
        })
      }
    },
    deleteItemButtonClick(itemViewModel) {
      this.loading = true
      let eventName = this.presenter.eventNames.deleteItem;
      return this.presenter.fireEvent(eventName, itemViewModel).then((deletedItemViewModel) => {
        console.log('item deleted:', deletedItemViewModel)
        return this.refreshData()
      }, (err) => {
        this.loading = false
        this.errorMessage = err
      })
    },
    
    refreshData() {
      if (!this.selectedCard) {
        this.errorMessage = 'There is no selected card'
      } else {
        this.loading = true
        let eventName = this.presenter.eventNames.getItems;
        return this.presenter.fireEvent(eventName, this.selectedCard).then((itemViewModels) => {
          this.loading = false
          this.data = itemViewModels
          return itemViewModels
        }, (err) => {
          this.loading = false
          this.errorMessage = err
        })
      }
    }
  },
  mounted() {
    this.presenter.setView(this)
    this.presenter.setInteructor(this.inteructor)
    this.inteructor.setPresenter(this.presenter)
    // this.refreshData()
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
.event-block {
  border: 1px solid blue;
  padding: 5px;
  margin: 5px;
}
</style>
