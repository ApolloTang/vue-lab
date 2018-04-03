console.log('hello')
const main = {main:'main'}


// This is a vueX store
const store_reactive = new Vuex.Store({
  state: {
    count: 0,
    someProps: 'someProps'
  },
  mutations: {
    increment: state => state.count++,
    someEvent: (state, payload) => state.someProps = payload,
  }
})


// This is a simple non vueX store
const store_nonReactive = { c:0 }



const v = window.v = new Vue({
  el: '#app',
  template: `
  <main>
    <p>count reactive: {{ count }}</p>
    <p>c_nonReactiveStore: {{ c_nonReactiveStore}} </p>
    <p>c_nonReactiveStore_made_react: {{ c_nonReactiveStore_made_react}} </p>
    <p>
      <button @click="increment">increment</button>
      <button @click="someEvent">someEvent</button>
    </p>
  </main>
  `,

  // data: () => store_nonReactive, //<--- [*] when this is commented out computed.c_nonReactiveStore() loses its reactivity

  computed: {
    count () {
      console.log('1 count')

      // * this is magically reactive because of vuex
	    return store_reactive.state.count
    },
    c_nonReactiveStore () {
      console.log('2 c_nonReactiveStore')

      // * For this method to be react you would have to register
      // * the non reactive store[*] in data above.
      // * Simply uncomment store_nonReact in data to see this happen

      return store_nonReactive.c
    },
    c_nonReactiveStore_made_react () {
      console.log('3 c_nonReactiveStore_made_react')

      // * This computed method *somehow* become reaactive
      // * b/c vuex store "store_reactive" is presence here.
      // * If you comment out next line, it would break the reactivity
      // *
      // * I notice that all computed methods on bootstrap.
      // * it is during this bootstrap that vueX peek inside the computed method
      // * to register dependencies

      store_reactive.state.count
      // store_reactive.state.someProps

      return store_nonReactive.c
    }
  },
  methods: {
    increment () {
      store_nonReactive.c++
      store_reactive.commit('increment')
    },
    someEvent () {
      store_reactive.commit('someEvent', Date.now())
    },
  }
})


export default main;

