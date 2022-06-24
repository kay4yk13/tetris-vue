<template>
	<div class="welcome">
		<h1 @click="start">TETRIS</h1>
		<h2>Chose color scheme or press Any Key to start the game</h2>
		<div class="controls">
			<button @click="toggleColorScheme(`cf`)">COLORFULL</button>
			<button @click="toggleColorScheme(`bw`)">BLACK&WHITE</button>
		</div>
		<div class="contacts">
			<a href="https://github.com/kay4yk13/tetris-vue" target="_blank">GitHub</a>
		</div>
	</div>
</template>
<script>
export default {
	created() {
		document.addEventListener("keydown", (event) => this.start());
	},
	methods: {
		start() {
			this.$store.dispatch("toggleGameState", "game");
			this.$store.dispatch("setGOstatus", 0);
		},
		toggleColorScheme(value) {
			this.$store.dispatch("toggleColorScheme", value);
			this.start();
		},
	},
};
</script>
<style>
.welcome {
	text-align: center;
	margin-top: 20%;
}
.controls {
	font-family: "Press Start 2P";
	margin-top: 5%;
	font-size: 10px;
}
button {
	font-family: "Press Start 2P";
	margin: 0% 1%;
}
.contacts {
	font-family: "Press Start 2P";
	font-size: 10px;
	text-align: center;
	margin-top: 10%;
}
.contacts a {
	text-decoration: none;
	font-style: normal;
	color: black;
}
</style>
