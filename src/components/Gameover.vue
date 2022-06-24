<template>
	<div class="gameover" @click="this.goIndex">
		<h1>GAME OVER</h1>
		<h2>press Any Key to return on main screen</h2>
	</div>
</template>
<script>
export default {
	created() {
		document.addEventListener("keydown", (event) => this.goIndex());
	},
	methods: {
		goIndex() {
			location.reload();
			// this.$store.dispatch("toggleGameState", "welcome");
			// this.$store.dispatch("setGOstatus", 0);
			// this.$store.dispatch("cleanGlass");
		},
	},
};
</script>
<style>
.gameover {
	position: absolute;
	z-index: 1;
	top: 20%;
	width: 100%;
	text-align: center;
	cursor: pointer;
}
</style>
