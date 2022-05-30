<template>
	<div class="controls">
		<h1>CONTROLS</h1>
		<button @click="btnpress">GAMECHANGER</button>
		<button @click="random">RANDOM</button>
	</div>
</template>
<script>
export default {
	methods: {
		btnpress() {
			this.$store.dispatch("Togle", "game");
		},
		random() {
			this.$store.dispatch("Filler");
		},
	},
};
</script>
