import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		figures: [
			{
				name: "O",
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
		// fullLine: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		// emptyLine: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		coordsOfCurrentFigure: [],
		ability: 1,
	},
	getters: {
		getStateOfGame(state) {
			return state.game_state;
		},
		getGlass(state) {
			return [...state.glass];
		},
		getFigureStartCoords: (state) => (name) => {
			return [...state.figures.find((figure) => figure.name === name).coords];
		},
		getFiguresNames(state) {
			return [...state.figures.map(({ name }) => name)];
		},
		getFigureCoords(state) {
			return [...state.coordsOfCurrentFigure];
		},
		getAbility(state) {
			return state.ability;
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
		setAbility({ commit }, value) {
			commit("setAbility", value);
		},
		setNewDefaultGlass({ commit }, glass) {
			commit("putNewCoordsToGlass", glass);
		},

		movingDown({ commit }) {
			let coords = [...this.getters.getFigureCoords];
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
		checkEmptyBlocksBelow({ commit }) {
			if (this.getters.getFigureCoords[3][0] < 19) {
				for (let i = 0; i < 4; i++) {
					let x = this.getters.getFigureCoords[i][1];
					let y = this.getters.getFigureCoords[i][0];
					if (this.state.glass[y + 1][x] == 1) {
						let activeFigurePoints = JSON.parse(
							JSON.stringify(
								this.getters.getFigureCoords.filter((point) => {
									return point[0] === y + 1 && point[1] === x;
								})
							)
						);
						if (activeFigurePoints.length > 0) {
							commit("setAbility", 1);
						} else {
							commit("setAbility", 0);
							return;
						}
					}
				}
			} else {
				commit("setAbility", 0);
				return;
			}
		},
		checkGameOver({ commit }, name) {
			for (let i = 0; i < 4; i++) {
				let x = this.getters.getFigureStartCoords(name)[i][1];
				let y = this.getters.getFigureStartCoords(name)[i][0];
				if (this.state.glass[y][x] != 1) {
					commit("setAbility", 1);
					return;
				}
				commit("setAbility", 0);
				commit("toggleGameState", "game_over");
				// return;
			}
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
		setAbility(state, value) {
			this.state.ability = value;
		},
		eraseFigureFromGlass(state) {
			for (let i = 0; i < 4; i++) {
				let x = this.getters.getFigureCoords[i][1];
				let y = this.getters.getFigureCoords[i][0];
				Vue.set(state.glass[y], x, 0);
			}
		},
		addNewFigure(state, name) {
			// this.state.coordsOfCurrentFigure = [...this.getters.getFigureStartCoords(name)];
			for (let i = 0; i < 4; i++) {
				let x = this.getters.getFigureStartCoords(name)[i][1];
				let y = this.getters.getFigureStartCoords(name)[i][0];
				Vue.set(this.state.glass[y], x, 1);
				// Vue.set(state.coordsOfCurrentFigure[i], 1, [y, x]);
				this.state.coordsOfCurrentFigure.splice(i, 1, [y, x]);
			}
		},
		putNewCoordsToGlass(state) {
			this.state.coordsOfCurrentFigure = [...this.getters.getFigureCoords];
			for (let i = 0; i < 4; i++) {
				let x = this.getters.getFigureCoords[i][1];
				let y = this.getters.getFigureCoords[i][0];
				// this.state.glass[y].splice([x], 1, 1);
				Vue.set(this.state.glass[y], x, 1);
			}
		},
		updateCoordsOfCurrentFigure(state, coords) {
			Vue.set(state.coordsOfCurrentFigure, coords);
		},
	},

	modules: {},
});
