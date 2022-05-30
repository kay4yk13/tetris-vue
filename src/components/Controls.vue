<template>
	<div class="controls">
		<h1>CONTROLS</h1>
		<Keypress key-event="keyup" :key-code="13" @success="btnpress" />
		<Keypress key-event="keyup" :key-code="32" @success="random" />
		<!-- <button @click="btnpress">GAMECHANGER</button>
		<button @click="random">RANDOM</button> -->
	</div>
</template>
<script>
export default {
	components: {
		Keypress: () => import("vue-keypress"),
	},
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
