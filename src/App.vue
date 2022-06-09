<template>
	<div>
		<WelcomeScreen v-if="gameState == 'welcome'"></WelcomeScreen>
		<!-- <Game v-if="gameState == 'game' || 'game_over'" :style="{ opacity: activeGameState() }"></Game> -->
		<Game v-if="gameState != 'welcome'" :style="{ opacity: activeGameState() }"></Game>
		<GameOver v-if="gameState == 'game_over'"></GameOver>
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
		gameState() {
			return this.$store.getters.getStateOfGame;
		},
	},
	methods: {
		activeGameState() {
			if (this.gameState === "game_over") {
				return "0.5";
			} else {
				return "1";
			}
		},
	},
};
</script>
<style></style>
