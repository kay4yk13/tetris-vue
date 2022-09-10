<template>
	<div class="game">
		<div class="glass">
			<div class="line" v-for="line in glass">
				<span class="block" v-for="block in line" :style="{ 'background-color': activeColor(block) }"> </span>
			</div>
		</div>
		<div class="widget">
			<b>NEXT FIGURE</b>
			<div class="w-line" v-for="line in widgetMatrix">
				<span class="w-block" v-for="block in line" :style="{ 'background-color': activeColor(block) }"> </span>
			</div>
			<b>Your Score: {{ score * 100 }}</b> <br />
			<b>speed: {{ 1 + Math.floor(score / 10) }}</b>
			<br /><br /><br />
			<b>Controls: arrows</b>
			<b></b>
		</div>
	</div>
</template>

<script>
import useSound from "vue-use-sound";
import Sfx from "../assets/sounds.mp3";
const GLASS_LIMIT_RIGHT = 9;
const GLASS_LIMIT_LEFT = 0;
const GLASS_LIMIT_BOTTOM = 20;
var KEY_FLAG = true;

export default {
	data() {
		return {
			vlm:0.3,
		};
	},
	computed: {
		gameState() {
			return this.$store.getters.getStateOfGame;
		},
		gravitySpeed() {
			return this.$store.getters.getGravitySpeed;
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
		currentFigureCoords() {
			return this.$store.getters.getCurrentFigureCoords;
		},
		nextFigureColor() {
			return this.$store.getters.getNextFigureColor;
		},
		currentFigureColor() {
			return this.$store.getters.getCurrentFigureColor;
		},
		isGameOver() {
			return this.$store.getters.getGOstatus;
		},
		widgetMatrix() {
			return this.$store.getters.getWidgetMatrix;
		},
		score() {
			return this.$store.getters.getScoreCounter;
		},
		colorSheme() {
			return this.$store.getters.getColorScheme;
		},
	},
	setup() {
		const [play] = useSound(Sfx, {
			sprite: {
				move: [2220, 500],
				rotate: [2890, 150],
				drop: [1290, 250],
				destroy: [0, 700],
				gameover: [8100, 1100],
			},
			volume: 0.3,
		});
		return {
			play,
		};
	},
	watch: {
		score() {
			this.play({ id: "destroy" });
		},
	},
	created() {
		this.init();
	},
	mounted() {
		document.addEventListener("keydown", (event) => this.keyboardDown(event));
		document.addEventListener("keyup", (event) => this.keyboardUp(event));
	},
	methods: {
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
				this.$store.dispatch("toggleGameState", "game_over");
				this.play({ id: "gameover" });
				return;
			}
			if (this.canCurrentFigureMoveDown() === true) {
				this.moveFigureDown();
			} else {
				this.$store.dispatch("seekAndDestroyFullLine");
				this.$store.dispatch("difficultyChanger");
				this.putNextFigureInTheGlass();
			}
			window.setTimeout(() => {
				this.loop();
			}, this.gravitySpeed);
		},
		keyboardDown(event) {
			if (this.isGameOver != 1) {
				if (event.key === "ArrowLeft") this.moveFigureLeft();
				if (event.key === "ArrowRight") this.moveFigureRight();
				if (event.key === "ArrowDown" && KEY_FLAG === true) this.softDrop(`drop`), this.play({ id: "move" }), (KEY_FLAG = false);
				if (event.key === "ArrowUp" && KEY_FLAG === true) this.figureRoration(), this.play({ id: "rotate" }), (KEY_FLAG = false);
				if (event.key === "Escape") window.location.reload();
			}
		},
		keyboardUp(event) {
			if (this.isGameOver != 1) {
				if (event.key === "ArrowUp") KEY_FLAG = true;
				if (event.key === "ArrowDown") this.softDrop(`stop`), (KEY_FLAG = true);
			}
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
				if (this.colorSheme === `cf`) {
					return block;
				} else {
					return "black";
				}
			} else {
				return "white";
			}
		},
		prepareNextFigure() {
			let name = this.prepareNextFigureName();
			let coords = [...JSON.parse(JSON.stringify(this.getFigureStartCoords(name)))];
			let color = this.getFigureStartColor(name);
			this.$store.dispatch("addNextFigureCoordinatesToState", { coords, color });
		},
		prepareNextFigureName() {
			let index = Math.floor(Math.random() * this.figuresNames.length);
			return this.figuresNames[index];
		},
		getFigureStartCoords(name) {
			return this.$store.getters.getFigureStartCoords(name);
		},
		getFigureStartColor(name) {
			return this.$store.getters.getFigureStartColor(name);
		},
		putNextFigureInTheGlass() {
			if (this.isNextFigureCollideGlass() === false) {
				let coords = [...JSON.parse(JSON.stringify(this.nextFigureCoords))];
				let color = this.nextFigureColor;
				this.$store.dispatch("addCurrentFigureCoordinatesToState", { coords, color });
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
				if (this.glass[y][x] > 0 || typeof this.glass[y][x] === "string") {
					this.play({ id: "drop" });
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
					if (this.glass[y + 1][x] > 0 || typeof this.glass[y + 1][x] === "string") {
						let selfAffectBlocks = coords.filter((block) => {
							return block[0] === y + 1 && block[1] === x;
						});
						if (selfAffectBlocks.length === 0) {
							this.play({ id: "drop" });
							return false;
						}
					}
				}
				return true;
			}
			this.play({ id: "drop" });
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
				if (this.glass[y][x + k] > 0 || typeof this.glass[y][x + k] === `string`) {
					let selfAffectBlocks = coords.filter((block) => {
						return block[0] === y && block[1] === x + k;
					});
					if (selfAffectBlocks.length === 0) {
						this.play({ id: "drop" });
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
					this.play({ id: "move" });
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
					this.play({ id: "move" });
				}
				return;
			}
		},
		figureRoration() {
			this.$store.dispatch("figureRoration");
		},
		softDrop(value) {
			this.$store.dispatch("softDrop", value);
		},
	},
};
</script>
<style>
.glass {
	margin: auto;
	margin-top: 5%;
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
	margin-top: 5%;
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
b {
	font-family: "Press Start 2P", cursive;
	font-size: 10px;
	padding-top: 4%;
}
</style>
