import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: null,
    countries: null,
  },
  getters: {
    user: state => state.user,
    countries: state => state.countries,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },

    setCountries(state, countries) {
      state.countries = countries
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user)
    },
    logout({ commit }) {
      commit('setUser', null)
      axios.get('/api/logout');
    },
    fetchUser({ commit }) {
      axios.get('/api/user').then(response => {
        commit('setUser', response.data)
      }).catch(error => {
        if (error.response.status === 401) {
          console.log('logout');
          commit('setUser', null)
          localStorage.clear();
        }
      })
    },
    fetchCountries({ commit }) {
      axios.get('https://restcountries.com/v2/all').then(response => {
        commit('setCountries', response.data)
      })
    },
  },
  modules: {
  }
})
