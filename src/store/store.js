import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		figures: [
			{
				name: "o",
				coords: [
					[0, 4],
					[0, 5],
					[1, 4],
					[1, 5],
				],
				color: "blue",
			},
			{
				name: "T",
				coords: [
					[0, 4],
					[0, 5],
					[0, 6],
					[1, 5],
				],
				color: "red",
			},
			{
				name: "S",
				coords: [
					[0, 5],
					[0, 6],
					[1, 4],
					[1, 5],
				],
				color: "yellow",
			},
			{
				name: "Z",
				coords: [
					[0, 4],
					[0, 5],
					[1, 5],
					[1, 6],
				],
				color: "green",
			},
			{
				name: "J",
				coords: [
					[0, 4],
					[1, 4],
					[1, 5],
					[1, 6],
				],
				color: "pink",
			},
			{
				name: "L",
				coords: [
					[0, 6],
					[1, 4],
					[1, 5],
					[1, 6],
				],
				color: "black",
			},
			{
				name: "I",
				coords: [
					[0, 3],
					[0, 4],
					[0, 5],
					[0, 6],
				],
				color: "orange",
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
		coordsOfCurrentFigure: [],
	},
	getters: {
		getStateOfGame(state) {
			return state.game_state;
		},
		getGlass(state) {
			return state.glass;
		},
		getFigureStartCoords: (state) => (name) => {
			return Object.values(state.figures.find((figure) => figure.name === name))[1];
		},
		getFigureCoords(state) {
			return state.coordsOfCurrentFigure;
		},
		//dont work((
		getCoordsOfOccupiedLine(state) {
			return state.glass.indexOf(!state.emptyLine);
		},
	},
	actions: {
		togleGameState({ commit }, value) {
			commit("toggleGameState", value);
		},
		setNewDefaultGlass({ commit }, glass) {
			commit("setNewDefaultGlass", glass);
		},
		generateLine({ commit }, glass) {
			commit("generateLine", glass);
		},
		eraseLine({ commit }, glass) {
			commit("eraseLine", glass);
		},
		addCoordsToState({ commit }) {
			commit("addCoordsToState");
		},

		movingDown({ commit }) {
			let coords = { ...this.getters.getFigureCoords };
			commit("eraseFigureFromGlass");
			for (let i = 0; i < 4; i++) {
				coords[i][0]++;
			}
			commit("updateCoordsOfCurrentFigure", coords);
			commit("putNewCoordsToGlass");
		},
		addNewFigure({ commit }, name) {
			commit("addNewFigure", name);
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
		eraseFigureFromGlass(state) {
			for (let i = 0; i < 4; i++) {
				let x = this.getters.getFigureCoords[i][1];
				let y = this.getters.getFigureCoords[i][0];
				state.glass[y].splice([x], 1, 0);
			}
		},
		addNewFigure(state, name) {
			for (let i = 0; i < 4; i++) {
				let x = this.getters.getFigureStartCoords(name)[i][1];
				let y = this.getters.getFigureStartCoords(name)[i][0];
				this.state.coordsOfCurrentFigure.splice(i, 1, [y, x]);
				this.state.glass[y].splice([x], 1, 1);
			}
		},
		putNewCoordsToGlass(state) {
			for (let i = 0; i < 4; i++) {
				let x = this.getters.getFigureCoords[i][1];
				let y = this.getters.getFigureCoords[i][0];
				state.glass[y].splice([x], 1, 1);
			}
		},
		updateCoordsOfCurrentFigure(state, coords) {
			state.coordsOfCurrentFigure = coords;
		},
	},

	modules: {},
});
