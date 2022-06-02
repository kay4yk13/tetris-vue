<template>
	<div>
		<WelcomeScreen v-if="game_state == 'welcome'"></WelcomeScreen>
		<Game v-if="game_state == 'game'"></Game>
		<GameOver v-if="game_state == 'game_over'"></GameOver>
		<Controls></Controls>
	</div>
</template>
<script>
import Game from "./components/Game.vue";
import WelcomeScreen from "./components/WelcomeScreen.vue";
import GameOver from "./components/Gameover.vue";
import Controls from "./components/Controls.vue";

export default {
	components: {
		Game,
		WelcomeScreen,
		GameOver,
		Controls,
	},
	computed: {
		game_state() {
			return this.$store.getters["getStateOfGame"];
		},
	},
};
</script>
<style></style>
