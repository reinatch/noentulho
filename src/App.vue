<template>
  <div id="app">
		<NavBar />
    <Footer />
		<Scene class="scene one" />
		
		<Home class="" />
  </div>
</template>

<script>
import NavBar from "@/components/TheNavigation.vue";
import Footer from "@/components/TheFooter.vue";
import Home from "@/views/Home.vue";
import Scene from "@/views/MainScene.vue";
import {mapState} from 'vuex';

export default {
  name: 'App',
  components: {
    NavBar,
		Footer,
		Scene,
		Home,
  },
  computed: {
		...mapState([
			'filmes'
	]),
	images() {
      let vm = this;
      let filtro = vm.filmes;
      try {
        if (!filtro || !filtro.noentulhoLanding) return [];
        // guard for different shapes of mock vs API
        if (filtro.noentulhoLanding.page_data) {
          // try to find an 'imagem' container if present
          const p = filtro.noentulhoLanding.page_data.find(s => s.acf_fc_layout === 'section_8' && s.pt && s.pt.imagem && s.pt.imagem.sizes);
          if (p) return [p.pt.imagem.sizes.medium];
        }
        if (filtro.noentulhoLanding.acf && filtro.noentulhoLanding.acf.imagem && filtro.noentulhoLanding.acf.imagem.galeria) {
          return filtro.noentulhoLanding.acf.imagem.galeria;
        }
        return [];
      } catch (e) {
        return [];
      }

  },
			// altura() {
			// 	let vm = this;
			// 	if(vm.filmes.noentulhoLanding.acf.page_data){
			// 	let numSections = vm.filmes.noentulhoLanding.acf.page_data;
			// 	console.log(numSections.length);
			// 	return numSections;
			// 	}
				
			// 	return null;
			// }
      
	},
  mounted() {
    // Only request remote data when there's no local mock already loaded.
    // This prevents network errors from stopping script execution (which can break GSAP/three.js initialization).
    if (!this.filmes || Object.keys(this.filmes).length === 0) {
      this.$store.dispatch('getFilmes');
    }
    

	},
  created(){console.log(this.filmes);}
}
</script>

<style>

.enlargeable-image .enlargeable-image-slot {
  display:inline-block;
}
.enlargeable-image .enlargeable-image-slot > img {
  max-width:50% !important;
}
.enlargeable-image > .enlargeable-image-slot {
  max-width:100%;
  max-height:100%;
  cursor:zoom-in;
}
.enlargeable-image > .enlargeable-image-slot.active {
  opacity:0.3;
  filter:grayscale(100%);
}
.enlargeable-image .enlargeable-image-full {
  cursor:zoom-out;
  background-color:transparent;
  align-items:center;
  justify-content:center;
  background-position: center center;
  background-repeat:no-repeat;
  background-size:contain;
  z-index:2000;
  display:none;
}
.enlargeable-image .enlargeable-image-full > img {
  object-fit:contain;
  width:50% !important;
  height:auto;
}
.enlargeable-image .enlargeable-image-full.enlarging {
  display:block;
  position:fixed;
  left:0px;
  /* top:0px;
  width:100%;
  height:100%; */
  background-color:transparent;
  cursor:zoom-out;
}
.enlargeable-image .enlargeable-image-full.delarging {
  display:flex;
  position:fixed;
  left:0px;
  /* top:0px;
  width:100%;
  height:100%; */
  background-color:transparent;
  cursor:zoom-in;
}
.enlargeable-image .enlargeable-image-full.enlarged {
  display:flex;
}

.enlargeable-image .full.enlarged {
background: rgba(5, 0, 27, 0.486) !important;
bottom: auto !important;
    width: 80% !important;
    height: 100vh !important;
    top: auto !important;
    left: 10vw !important;
}

</style>
