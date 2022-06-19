<template>
	<div class="gameover" @click="this.goIndex">
		<h1>GAME OVER</h1>
	</div>
</template>
<script>
export default {
	methods: {
		goIndex() {
			this.$store.dispatch("togleGameState", "welcome");
			this.$store.dispatch("setGOstatus", 0);
			this.$store.dispatch("cleanGlass");
		},
	},
};
</script>
<style></style>
