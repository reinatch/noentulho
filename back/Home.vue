<template>
	<div id="siteo" class="site">

		<div id="secto" class="sect" v-if="filmes.noentulhoLanding">


			<section class="panel" :class="section.acf_fc_layout" v-for="(section, index) in filmes.noentulhoLanding.acf.page_data" :key="index">

				<div v-if="section.acf_fc_layout === 'home'">
						<div class="titulohome"> {{ section.titulo }}</div>
						</div>

				<div v-if="section.acf_fc_layout === 'section_1'">
						<div class="box">
							<h1 class="titulobox" >{{section.pt.titulo}}</h1>
							<div class="contentbox">
								<p >
										{{section.pt.texto}}
								</p>
							</div>
						</div>
						<div class="box">
							<h1 class="inglestit" >{{section.en.titulo}}</h1>
							<div class="inglescont">
								<p >{{section.en.texto}}
								</p>
							</div>
						</div>
				</div>
				

			</section>






			<!-- <section class="panel section-one home">
				<div class="titulohome">
					<h1 >{{filmes.noentulhoLanding.acf.home.titulo}}</h1>
				</div>
			</section>

			<section class="panel section-dois dois">
				<div class="box">
					<h1 class="titulobox" >{{filmes.noentulhoLanding.acf.page2.titulo_pt}}</h1>
					<div class="contentbox">
						<p >
								{{filmes.noentulhoLanding.acf.page2.texto_pt}}
						</p>
					</div>
				</div>
				<div class="box">
					<h1 class="inglestit" >{{filmes.noentulhoLanding.acf.page2.titulo_en}}</h1>
					<div class="inglescont">
						<p >{{filmes.noentulhoLanding.acf.page2.texto_en}}
						</p>
					</div>
				</div>
			</section>

			<section class="panel section-tres dois">
				<div class="box">
						<h1 class="titulobox">{{filmes.noentulhoLanding.acf.page3.titulo_pt}}</h1>
					<div class="contentbox">
						<p>
								{{filmes.noentulhoLanding.acf.page3.texto_pt}}
						</p>
					</div>
				</div>
				<div class="box">
			<h1 class="inglestit">{{filmes.noentulhoLanding.acf.page3.titulo_en}}</h1>
					<div class="inglescont">
						<p>{{filmes.noentulhoLanding.acf.page3.texto_en}}
						</p>
					</div>
				</div>
			</section>

			<section class="panel section-quat home">
				<div class="titulo4">
					<h1>{{filmes.noentulhoLanding.acf.page4.titulo}}</h1>
				</div>
			</section>

			<section class="panel section-cinc dois">
				<div class="box">
					<h1 class="titulobox">{{filmes.noentulhoLanding.acf.page5.titulo_pt}}</h1>
					<div class="contentbox">
						<p>
								{{filmes.noentulhoLanding.acf.page5.texto_pt}}
						</p>
					</div>
				</div>
				<div class="box">
			<h1 class="inglestit">{{filmes.noentulhoLanding.acf.page5.titulo_en}}</h1>
					<div class="inglescont">
						<p>{{filmes.noentulhoLanding.acf.page5.texto_en}}
						</p>
					</div>
				</div>
			</section>

			<section class="panel section-seis um">
				<div class="box links">
					<h1 class="titulolinks">{{filmes.noentulhoLanding.acf.page6.titulo}}</h1>
					<div class="linkess">		
						<a class="contentlinks" :href="filmes.noentulhoLanding.acf.page6.link1.url" target="_blank"> {{filmes.noentulhoLanding.acf.page6.link1.title}}</a>
						<a class="contentlinksingl" :href="filmes.noentulhoLanding.acf.page6.link2.url" target="_blank"> {{filmes.noentulhoLanding.acf.page6.link2.title}}</a>
					</div>
				</div>
			</section>

			<section class="panel section-sete dois">
				<div class="box">
					<h1 class="titulobox">{{filmes.noentulhoLanding.acf.page7.titulo_pt}}</h1>
					<div class="contentbox">
						<p>
								{{filmes.noentulhoLanding.acf.page7.texto_pt}}
						</p>
					</div>
				</div>
				<div class="box">
				<h1 class="inglestit">{{filmes.noentulhoLanding.acf.page7.titulo_en}}</h1>
					<div class="inglescont">
						<p>{{filmes.noentulhoLanding.acf.page7.texto_en}}
						</p>
					</div>
				</div>
			</section>

			<section class="panel section-oito um">
				<div class="box links">
					<div class="titinline">
						<h1 class="titulolinks">{{filmes.noentulhoLanding.acf.page8.titulo_pt}}</h1>
						<span class="separador">&nbsp; &nbsp;</span>
						<h1 class="titulolinks1ieng">{{filmes.noentulhoLanding.acf.page8.titulo_en}}</h1>
					</div>
					<div class="downloads">
						<a class="contentlinks1" :href="filmes.noentulhoLanding.acf.page8.link1.url" target="_blank"> {{filmes.noentulhoLanding.acf.page8.link1.title}}</a>
						<a class="contentlinksingl1" :href="filmes.noentulhoLanding.acf.page8.link2.url" target="_blank"> {{filmes.noentulhoLanding.acf.page8.link2.title}}</a>
					</div>
				</div>
			</section> 











			<section class="panel section-nove dois" id="box1">
				<div class="box panoleft">
						<h1 class="titulobox marbot">{{filmes.noentulhoLanding.acf.intro.titulo_1}}</h1>
						<div class="contentboximage">

						<a class="contentlinks1" :href="filmes.noentulhoLanding.acf.intro.link_1.url" target="_blank"> 
													<img class="marbot" :src="filmes.noentulhoLanding.acf.intro.imagem_1.sizes.medium" :alt="filmes.noentulhoLanding.acf.intro.imagem_1.title" />
							{{filmes.noentulhoLanding.acf.intro.link_1.title}}



						</a>
						</div>
				</div>
				<div class="box panoright">
						<h1 class="inglestit marbot">{{filmes.noentulhoLanding.acf.intro.titulo_2}}</h1>
						<div class="inglescontimage">

						<a class="contentlinksingl1" :href="filmes.noentulhoLanding.acf.intro.link_2.url" target="_blank"> 
							
													<img class="marbot" :src="filmes.noentulhoLanding.acf.intro.imagem_2.sizes.medium" :alt="filmes.noentulhoLanding.acf.intro.imagem_2.title" />
							
							{{filmes.noentulhoLanding.acf.intro.link_2.title}}



						</a>
						</div>
				</div>
			</section> 

			<section class="panel section-dez dois">

				<div class="box links">
					<div class="titinline">
						<h1 class="titulolinks">{{filmes.noentulhoLanding.acf.anuncio.titulo_pt}}</h1>
						<span class="separador">&nbsp; &nbsp;</span>
						<h1 class="titulolinks1ieng">{{filmes.noentulhoLanding.acf.anuncio.titulo_en}}</h1>
					</div>
					<div class="titinline">
						<p class="contentbox">{{filmes.noentulhoLanding.acf.anuncio.texto_pt}}</p>
						<span></span>
						<p class="inglescont">{{filmes.noentulhoLanding.acf.anuncio.texto_en}}</p>
					</div>
				</div>

			</section>  

			<section class="panel section-onze dois">

				<div class="boxstream">
					<div class="titinline">
						<h1 class="titulolinks">{{filmes.noentulhoLanding.acf.anuncio.titulo_pt}}</h1>
						<span class="separador">&nbsp; &nbsp;</span>
						<h1 class="titulolinks1ieng">{{filmes.noentulhoLanding.acf.anuncio.titulo_en}}</h1>
					</div>
					<div class="ecran">

								<vimeo-player  ref="player" :video-id="videoID" @ready="onReady" :player-height="height"></vimeo-player>

					</div>
				</div>

			</section>  
		 <section class="panel section-doze dois">

				<div class="boxstream">
					<div class="titinline">
						<h1 class="titulolinks">{{filmes.noentulhoLanding.acf.anuncio.titulo_pt}}</h1>
						<span class="separador">&nbsp; &nbsp;</span>
						<h1 class="titulolinks1ieng">{{filmes.noentulhoLanding.acf.anuncio.titulo_en}}</h1>
					</div>
					<div class="ecran">

						  <SoundCloud
							track="307928185"
							:mini="true"
						/>

					</div>
				</div>

			</section>  

		 <section class="panel section-treze dois">

				<div class="boxstream">
					<div class="titinline">
						<h1 class="titulolinks">{{filmes.noentulhoLanding.acf.anuncio.titulo_pt}}</h1>
						<span class="separador">&nbsp; &nbsp;</span>
						<h1 class="titulolinks1ieng">{{filmes.noentulhoLanding.acf.anuncio.titulo_en}}</h1>
					</div>
					<div class="galeria">
						<img class="image" v-for="(image, i) in filmes.noentulhoLanding.acf.imagem.galeria" :src="image.sizes.thumbnail" :key="i" @click="index = i">
  						<vue-gallery-slideshow :images="filmes.noentulhoLanding.acf.imagem.galeria" :index="index" @close="index = null"></vue-gallery-slideshow>

					</div>

				</div>

			</section>   -->

		</div>

		<div class="loader">
			<div class="loader-donut"></div>
			<p id="loader-progress">3D designed by Débora Silva and programmed by Reinaldo Rodrigues. <br /> 
