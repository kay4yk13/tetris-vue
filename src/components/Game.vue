<template>
	<div class="game">
		<div class="glass">
			<div class="line" v-for="line in glass">
				<span class="block" v-for="block in line" :style="{ 'background-color': activeColor(block) }"> </span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		glass() {
			return this.$store.getters["GetGlass"];
		},
	},
	methods: {
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
