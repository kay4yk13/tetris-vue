<template>
	<div class="welcome" @click="this.start">
		<h1>WELCOME</h1>
	</div>
</template>

<script>
export default {
	components: {},

	methods: {
		start() {
			this.$store.dispatch("togleGameState", "game");
			this.$store.dispatch("setGOstatus", 0);
			this.$store.dispatch("cleanGlass");
		},
	},
};
</script>
<style>
.button {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 20%;
	height: 20%;
}
</style>
