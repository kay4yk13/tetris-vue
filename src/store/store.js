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
				color: "orange",
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
				color: "magenta",
			},
			{
				name: "L",
				coords: [
					[0, 6],
					[1, 4],
					[1, 5],
					[1, 6],
				],
				color: "grey",
			},
			{
				name: "I",
				coords: [
					[0, 3],
					[0, 4],
					[0, 5],
					[0, 6],
				],
				color: "red",
			},
		],
		glass: [],
		sandBoxGlass: [],
		currentFigureCoords: [],
		nextFigureCoords: [],
		currentFigureColor: 0,
		nextFigureColor: 0,
		nextFigureWIdgetMatrix: [],
		gameState: "welcome",
		isGameOver: 0,
		scoreCounter: 0,
		gravitySpeed: 600,
		previousGravitySpeed: 0,
		delay: [500, 400, 350, 300, 250, 200, 150, 100, 50, 30],
		colorScheme: "cf",
	},
	getters: {
		getStateOfGame(state) {
			return state.gameState;
		},
		getGOstatus(state) {
			return state.isGameOver;
		},
		getColorScheme(state) {
			return state.colorScheme;
		},
		getGlass(state) {
			return [...state.glass];
		},
		getFigureStartCoords: (state) => (name) => {
			return [...state.figures.find((figure) => figure.name === name).coords];
		},
		getFigureStartColor: (state) => (name) => {
			return state.figures.find((figure) => figure.name === name).color;
		},
		getFigures(state) {
			return [...state.figures];
		},
		getFiguresNames(state) {
			return [...state.figures.map(({ name }) => name)];
		},
		getNextFigureCoords(state) {
			return [...state.nextFigureCoords];
		},
		getCurrentFigureCoords(state) {
			return [...state.currentFigureCoords];
		},
		getNextFigureColor(state) {
			return state.nextFigureColor;
		},
		getCurrentFigureColor(state) {
			return state.currentFigureColor;
		},
		getWidgetMatrix(state) {
			return [...state.nextFigureWIdgetMatrix];
		},
		getGravitySpeed(state) {
			return state.gravitySpeed;
		},
		getScoreCounter(state) {
			return state.scoreCounter;
		},
	},
	actions: {
		toggleGameState({ commit }, value) {
			commit("toggleGameState", value);
		},
		toggleColorScheme({ commit }, value) {
			commit("toggleColorScheme", value);
		},
		cleanGlass({ commit }) {
			commit("cleanGlass");
		},
		setGOstatus({ commit }, value) {
			commit("setGOstatus", value);
		},
		addNextFigureCoordinatesToState({ commit }, { coords, color }) {
			commit("addNextFigureCoordinatesToState", coords);
			commit("addNextFigureColorToState", color);
			commit("matrixForWidget", 0);
			commit("matrixForWidget", color);
		},
		addCurrentFigureCoordinatesToState({ commit }, { coords, color }) {
			commit("addCurrentFigureCoordinatesToState", coords);
			commit("addCurrentFigureColorToState", color);
		},
		addCurrentFigureCoordsToGlass({ commit }) {
			let color = this.getters.getCurrentFigureColor;
			commit("changeCurrentFigureCoordsInGlassTo", color);
		},
		moveFigureDown({ commit }) {
			let coords = [...this.getters.getCurrentFigureCoords];
			let color = this.getters.getCurrentFigureColor;
			commit("changeCurrentFigureCoordsInGlassTo", 0);
			for (let i = 0; i < 4; i++) {
				coords[i][0]++;
				commit("addCurrentFigureCoordinatesToState", coords);
			}
			commit("changeCurrentFigureCoordsInGlassTo", color);
		},
		moveFigureHorizontally({ commit }, direction) {
			let coords = [...this.getters.getCurrentFigureCoords];
			let color = this.getters.getCurrentFigureColor;
			commit("changeCurrentFigureCoordsInGlassTo", 0);
			for (let i = 0; i < 4; i++) {
				if (direction === `left`) {
					coords[i][1]--;
				} else {
					coords[i][1]++;
				}
			}
			commit("addCurrentFigureCoordinatesToState", coords);
			commit("changeCurrentFigureCoordsInGlassTo", color);
		},
		softDrop({ commit }, value) {
			commit("softDrop", value);
		},
		difficultyChanger({ commit }) {
			let score = this.getters.getScoreCounter;
			let index;
			if (score % 10 === 0) {
				index = score / 10;
			} else {
				index = Math.floor(score / 10);
			}
			let value = this.state.delay[index];
			commit("difficultyChanger", value);
		},
		seekAndDestroyFullLine({ commit }) {
			let glass = [...this.getters.getGlass];
			glass.forEach((row, index) => {
				if (row.every((value) => value > 0 || typeof value === "string")) {
					commit("lineDestroyer", index);
				}
			});
		},
		figureRoration({ commit }) {
			//find separately all X and Y of current figure
			let currentCoords = [...this.getters.getCurrentFigureCoords];
			let allXOld = [];
			let allYOld = [];
			let zeroCoords = [];
			for (let i = 0; i < 4; i++) {
				let xOld = currentCoords[i][1];
				let yOld = currentCoords[i][0];
				allXOld.push(xOld);
				allYOld.push(yOld);
			}
			//define differncies between current coords and zero coords(0,0)
			for (let i = 0; i < 4; i++) {
				let x = currentCoords[i][1] - Math.min(...allXOld);
				let y = currentCoords[i][0] - Math.min(...allYOld);
				zeroCoords.push([y, x]);
			}
			//measure sides of figure and determine orientation
			let size;
			let verticalOrientation = false;
			if (Math.max(...allXOld) - Math.min(...allXOld) > Math.max(...allYOld) - Math.min(...allYOld)) {
				size = Math.max(...allXOld) - Math.min(...allXOld) + 1;
				verticalOrientation = false;
			} else {
				size = Math.max(...allYOld) - Math.min(...allYOld) + 1;
				verticalOrientation = true;
			}
			//build square grid for figure with side length equals longest figure side
			let sandBoxGlass = [];
			for (let i = 0; i < size; i++) {
				sandBoxGlass.push(Array(size).fill(0));
			}
			for (let i = 0; i < 4; i++) {
				let x = zeroCoords[i][1];
				let y = zeroCoords[i][0];
				sandBoxGlass[y].splice(x, 1, 1);
			}
			//rotate figure via matrix transposition
			let rotatedMatrix = sandBoxGlass[0].map((value, index) => sandBoxGlass.map((row) => row[index]).reverse());
			//define coords of rotated figure
			let rotatedCoords = [];
			for (let y = 0; y < rotatedMatrix.length; y++) {
				let Xreferences = [];
				rotatedMatrix[y].forEach((elem, index, array) => {
					if (elem === 1) {
						Xreferences.push(index);
					}
					return Xreferences;
				});
				for (let i = 0; i < Xreferences.length; i++) {
					rotatedCoords.push([y, Xreferences[i]]);
				}
			}
			//find position of rotated figure at the coordinates of current figure
			let newCoords = [];
			let xNew;
			for (let i = 0; i < 4; i++) {
				let yNew = rotatedCoords[i][0] + Math.min(...allYOld);
				if (size === 4) {
					if (verticalOrientation === true) {
						xNew = rotatedCoords[i][1] + Math.min(...allXOld) - 1;
					} else {
						xNew = rotatedCoords[i][1] + Math.min(...allXOld) - 2;
					}
				} else {
					if (verticalOrientation === true && size === 3) {
						xNew = rotatedCoords[i][1] + Math.min(...allXOld) - 1;
					} else {
						xNew = rotatedCoords[i][1] + Math.min(...allXOld);
					}
				}
				newCoords.push([yNew, xNew]);
			}
			//check is alleged place available
			//walls
			for (let i = 0; i < 4; i++) {
				let blockCoords = newCoords.filter((block) => {
					return block[1] < 0 || block[1] > 9;
				});
				if (blockCoords.length > 0) {
					return;
				}
			}
			//figures in the glass
			commit("changeCurrentFigureCoordsInGlassTo", 0);
			let glass = [...this.getters.getGlass];
			let color = this.getters.getCurrentFigureColor;
			for (let i = 0; i < 4; i++) {
				let x = newCoords[i][1];
				let y = newCoords[i][0];
				if (glass[y][x] === 1) {
					commit("changeCurrentFigureCoordsInGlassTo", color);
					return;
				}
			}
			commit("updateCurrenFigureOrientation", { newCoords, size });
			commit("changeCurrentFigureCoordsInGlassTo", color);
		},
	},
	mutations: {
		difficultyChanger(state, value) {
			state.gravitySpeed = value;
		},
		softDrop(state, value) {
			if (value === `drop`) {
				state.previousGravitySpeed = this.getters.getGravitySpeed;
				state.gravitySpeed = 25;
			} else {
				state.gravitySpeed = state.previousGravitySpeed;
			}
		},
		toggleGameState(state, value) {
			state.gameState = value;
		},
		toggleColorScheme(state, value) {
			state.colorScheme = value;
		},
		setGOstatus(state, value) {
			state.isGameOver = value;
		},
		addNextFigureCoordinatesToState(state, coords) {
			state.nextFigureCoords = coords;
		},
		addNextFigureColorToState(state, color) {
			state.nextFigureColor = color;
		},
		addCurrentFigureCoordinatesToState(state, coords) {
			state.currentFigureCoords = coords;
		},
		addCurrentFigureColorToState(state, color) {
			state.currentFigureColor = color;
		},
		updateCurrenFigureOrientation(state, { newCoords, size }) {
			for (let i = 0; i < size; i++) {
				state.currentFigureCoords.unshift(Array(size).fill(0));
			}
			state.currentFigureCoords = newCoords;
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
			if (value > 0 || typeof value === "string") {
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
			state.glass = [];
			for (var i = 0; i < 21; i++) {
				state.glass.push(Array(10).fill(0));
			}
		},
		lineDestroyer(state, index) {
			state.glass.splice(index, 1);
			state.glass.unshift(Array(10).fill(0));
			state.scoreCounter++;
		},
	},
});
