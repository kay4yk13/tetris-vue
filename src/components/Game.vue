<template>
	<div class="game">
		<Keypress key-event="keyup" :key-code="0" @success="init" />
		<div class="glass">
			<div class="line" v-for="line in glass">
				<span class="block" v-for="block in line" :style="{ 'background-color': activeColor(block) }"> </span>
			</div>
		</div>
		<div class="widget">
			<b>NEXT FIGURE</b>
			<div class="w-line" v-for="line in WidgetMatrix">
				<span class="w-block" v-for="block in line" :style="{ 'background-color': activeColor(block) }"> </span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	components: {
		Keypress: () => import("vue-keypress"),
	},
	data() {
		return {};
	},
	computed: {
		gameState() {
			return this.$store.getters.getStateOfGame;
		},
		glass() {
			return this.$store.getters.getGlass;
		},
		figuresNames() {
			return this.$store.getters.getFiguresNames;
		},
		nextFigureCoords() {
			return this.$store.getters.getNextFigureCoords;
		},
		gravitySpeed() {
			return this.$store.getters.getGravitySpeed;
		},
		currentFigureCoords() {
			return this.$store.getters.getCurrentFigureCoords;
		},
		isGameOver() {
			return this.$store.getters.getGOstatus;
		},
		WidgetMatrix() {
			return this.$store.getters.getWidgetMatrix;
		},
	},
	created() {
		this.init();
	},
	methods: {
		activeGameState() {
			if (this.gameState === "game_over") {
				return "0.4";
			} else {
				return "1";
			}
		},
		//norm (core method of rendering)
		activeColor(block) {
			if (block) {
				return "black";
			} else {
				return "white";
			}
		},
		//main function
		init() {
			this.$store.dispatch("cleanGlass");
			this.prepareNextFigure();
			this.putNextFigureInTheGlass();
			window.setTimeout(() => {
				this.loop();
			}, this.gravitySpeed);
		},
		loop() {
			if (this.isGameOver === 1) {
				this.$store.dispatch("addCurrentFigureCoordsToGlass");
				this.$store.dispatch("togleGameState", "game_over");
				return;
			}
			if (this.canCurrentFigureMoveDown() === true) {
				this.moveFigureDown();
			} else {
				this.putNextFigureInTheGlass();
			}
			window.setTimeout(() => {
				this.loop();
			}, this.gravitySpeed);
		},
		prepareNextFigure() {
			let name = this.prepareNextFigureName();
			let coords = [...JSON.parse(JSON.stringify(this.getFigureStartCoords(name)))];
			this.$store.dispatch("addNextFigureToState", coords);
		},
		prepareNextFigureName() {
			let index = Math.floor(Math.random() * this.figuresNames.length);
			return this.figuresNames[index];
		},
		getFigureStartCoords(name) {
			return this.$store.getters.getFigureStartCoords(name);
		},
		putNextFigureInTheGlass() {
			if (this.isNextFigureCollideGlass() === false) {
				let coords = [...JSON.parse(JSON.stringify(this.nextFigureCoords))];
				this.$store.dispatch("addCurrentFigureToState", coords);
				this.$store.dispatch("addCurrentFigureCoordsToGlass");
				this.prepareNextFigure();
			} else {
				this.$store.dispatch("setGOstatus", 1);
			}
		},
		isNextFigureCollideGlass() {
			let coords = [...JSON.parse(JSON.stringify(this.nextFigureCoords))];
			for (let i = 0; i < 4; i++) {
				let x = coords[i][1];
				let y = coords[i][0];
				if (this.glass[y][x] === 1) {
					return true;
				}
			}
			return false;
		},
		canCurrentFigureMoveDown() {
			let coords = [...JSON.parse(JSON.stringify(this.currentFigureCoords))];
			if (coords[3][0] < 20) {
				for (let i = 0; i < 4; i++) {
					let x = coords[i][1];
					let y = coords[i][0];
					if (this.glass[y + 1][x] === 1) {
						let selfAffectBlocks = coords.filter((block) => {
							return block[0] === y + 1 && block[1] === x;
						});
						if (selfAffectBlocks.length === 0) {
							return false;
						}
					}
				}
				return true;
			}
			return false;
		},
		moveFigureDown() {
			this.$store.dispatch("moveFigureDown");
		},
	},
};
</script>
<style>
.glass {
	margin: auto;
	width: 405px;
	height: 802px;
	border-style: hidden solid solid solid;
}
.glass :first-child {
	display: none;
}
.line {
	height: 40px;
	display: flex;
}

.block {
	height: 100%;
	width: 10%;
	border-style: groove;
	border-width: 1px;
	border-color: rgb(134, 135, 139);
	display: block !important;
}
.widget {
	position: absolute;
	right: 5%;
	top: 5%;
	width: 200px;
	height: 400px;
	text-align: center;
}
.w-line {
	height: 40px;
	display: flex;
}
.w-block {
	height: 100%;
	width: 20%;
	border-style: groove;
	border-width: 1px;
	border-color: rgb(134, 135, 139);
}
</style>
