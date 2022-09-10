<template>
	<div>
		<WelcomeScreen v-if="gameState == 'welcome'"></WelcomeScreen>
		<Game v-if="gameState != 'welcome'" :style="{ opacity: activeGameState() }"></Game>
		<GameOver v-if="gameState == 'game_over'"></GameOver>
	</div>
</template>
<script>
import Game from "./components/Game.vue";
import WelcomeScreen from "./components/WelcomeScreen.vue";
import GameOver from "./components/Gameover.vue";

export default {
	components: {
		Game,
		WelcomeScreen,
		GameOver,
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
<style>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
h1 {
	font-family: "Press Start 2P", cursive;
	text-align: center;
	cursor: pointer;
	font-size: 50px;
}
h2 {
	font-family: "Press Start 2P";
	text-align: center;
	cursor: pointer;
	font-size: 20px;
}
</style>