3D desenhado por Débora Silva e programado por Reinaldo Rodrigues. <br /> ? / ?</p>
			<div class="loader-curtains">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex'
// import SoundCloud from 'vue-soundcloud-player';
// import VueGallerySlideshow from 'vue-gallery-slideshow';

export default {
	components: {
// SoundCloud,
// VueGallerySlideshow
    // vueplyr,
    // VideoBg
  	},
	data() {
		return {
			videoID: '493447673',
			height: 700,
			options: {
				muted: true,
	      			autoplay: true,
			},
			playerReady: false,
			index: null,
			sections:0
		}
	},
	computed: {
		...mapState([
			'filmes'
		]),
		    images() {
				let vm = this;
				let filtro = vm.filmes;
				let r = [];
				r = filtro.noentulhoLanding.acf.imagem.galeria;

				return r;

    		},

			altura() {
				let vm = this;
				if(vm.filmes.noentulhoLanding.acf.page_data){
				let numSections = vm.filmes.noentulhoLanding.acf.page_data;
				console.log(numSections.length);
				return numSections;
				}
				alert('');
				return null;
			}
	},
	mounted() {

		this.$store.dispatch('getFilmes');
// console.log(this.altura);

	},
	watch: {
		// altura(e) {
		// 	this.sections = e;
		// 	console.log(e);
		// }
	},

	created() {
		// console.log(this.altura);
  	},
	destroyed() {

	},
	methods: {
		onReady() {
			this.playerReady = true
		},
		play () {
			this.$refs.player.play()
		},
		pause () {
			this.$refs.player.pause()
		}

	}
}
</script>

