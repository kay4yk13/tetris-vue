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
		sandBoxGlass: [],
		currentFigureCoords: [],
		nextFigureCoords: [],
		nextFigureWIdgetMatrix: [],
		gameState: "welcome",
		isGameOver: 0,
		gravitySpeed: 1000, //actually it's a delay in ms
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
		getFigures(state) {
			return [...state.figures];
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
		moveFigureHorizontally({ commit }, direction) {
			let coords = [...this.getters.getCurrentFigureCoords];
			commit("changeCurrentFigureCoordsInGlassTo", 0);
			for (let i = 0; i < 4; i++) {
				if (direction === `left`) {
					coords[i][1]--;
				} else {
					coords[i][1]++;
				}
			}
			commit("addCurrentFigureToState", coords);
			commit("changeCurrentFigureCoordsInGlassTo", 1);
		},
		changeGravitySpeed({ commit }, vector) {
			commit("changeGravitySpeed", vector);
		},
		seekAndDestroyFullLine({ commit }) {
			let glass = [...this.getters.getGlass];
			glass.forEach((row, index) => {
				if (row.every((value) => value > 0)) {
					commit("lineDestroyer", index);
				}
			});
		},
		test4Rorate({ commit }) {
			let coords = [...this.getters.getCurrentFigureCoords];
			let allX = [];
			let allY = [];
			let zeroCoords = [];
			let size;
			// let coordsDiff = []; somehow get differencies between zero cords of each block and currentfigurecoords
			for (let i = 0; i < 4; i++) {
				let x = coords[i][1];
				let y = coords[i][0];
				allX.push(x);
				allY.push(y);
			}
			for (let i = 0; i < 4; i++) {
				let x = coords[i][1] - Math.min(...allX);
				let y = coords[i][0] - Math.min(...allY);
				zeroCoords.push([y, x]);
			}
			if (Math.max(...allX) - Math.min(...allX) > Math.max(...allY) - Math.min(...allY)) {
				size = Math.max(...allX) - Math.min(...allX) + 1;
			} else {
				size = Math.max(...allY) - Math.min(...allY) + 1;
			}
			commit("putFigureIntoRotatingSandBox", { zeroCoords, size });
			commit("rotateFigureInRotatingSandBox");
		},
	},

	mutations: {
		changeGravitySpeed(state, vector) {
			if (vector === 1) {
				state.gravitySpeed -= 50;
			} else {
				state.gravitySpeed += 50;
			}
		},
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
		////HERE
		putFigureIntoRotatingSandBox(state, { zeroCoords, size }) {
			state.sandBoxGlass = [];
			console.log(size);
			for (let i = 0; i < size; i++) {
				state.sandBoxGlass.unshift(Array(size).fill(0));
			}
			for (let i = 0; i < 4; i++) {
				let x = zeroCoords[i][1];
				let y = zeroCoords[i][0];
				this.state.sandBoxGlass[y].splice(x, 1, 1);
			}
		},
		rotateFigureInRotatingSandBox(state) {
			let matrix = [...JSON.parse(JSON.stringify(this.state.sandBoxGlass))];
			console.table("curent figure", matrix);
			let rotatedMatrix = matrix[0].map((value, index) => matrix.map((row) => row[index]).reverse());
			console.table("rotated figure", rotatedMatrix);
			let coords = [];
			for (let y = 0; y < rotatedMatrix.length; y++) {
				let Xreferences = [];
				rotatedMatrix[y].forEach((elem, index, array) => {
					if (elem === 1) {
						Xreferences.push(index);
					}
					return Xreferences;
				});
				console.log("X coordinate:", Xreferences);
				for (let k = 0; k < Xreferences.length; k++) {
					coords.push([y, Xreferences[k]]);
				}
			}
			console.log("array of coords:", coords);
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
			if (value > 0) {
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
				[1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
			];
		},
		lineDestroyer(state, index) {
			state.glass.splice(index, 1);
			state.glass.unshift(Array(10).fill(0));
		},
	},
});
1;
