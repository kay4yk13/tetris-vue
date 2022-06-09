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
		glass: [],
		currentFigureCoords: [],
		nextFigureCoords: [],
		nextFigureWIdgetMatrix: [],
		gameState: "welcome",
		isGameOver: 0,
		gravitySpeed: 500,
		// fullLine: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		// emptyLine: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	},
	getters: {
		getStateOfGame(state) {
			return state.gameState;
		},
		getGOstatus(state) {
			return state.isGameOver;
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
		getNextFigureCoords(state) {
			return [...state.nextFigureCoords];
		},
		getWidgetMatrix(state) {
			return [...state.nextFigureWIdgetMatrix];
		},
		getCurrentFigureCoords(state) {
			return [...state.currentFigureCoords];
		},
		getGravitySpeed(state) {
			return state.gravitySpeed;
		},
	},
	actions: {
		togleGameState({ commit }, value) {
			commit("toggleGameState", value);
		},
		cleanGlass({ commit }) {
			commit("cleanGlass");
		},
		setGOstatus({ commit }, value) {
			commit("setGOstatus", value);
		},
		addNextFigureToState({ commit }, coords) {
			commit("addNextFigureToState", coords);
			commit("matrixForWidget", 0);
			commit("matrixForWidget", 1);
		},
		addCurrentFigureToState({ commit }, coords) {
			commit("addCurrentFigureToState", coords);
		},
		addCurrentFigureCoordsToGlass({ commit }) {
			commit("changeCurrentFigureCoordsInGlassTo", 1);
		},
		moveFigureDown({ commit }) {
			let coords = [...this.getters.getCurrentFigureCoords];
			commit("changeCurrentFigureCoordsInGlassTo", 0);
			for (let i = 0; i < 4; i++) {
				coords[i][0]++;
				commit("addCurrentFigureToState", coords);
			}
			commit("changeCurrentFigureCoordsInGlassTo", 1);
		},
	},
	mutations: {
		toggleGameState(state, value) {
			state.gameState = value;
		},
		setGOstatus(state, value) {
			state.isGameOver = value;
		},
		addNextFigureToState(state, coords) {
			state.nextFigureCoords = coords;
		},
		addCurrentFigureToState(state, coords) {
			state.currentFigureCoords = coords;
		},
		changeCurrentFigureCoordsInGlassTo(state, value) {
			let coords = this.getters.getCurrentFigureCoords;
			for (let i = 0; i < 4; i++) {
				let x = coords[i][1];
				let y = coords[i][0];
				Vue.set(state.glass[y], x, value);
			}
		},
		matrixForWidget(state, value) {
			let coords = this.getters.getNextFigureCoords;
			if (value != 0) {
				for (let i = 0; i < 4; i++) {
					let x = coords[i][1] - 3;
					let y = coords[i][0] + 1;
					Vue.set(state.nextFigureWIdgetMatrix[y], x, value);
				}
				return;
			}
			state.nextFigureWIdgetMatrix = [
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
			];
			return;
		},
		cleanGlass(state) {
			state.glass = [
				[1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
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
			];
		},
	},
});
1;
