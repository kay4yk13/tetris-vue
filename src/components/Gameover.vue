<template>
	<div class="gameover" @click="this.goIndex">
		<h1>GAME OVER</h1>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},
	methods: {
		goIndex() {
			this.$store.dispatch("togleGameState", "welcome");
			this.$store.dispatch("setGOstatus", 0);
			this.$store.dispatch("cleanGlass");
		},
	},
};
</script>
<style>
h1 {
	position: absolute;
	z-index: 2;
	left: 40%;
	top: 40%;
	text-align: center;
	cursor: pointer;
	font-size: 50px;
}
</style>
