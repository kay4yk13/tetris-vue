import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		glass: [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		],
		game_state: "welcome",
		fullLine: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		emptyLine: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	},
	getters: {
		State_of_game(state) {
			return state.game_state;
		},
		GetGlass(state) {
			return state.glass;
		},
	},
	actions: {
		Togle({ commit }, value) {
			commit("toggleGameState", value);
		},
		Filler({ commit }) {
			commit("searchFullLineANdErase");
			commit("lineGenerator");
		},
	},
	mutations: {
		toggleGameState(state, value) {
			state.game_state = value;
		},
		lineGenerator(state) {
			let i = Math.floor(Math.random() * 19);

			state.glass.splice(i, 1, this.state.fullLine);
		},
		searchFullLineANdErase() {
			let i = this.state.glass.indexOf(this.state.glass.find((n) => n == this.state.fullLine));
			this.state.glass.splice(i, 1, this.state.emptyLine);
		},
	},
	modules: {},
});
