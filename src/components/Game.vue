<template>
	<div class="game">
		<div>1 - cube<br /></div>
		<Keypress key-event="keyup" :key-code="49" @success="loop" />

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
	},
	created() {
		this.loop();
	},
	methods: {
		loop() {
			this.$store.dispatch("addNewFigure", "T");
			window.setTimeout(() => {
				this.movingDown();
			}, 500);
		},
		movingDown() {
			if (this.counter == 18) {
				this.$store.dispatch("setNewDefaultGlass", this.glass);
				return;
			}
			console.log(this.counter);
			this.$store.dispatch("movingDown");
			this.counter++;
			window.setTimeout(() => {
				this.movingDown();
			}, 500);
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
