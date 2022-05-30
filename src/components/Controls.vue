<template>
	<div class="controls">
		<h1>CONTROLS</h1>
		<button @click="btnpress">GAMECHANGER</button>
	</div>
</template>
<script>
import { mapActions } from "vuex";
export default {
	methods: {
		btnpress() {
			this.$store.dispatch("Togle", "game");
		},
	},
};
</script>
