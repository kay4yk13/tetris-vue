<template>
	<div>
		<Keypress key-event="keyup" :key-code="null" @success="btnpress" />
	</div>
</template>
<script>
export default {
	components: {
		Keypress: () => import("vue-keypress"),
	},
	methods: {
		btnpress() {
			this.$store.dispatch("togleGameState", "game");
		},
	},
};
</script>