<style>
.site {
	height: 100vh;
	color: aliceblue;
	/* background-color: aqua; */
}

.sect {
	overflow: hidden;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-content: center;
	align-items: center;
}

.section_1 {
	background-color: aqua;
	justify-content: space-around;

}

.scene.one {
	width: 100vw;
	height: 100vh;
	position: fixed;
	z-index: -1;
}

section {
	width: 100%;
	height: 100vh;
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}

h1 {
	color: aliceblue;
}

.dois {
	/* display: inline-flex;  */
	justify-content: space-around;
}
.um {
	align-items: flex-start;
	justify-content: flex-start;
	width: 80%;
}

.box {
	color: aliceblue;
	padding: 0 2em 0 1em;
	width: 30vw;
	height: 40vh;
	justify-content: center;
	display: flex;
	flex-direction: column;
	/* align-items: center; */
}


.inglestit {
	font-family: "syne";
	text-transform: uppercase;
	font-size: 2em;
	text-align: end;
}
.inglescont {
	font-family: "syne";
	font-size: 1em;
	word-break: normal;
	text-align: end;
}

.titulohome {
	font-family: "swiss";
	text-transform: uppercase;
	font-size: 2em;
}
.titulo4 {
	font-family: "swiss";
	text-transform: uppercase;
	font-size: 2em;
}
.titulobox {
	font-family: "swiss";
	text-transform: uppercase;
	font-size: 2em;
	text-align: start;
}
.contentbox {
	word-break: normal;
	text-align: start;
	font-family: "swiss";
	/* text-align: center; */
}
.titulolinks {
	text-transform: uppercase;
	font-size: 2em;
}

.titulolinks1ieng {
	font-family: "syne";
	text-transform: uppercase;
	font-size: 2em;
}
.titinline {
	display: flex;
	flex-direction: column;
}
.contentlinks {
	text-transform: uppercase;
	font-size: 3em;
}
.contentlinksingl {
	font-family: "syne";
	text-transform: uppercase;
	font-size: 4em;
	line-height: 0.75;
}
.contentlinks1 {
	text-transform: uppercase;
	font-size: 1em;
	    display: flex;
    flex-direction: column;
	    align-items: flex-start;
}
.contentlinksingl1 {
	font-family: "syne";
	text-transform: uppercase;
	font-size: 1em;
	    display: flex;
    flex-direction: column;
	    align-items: flex-end;
}

.links {
	align-items: flex-start;
}
.separador {
	line-height: 0;
	/* display: none; */
}



.loader-donut {
  width: 108px;
  height: 108px;
}

.loader {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-direction: column;
}
.loader p {
  color: white;
  white-space: pre;
  

}
.loader svg {
  width: 100%;
}

.loader-curtains {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  display: flex;
  flex-direction: row;
}
.loader-curtains span {
  width: 25%;
  height: 100%;
  background: #010014;
}


.boxstream{
		color: aliceblue;
		/* background-color: blue; */
	padding: 0 2em 0 1em;
	width: 100%;
	height: 40vh;
	justify-content: center;
	display: flex;
	flex-direction: column;
}
.ecran{
	width: 100%;
	height: 100%;
position: relative;
}

.galeria{
	width: 100%;
	height: 100%;
	/* background-color: aquamarine; */
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
	grid-gap: 1rem;
}


.contentboximage{
	word-break: normal;
	text-align: start;
	font-family: "swiss";
	    display: flex;
    flex-direction: column;


}

.inglescontimage{
	font-family: "syne";
	/* font-size: 1em; */
	word-break: normal;
	text-align: end;
	    display: flex;
    flex-direction: column;

}

.contentboximage img{
 max-width: 75%;
  height: auto;

}

.inglescontimage img{
 max-width: 75%;
  height: auto;

}
.downloads{
	    display: inline-flex;
    flex-direction: column;
	font-size: 1.5em;
}

.marbot{
	margin-bottom: 1.5em;
}



.pswp{
	height: 100vh !important;
	display: flex;
	bottom: 0;
}


</style>
