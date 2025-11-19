import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// Mock data for local development
import mockFilmes from "./mockNoentulhoLanding";
// import router from "@/router";

// import _ from "lodash";

Vue.use(Vuex, axios);

export default new Vuex.Store({
  state: {
    // in production the app fetches from the API (via getFilmes action)
    // during development we preload mock data so `Home.vue` can render without the API
    filmes: process.env.NODE_ENV === 'production' ? [] : mockFilmes,

  },
  getters: {
    allFilmes: state => state.filmes,

  },

  actions: {
    getFilmes({ commit }) {
      // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
     return axios
        // .get("http://localhost/primeira-idade/wp-json/filmescraft/v1/filmes")
        .get("https://art.noentulho.pt/wp-json/no/entulho")
        // .get("http://localhost/artworks.pt/wp-json/no/entulho")

        .then(response => {
          commit("GET_FILMES", response.data);
        })
        .catch(error => {
          // Network errors (DNS, offline, CORS) sometimes break app initialization.
          // Fallback to the bundled mock data so UI and GSAP code can run locally.
          console.warn('getFilmes failed, falling back to mock data:', error && error.message ? error.message : error);
          commit("GET_FILMES", mockFilmes);
        });
    },

  },
  mutations: {
    GET_FILMES: (state, filmes) => {
      state.filmes = filmes;
    },

  },
});

// function builder(data) {
//   return new Vuex.Store({
//     state: {
//       exams: data,
//     },
//     actions,
//     getters,
//     mutations,
//   });
// }

// export default builder;