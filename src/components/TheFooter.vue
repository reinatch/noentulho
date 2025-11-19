<template>
	<div class="footer">
		<!-- <audio id="oli" preload="auto" src="./resources/artworks/1.mp3"></audio> -->

		<div class="botesq">
			<a href="https://artworks.pt/" target="_blank">
				<img
					class="logo"
					src="../../public/Logo_branco.png"
					alt="logotop"
				/>
			</a>
		</div>
		<div class="botdir">
		<div class="news_button">
		
			<a :href="'#ind' + numindex" >
			<div class="ptmenu">novidades</div>
			<span class="separador"> </span>
			<div class="inglesmenu">news</div>
			</a>
		
		</div>
		<div id="startButton" @click.prevent="audio.isPlaying ? pause(audio) : play(audio)">
						
			
			<div class="sound" id="som">
				<div class="sound--icon fa fa-volume-off">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.25em"
						height="1.25em"
						fill="currentColor"
						class="bi bi-volume-off"
						viewBox="0 0 20 15"
					>
						<path
							d="M10.717 3.55A.5.5 0 0 1 11 4v8a.5.5 0 0 1-.812.39L7.825 10.5H5.5A.5.5 0 0 1 5 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM10 5.04 8.312 6.39A.5.5 0 0 1 8 6.5H6v3h2a.5.5 0 0 1 .312.11L10 10.96V5.04z"
						/>
					</svg>
				</div>
				<div class="sound--wave sound--wave_one"></div>
				<div class="sound--wave sound--wave_two"></div>
			</div>
		</div>

		<div class="barContainer">
			<div class="bar"></div>
		</div>
		</div>

	</div>
</template>
<script>
import {mapState} from 'vuex'

export default {
	data() {
		return {
	
      altura: '',  // default: 0
	  numindex: ''
		}
	},
	computed: {

		...mapState([
			'filmes'
		]),
		audio() {
			var vm = this.filmes;
			var audio = vm.noentulhoLanding.acf.ficheiros.audios;
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
				// console.log(this.filmes);

	},
	watch: {
		filmes(e){


			this.altura = '' + e.noentulhoLanding.page_data.length;
			this.numindex = this.altura - 1;
			console.log(this.numindex);
			
			},

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
.footer {

		position: fixed;
		bottom: 1em;
		color: aliceblue;
		width: 100%; 
				  height: 10vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 10); 
		z-index: 1;
		text-transform: uppercase;
		display: grid;
		grid-template-columns: 400px auto 400px;
		grid-template-rows: 40px auto 40px;
		padding: 0 1em;
}


.botesq {
		grid-column-start: 1;
		grid-row-start: 3;

		height: 3vh;
		align-self: end;
		z-index: 100;

}
.botdir {
		grid-column-start: 3;
		grid-row-start: 3;
}


#startButton {
	position: fixed;
	bottom: 0;
	right: 2.5em;
	z-index: 100;
}

.barContainer {
	position: fixed;
	width: 2px;
	height: 300px;
	background-color: lightgray;
	right: 1em;
	align-self: flex-end;
	bottom: 1em;
}
.bar {
	height: 20%;
	width: 100%;
	background-color: #0a0e28;
}

.news_button{
	position: fixed;
	bottom: 1em;
	right: 6em;
	z-index: 100;

}

.news_button a{
    display: flex;

}










.logo {
	/* background-color: orangered; */
	width: auto;
	height: 1.4em;
}
.inglesmenu {
	font-family: "syne";
	text-transform: uppercase;
	/* font-weight: bolder; */
	font-size: 1.05em;
	line-height: 1.15;
}


.sound {
	width: 100%;
	height: 100%;
	position: relative;
	cursor: pointer;
	display: inline-block;
	margin-bottom: 0.5em;
}
.sound--icon {
	color: aliceblue;
	width: 100%;
	height: 100%;
	line-height: 100%;
	font-size: 1.75em;
	display: block;
	margin: auto;
}
.sound--wave {
	position: absolute;
	border: 2px solid transparent;
	border-right: 2px solid aliceblue;
	border-radius: 50%;
	transition: all 200ms;
	margin: auto;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}
.sound--wave_one {
	width: 50%;
	height: 50%;
}
.sound--wave_two {
	width: 75%;
	height: 75%;
}
.sound-mute .sound--wave {
	border-radius: 0;
	width: 50%;
	height: 50%;
	border-width: 0 2px 0 0;
}
.sound-mute .sound--wave_one {
	transform: rotate(45deg) translate3d(0, -50%, 0);
}
.sound-mute .sound--wave_two {
	transform: rotate(-45deg) translate3d(0, 50%, 0);
}





</style>
