import Vue from "vue"
import Vuex from "vuex"
//import {mutations, STORAGE_KEY} from "./mutations"
import mutations from './mutations'
import actions from "./actions.js"

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		//todos:JSON.parse(window.localStorage.getItem(STORAGE_KEY)|| '[]')
		todos:[]
	},
	actions,
	mutations
})