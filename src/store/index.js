import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    user: { id: 'aaa', name: 'Adsasas' },
    events: [
      {
        id: 1,
        title: 'title one',
        organizer: 'a',
        done: true
      },
      {
        id: 2,
        title: 'title two',
        organizer: 'b',
        done: false
      },
      {
        id: 3,
        title: 'title three',
        organizer: 'c',
        done: true
      }
    ],
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    catLength: state => {
      return state.categories.length
    },
    doneToDos: state => {
      return state.events.filter(todo => todo.done)
    },
    activeTodosCount: state => {
      return state.events.filter(todo => !todo.done).length
    },
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})