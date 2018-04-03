console.log('hello')
const main = {main:'main'}

// * Enabling Vuex
// * once enable you can inject store into your root app
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment: state => state.count++,
  }
})


const Counter = {
  template: `<div>{{count}}</div>`,
  computed: {
    count() {
      // * Instead of using global singleton of store
      // * store is available in the childrend as
      // * this.$store

      // return store.state.count
      return this.$store.state.count
    }
  }
}


const v = window.v = new Vue({
  el: '#app',
  template: `
  <main>
    <Counter />
    <p>
      <button @click="increment">increment</button>
    </p>
  </main>
  `,
  store,
  components: {Counter},
  methods: {
    increment () {
      // * Instead of using global singleton of store
      // * store is available in the root as
      // * this.$store

      // store.commit('increment')
      this.$store.commit('increment')
    },
  }
})


export default main;

