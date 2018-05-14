console.log('hello')
const main = {main:'main'}

// * Enabling Vuex
// * once enable you can inject store into your root app
Vue.use(Vuex)
const mapState = Vuex.mapState

const store = new Vuex.Store({
  state: {
    count: 0,
    count2: 7,
  },
  mutations: {
    increment: state => state.count++,
  }
})


const Counter = {
  template: `
  <div>
    <div>localData: {{localData}}</div>
    <div>count: {{count}}</div>
    <div>aliasCount: {{aliasCount}}</div>
    <div>localCompute: {{localCompute}}</div>
    <div>count2: {{count2}}</div>
    <div>countMergeLocalCompute: {{countMergeLocalCompute}}</div>
  </div>
  `,
  data: () => ({
    localData: 'localData value'
  }),
  computed: {
    localCompute() {
      return this.$store.state.count + this.localData
    },
    ...mapState({
      count: state => state.count,
      aliasCount: 'count',
      countMergeLocalCompute(state) {
        return state.count + this.localData + this.localCompute
      }
    }),
    ...mapState(
      ['count2']
    )
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
      this.$store.commit('increment')
    },
  }
})


export default main;

