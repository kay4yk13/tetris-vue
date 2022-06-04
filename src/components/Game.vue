<template>
	<div class="game">
		<div>
			1 - o
			<br />
			2- T
		</div>
		<Keypress key-event="keyup" :key-code="49" @success="loopO" />
		<Keypress key-event="keyup" :key-code="50" @success="loopT" />
		<Keypress key-event="keyup" :key-code="51" @success="TEST" />

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
		return {
			counter: 0,
		};
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
	},
	// created() {
	// 	this.loop();
	// },
	methods: {
		TEST() {
			this.$store.dispatch("addNewFigure", "TEST");
			this.$store.dispatch("TEST");
		},
		loopT() {
			this.$store.dispatch("addNewFigure", "T");
			window.setTimeout(() => {
				this.movingDown();
			}, 200);
		},
		loopO() {
			this.$store.dispatch("addNewFigure", "o");
			window.setTimeout(() => {
				this.movingDown();
			}, 200);
		},
		movingDown() {
			this.$store.dispatch("checkEmptyBlocksBelow");
			if (this.ability == 1 && this.bottom < 19) {
				this.$store.dispatch("movingDown");
				window.setTimeout(() => {
					this.movingDown();
				}, 200);
			}
			this.$store.dispatch("setNewDefaultGlass", this.glass);
			this.$store.dispatch("setAbility", 1);
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
