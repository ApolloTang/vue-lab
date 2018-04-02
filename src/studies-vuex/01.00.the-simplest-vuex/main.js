console.log('hello')
const main = {main:'main'}

const s = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
  	increment: state => state.count++,
    decrement: state => state.count--
  }
})

const v = window.v = new Vue({
  el: '#app',
  template: `
  <main>
    <p>{{ count }}</p>
    <p>
      <button @click="increment">increment</button>
      <button @click="decrement">decrement</button>
    </p>
  </main>
  `,
  computed: {
    count () {
	    return s.state.count
    }
  },
  methods: {
    increment () {
      s.commit('increment')
    },
    decrement () {
    	s.commit('decrement')
    }
  }
})
export default main;
