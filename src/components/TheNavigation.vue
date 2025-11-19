<template>
	<div class="menu">
		<!-- <audio id="oli" preload="auto" src="./resources/artworks/1.mp3"></audio> -->

		<div class="topesq">
			<a href="https://www.instagram.com/noentulho/" target="_blank">
			no entulho
			</a>
		</div>
		<div class="topdir">
			<a href="https://vimeo.com/showcase/8427780" target="_blank">
			<div class="ptmenu">residencias artisticas</div>
			<span class="separador"> </span>
			<div class="inglesmenu">art residencies</div>
			</a>
		</div>

	</div>
</template>
<script>

export default {

	computed: {

		     filmes() {
            return this.$store.state.sections
          },
		audio() {
			var vm = this.filmes;
			var audio = vm.noentulhoLanding.acf.ficheiros.audio;
			var cp = new Audio(audio);
			return cp;
		},
		// estatico() {
		// 	var vm = this.filmes;
		// 	var estatico = vm.noentulhoLanding.acf.ficheiros.estatico;
		// 	return estatico;
		// },
	},
	created() {
				// console.log(this.estatico);

	},

	methods: {
	// 	    playSound (sound) {
	// 			var audio = new Audio(sound);
    //   if(sound) {
        
	// 	if (audio.paused) {
	// 		console.log(audio);
	// 		audio.play();
	// 	}else{
	// 		audio.pause();
	// 	}
                
    //   }
    // },
	// 	onReady() {
	// 		this.playerReady = true
	// 	},
	// 	play () {
	// 		this.$refs.player.play()
	// 	},
	// 	pause () {
	// 		this.$refs.player.pause()
	// 	}

	play (audio) {
      audio.isPlaying = true;
      this.audio.play();
    },
    
    pause (audio) {
      audio.isPlaying = false;
      this.audio.pause();
    }

	}
}
</script>
<style>
.menu {

		position: fixed;
		color: aliceblue;
		width: 100%; 
				  height: 10vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 10); 
		z-index: 1;
		text-transform: uppercase;
		display: grid;
		grid-template-columns: 400px auto 400px;
		grid-template-rows: 40px auto 40px;
		padding: 1em;
}

.topesq {
		height: 3vh;
		grid-column-start: 1;
		grid-row-start: 1;
}
.topdir {
		grid-column-start: 3;
		grid-row-start: 1;	
		height: 3vh;
		display: inline-flex;
		right: 1em;
		position: fixed;


}















.inglesmenu {
	font-family: "syne";
	text-transform: uppercase;
	/* font-weight: bolder; */
	font-size: 1.05em;
	line-height: 1.15;
}









 .menu a  { 
	 
	 color: aliceblue;
    text-decoration: none;
	display: flex;
	}


.separador {
	line-height: 0;
	width: 0.5em;
	/* display: none; */
}






  .sinatura{
	  display: inline-flex;
    /* flex-direction: row; */
    width: 100%;
    justify-content: center;
    /* left: 15vw; */
    /* right: 50%; */
    align-items: flex-end;
  }

.sepa{
	width: 2em;
}








#nav {
	/* padding-top: 2em; */
	/* padding: 2.5em; */
	position: fixed;
	z-index: 3;
	width: 100vw;
	text-transform: uppercase;
	display: block;
	text-align: center;
	background-color: #e62a59;
	/* margin-top: 1.1em; */
}
/* .navbar-expand .navbar-nav .nav-link {
  padding-right: 0px !important;
  padding-left: 0px !important;
} */

#nav a {
	/* font-weight: bold; */
	color: white;
}

#nav a.router-link-exact-active {
	color: #e62a59;
	text-decoration: none;
}
#nav a:hover,
#nav a:visited {
	text-decoration: underline;
}
</style>
