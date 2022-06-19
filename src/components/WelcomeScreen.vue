<template>
	<div class="welcome">
		<h1 @click="start">WELCOME</h1>
	</div>
</template>

<script>
export default {
	methods: {
		start() {
			this.$store.dispatch("togleGameState", "game");
			this.$store.dispatch("setGOstatus", 0);
		},
	},
};
</script>
<style></style>
