<template>
	<div class="game">
		<Keypress key-event="keyup" :key-code="49" @success="loop" /> 1 - full line

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
			return this.$store.getters["GetGlass"];
		},
	},
	// created() {
	// 	this.loop();
	// },
	methods: {
		loop() {
			console.table(this.glass);
			if (this.counter == 20) {
				this.$store.dispatch("updateGlass", this.glass);
				return;
			}
			console.log(this.counter);
			this.$store.dispatch("generateLine", this.counter);
			this.$store.dispatch("eraseLine", this.counter - 1);
			this.counter++;
			window.setTimeout(() => {
				this.loop();
			}, 500);
		},
		// dropO() {
		// 	if (this.counter == 20) {
		// 		this.$store.dispatch("updateGlass", this.glass);
		// 		return;
		// 	}
		// },
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
