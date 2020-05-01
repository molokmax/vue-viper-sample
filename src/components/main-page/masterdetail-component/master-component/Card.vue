<template>
  <div class="component-block">
    <div class="error-message" v-show="errorMessage">{{errorMessage}}</div>
    <div v-show="loading">LOADING</div>
    <div><button @click="toggleMode">toggle mode</button></div>
    <div class="add-block">
      <div>name: <input type="text" placeholder="number - name" v-model="newRecord.displayName"></div>
      <div>description: <input type="text" v-model="newRecord.description"></div>
      <div>count: <input type="number" v-model="newRecord.count"></div>
      <button @click="addCardButtonClick">add</button>
    </div>
    <div class="grid-block">
      <div v-for="item in data" :key="item.id">
        {{item.rowNum}}: {{item.displayName}} ({{item.count}})<span v-show="detailMode"> | {{item.description}}</span>
        <button @click="deleteCardButtonClick(item)">delete</button>
        <button @click="selectCardButtonClick(item)">select</button>
        <button @click="selectCardVer2ButtonClick(item)">select 2</button>
      </div>
    </div>
  </div>
</template>

<script>
import CardViewModel from './CardViewModel'
import CardPresenter from './presenter'

export default {
  name: 'Card',
  props: {
    inteructor: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      errorMessage: '',
      detailMode: true,
      loading: false,
      newRecord: new CardViewModel(),
      data: [],
      presenter: new CardPresenter()
    }
  },
  methods: {
    toggleMode() {
      this.detailMode = !this.detailMode
    },
    addCardButtonClick() {
      this.loading = true
      // TODO: how to override handler? I think it's overhead we should configure component with config (from inteructor?)
      let eventName = this.presenter.eventNames.addNewCard;
      return this.presenter.fireEvent(eventName, this.newRecord).then((cardViewModel) => {
        this.newRecord = new CardViewModel()
        console.log('card created:', cardViewModel)
        return this.refreshData()
      }, (err) => {
        this.loading = false
        this.errorMessage = err
      })
    },
    deleteCardButtonClick(cardViewModel) {
      this.loading = true
      let eventName = this.presenter.eventNames.deleteCard;
      return this.presenter.fireEvent(eventName, cardViewModel).then((deletedCardViewModel) => {
        console.log('card deleted:', deletedCardViewModel)
        return this.refreshData()
      }, (err) => {
        this.loading = false
        this.errorMessage = err
      })
    },
    selectCardButtonClick(cardViewModel) {
      let eventName = this.presenter.eventNames.selectCard;
      return this.presenter.fireEvent(eventName, cardViewModel).then((itemsCount) => {
        console.log('items count:', itemsCount)
      }, (err) => {
        this.errorMessage = err
      })
    },
    selectCardVer2ButtonClick(cardViewModel) {
      let eventName = this.presenter.eventNames.selectCardVer2;
      return this.presenter.fireEvent(eventName, cardViewModel).then((itemsCount) => {
        console.log('items count:', itemsCount)
      }, (err) => {
        this.errorMessage = err
      })
    },
    
    refreshData() {
      this.loading = true
      let eventName = this.presenter.eventNames.getCards;
      return this.presenter.fireEvent(eventName).then((cardViewModels) => {
        this.loading = false
        this.data = cardViewModels
      }, (err) => {
        this.loading = false
        this.errorMessage = err
      })
    }
  },
  mounted() {
    this.presenter.setView(this)
    this.presenter.setInteructor(this.inteructor)
    this.inteructor.setPresenter(this.presenter)
    this.refreshData()
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
