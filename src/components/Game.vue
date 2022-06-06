<template>
	<div class="game">
		<div>
			1 - o
			<br />
			2- T
		</div>
		<Keypress key-event="keyup" :key-code="49" @success="loopO" />
		<Keypress key-event="keyup" :key-code="50" @success="loopT" />
		<Keypress key-event="keyup" :key-code="51" @success="loop" />

		<div class="glass">
			<div class="line" v-for="line in glass">
				<span class="block" v-for="block in line" :style="{ 'background-color': activeColor(block) }"> </span>
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
		glass() {
			return this.$store.getters.getGlass;
		},
		ability() {
			return this.$store.getters.getAbility;
		},
		bottom() {
			// todo refactor => make dynamic
			return this.$store.getters.getFigureCoords[3][0];
		},
		figuresNames() {
			return this.$store.getters.getFiguresNames;
		},
	},
	created() {
		this.loop();
	},
	methods: {
		loop() {
			if (this.ability == 1) {
				this.loopT();
			}
			this.$store.dispatch("setAbility", 1);
			window.setTimeout(() => {
				this.loop();
			}, 150);
		},
		newFigureGenerator() {
			let i = this.figuresNames.length;
			let randI = Math.floor(Math.random() * i);
			return this.figuresNames[randI];
		},

		loopT() {
			let name = this.newFigureGenerator();
			this.$store.dispatch("checkGameOver", name);

			this.$store.dispatch("addNewFigure", name);
			window.setTimeout(() => {
				this.movingDown();
			}, 150);
		},

		loopO() {
			this.newFigureGenerator();
			this.$store.dispatch("addNewFigure", "O");
			window.setTimeout(() => {
				this.movingDown();
			}, 200);
		},
		movingDown() {
			this.$store.dispatch("checkEmptyBlocksBelow");
			if (this.ability == 1) {
				this.$store.dispatch("movingDown");
				window.setTimeout(() => {
					this.movingDown();
				}, 150);
			}
			this.$store.dispatch("setNewDefaultGlass", this.glass);
			this.$store.dispatch("setAbility", 0);
			return;
		},
		activeColor(block) {
			if (block) {
				return "black";
			} else {
				return "white";
			}
		},
	},
};
</script>
<style>
.glass {
	margin: auto;
	width: 405px;
	height: 805px;
	border-style: hidden solid solid solid;
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
}
</style>
