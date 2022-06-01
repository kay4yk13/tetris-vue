import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		figures: [
			{
				o: [
					[0, 4],
					[0, 5],
					[1, 4],
					[1, 5],
				],
			},
			{
				T: [
					[0, 4],
					[0, 5],
					[0, 6],
					[1, 5],
				],
			},
		],
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
		togleGameState({ commit }, value) {
			commit("toggleGameState", value);
		},
		updateGlass({ commit }, glass) {
			commit("setNewDefaultGlass", glass);
		},
		generateLine({ commit }, glass) {
			commit("generateLine", glass);
		},
		eraseLine({ commit }, glass) {
			commit("eraseLine", glass);
		},
	},
	mutations: {
		toggleGameState(state, value) {
			state.game_state = value;
		},
		generateLine(state, i) {
			state.glass.splice(i, 1, state.fullLine);
		},
		eraseLine(state, i) {
			state.glass.splice(i, 1, state.emptyLine);
		},
		setNewDefaultGlass(state, glass) {
			state.glass = glass;
		},
	},
	modules: {},
});
