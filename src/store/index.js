import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import SecureLS from "secure-ls";
var ls = new SecureLS({
    encodingType: 'aes',
    isCompression: false
});

import {
    stateUser,
    stateEvent,
    stateCategories,
    stateConfig
} from './state/index';

Vue.use(Vuex)


export default new Vuex.Store({

    state: {
        user: stateUser,
        config: stateConfig,
        events: stateEvent,
        categories: stateCategories,
    },
    plugins: [createPersistedState({
        //storage: window.sessionStorage,
        storage: {
            getItem: (key) => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: (key) => ls.remove(key),
        },
    })],
    mutations: {

        ADD_EVENT(state, payload) {
            state.events.push(payload);
        },
        configAdd(state, payload) {
            state.config[payload.field] = payload.value;
        },
        configDelete(state, payload) {
            delete state.config[payload.field];
        },
        configClear(state, payload = stateConfig) {
            state.config = payload;
        },
        userAdd(state, payload) {
            state.user[payload.field] = payload.value;
        },
        userDelete(state, payload) {
            delete state.user[payload.field];
        },
        userClear(state, payload = stateUser) {
            state.user = payload;
        },
    },
    actions: {
        createEvent({
            commit,
            state
        }, payload) {
            console.log(state.events);
            commit('ADD_EVENT', payload)
        }
    },
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
