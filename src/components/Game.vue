<template>
	<div class="game">
		<!-- <Keypress key-event="keydown" :key-code="87" @success="increaseGravitySpeed" /> -->
		<Keypress key-event="keydown" :key-code="83" @success="decreaseGravitySpeed" />
		<Keypress key-event="keydown" :key-code="65" @success="moveFigureLeft" />
		<Keypress key-event="keydown" :key-code="68" @success="moveFigureRight" />
		<Keypress key-event="keydown" :key-code="87" @success="test4Rorate" />
		<div class="glass">
			<div class="line" v-for="line in glass">
				<span class="block" v-for="block in line" :style="{ 'background-color': activeColor(block) }"> </span>
			</div>
		</div>
		<div class="widget">
			<b>speed: {{ 2000 - gravitySpeed }}</b>
			<br />
			<b>NEXT FIGURE</b>
			<div class="w-line" v-for="line in WidgetMatrix">
				<span class="w-block" v-for="block in line" :style="{ 'background-color': activeColor(block) }"> </span>
			</div>
		</div>
	</div>
</template>

<script>
const GLASS_LIMIT_RIGHT = 9;
const GLASS_LIMIT_LEFT = 0;
const GLASS_LIMIT_BOTTOM = 20;
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
		increaseGravitySpeed() {
			if (this.gravitySpeed >= 100) {
				this.$store.dispatch("changeGravitySpeed", 1);
			}
			return;
		},
		decreaseGravitySpeed() {
			if (this.gravitySpeed <= 2000) {
				this.$store.dispatch("changeGravitySpeed", 0);
			}
			return;
		},
		activeGameState() {
			if (this.gameState === "game_over") {
				return "0.4";
			} else {
				return "1";
			}
		},
		activeColor(block) {
			if (block) {
				return "black";
			} else {
				return "white";
			}
		},
		test4Rorate() {
			this.$store.dispatch("test4Rorate");
		},

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
				this.$store.dispatch("togleGameState", "game_over");
				return;
			}
			if (this.canCurrentFigureMoveDown() === true) {
				this.moveFigureDown();
			} else {
				this.$store.dispatch("seekAndDestroyFullLine");
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
			if (coords[3][0] < GLASS_LIMIT_BOTTOM) {
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
		isCurrentFigureBumpTheWall(direction) {
			let limit;
			if (direction === `left`) {
				limit = GLASS_LIMIT_LEFT;
			} else {
				limit = GLASS_LIMIT_RIGHT;
			}
			let figureCoords = [...JSON.parse(JSON.stringify(this.currentFigureCoords))];
			let blockCoords = figureCoords.filter((block) => {
				return block[1] === limit;
			});
			if (blockCoords.length > 0) {
				return true;
			}
		},
		isHorizontalMovementPossible(direction) {
			let k;
			if (direction === `left`) {
				k = -1;
			} else {
				k = +1;
			}
			let coords = [...JSON.parse(JSON.stringify(this.currentFigureCoords))];
			for (let i = 0; i < 4; i++) {
				let x = coords[i][1];
				let y = coords[i][0];
				if (this.glass[y][x + k] === 1) {
					let selfAffectBlocks = coords.filter((block) => {
						return block[0] === y && block[1] === x + k;
					});
					if (selfAffectBlocks.length === 0) {
						return false;
					}
				}
			}
			return true;
		},
		moveFigureDown() {
			this.$store.dispatch("moveFigureDown");
		},
		moveFigureLeft() {
			if (this.isCurrentFigureBumpTheWall(`left`) === true) {
				return;
			} else {
				if (this.isHorizontalMovementPossible(`left`) === true) {
					this.$store.dispatch("moveFigureHorizontally", `left`);
				}
				return;
			}
		},
		moveFigureRight() {
			if (this.isCurrentFigureBumpTheWall(`right`) === true) {
				return;
			} else {
				if (this.isHorizontalMovementPossible(`right`) === true) {
					this.$store.dispatch("moveFigureHorizontally", `right`);
				}
				return;
			}
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
