<template>
	<div ref="mainScene">
		<!-- <div v-if="scene">
			<Modelo :scene="scene" />
		</div> -->
	</div>
</template>

<script>
// import RAF from "@/utils/raf"
import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper.js';


import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js';

import fragment from "@/shader/fragment.glsl";
import vertex from "@/shader/vertex.glsl";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
// import Modelo from "@/components/Modelo"
import { mapState } from 'vuex';

// const canvas = document.querySelector("canvas"),

const backgroundColor = 0x030313;





export default {
	name: "MainScene",
	data() {
		return {
			renderer: null,
			scene: null,
			camera: null,
			altura: ''
		}
	},
	computed: {
		...mapState([
			'filmes'
		]),
		// filmes(){
		// 	return this.$store.getters.allFilmes;
		// },
		// altura(){

		// 	const numero = this.filmes.noentulhoLanding.page_data.length;

		// return numero;
		// },	

	},
	mounted() {
		// window.addEventListener('load', () => {
		// run after everything is in-place
		this.$nextTick(() => {
			this.loaderIn();
			this.init();
		});
		// })

		//   console.log(this.filmes, this.altura);


	},
	created() {


		window.addEventListener("resize", this.resize)
	},
	destroyed() {
		// RAF.unsubscribe("MainSceneUpdate", this.update)
		window.removeEventListener("resize", this.resize)
	},
	watch: {
		filmes(e) {


			this.altura = '' + e.noentulhoLanding.page_data.length;
			console.log(this.altura);

		},

	},
	methods: {





		setup() {

			this.modelsgroup = new THREE.Group;
			this.assetsHaveLoaded = false;
			this.scene = new THREE.Scene();
			this.scene.main = "MainScene";
			this.scene.background = new THREE.Color(backgroundColor);
			this.clock = new THREE.Clock();
			this.camera = new THREE.PerspectiveCamera(
				100,
				window.innerWidth / window.innerHeight,
				0.01,
				2000);
			//lava shader
			const textureLoader = new THREE.TextureLoader();
			this.uniforms = {
				"fogDensity": { value: 0 },
				"fogColor": { value: new THREE.Vector3(0, 0, 0) },
				"time": { value: 1.0 },
				"uvScale": { value: new THREE.Vector2(8, 8) },
				"texture1": { value: textureLoader.load('./resources/lava/cloud.png') },
				"texture2": { value: textureLoader.load('./resources/lava/lavatile.jpg') }
			};
			this.uniforms["texture1"].value.wrapS = this.uniforms["texture1"].value.wrapT = THREE.RepeatWrapping;
			this.uniforms["texture2"].value.wrapS = this.uniforms["texture2"].value.wrapT = THREE.RepeatWrapping;
			this.lava = new THREE.ShaderMaterial({
				uniforms: this.uniforms,
				vertexShader: vertex,
				fragmentShader: fragment
			});
			this.renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true,
				// canvas: canvas 
			});
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.renderer.setPixelRatio(window.devicePixelRatio);
			this.$refs.mainScene.appendChild(this.renderer.domElement);
			this.renderer.shadowMap.enabled = true;
			this.renderer.outputEncoding = THREE.sRGBEncoding;
			this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
			this.renderer.toneMappingExposure = 0.6;
			this.renderer.physicallyCorrectLights = true;
			this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
			this.pmremGenerator.compileEquirectangularShader();
			// loading manageer
			this.loadingManager = new THREE.LoadingManager();
			// hdr env map loader
			this.rgbeLoader = new RGBELoader(this.loadingManager);
			// gltf model loader
			this.gltfLoader = new GLTFLoader(this.loadingManager);
			// loader to handle compressed glb/gltf files
			this.dracoLoader = new DRACOLoader();
			this.dracoLoader.setDecoderPath("https://threejs.org/examples/js/libs/draco/");
			this.dracoLoader.setDecoderConfig({ type: 'js' });
			// this.dracoLoader.preload()
			this.gltfLoader.setDRACOLoader(this.dracoLoader);
			// mouse event listener
			// this.raycaster = new THREE.Raycaster();
			this.mouse = new THREE.Vector2(), this.INTERSECTED;
			this.controls = new OrbitControls(this.camera, this.renderer.domElement);
			// this.controls.addEventListener( 'change', this.render ); // use if there is no animation loop
			// this.controls.enableZoom = false;
			// this.controls.minDistance = 2;
			this.controls.maxDistance = 10000;
			this.controls.target.copy(this.camera.position);
			this.controls.update();
			this.camera.position.set(0, 12, 10);

			const renderModel = new RenderPass(this.scene, this.camera);
			const effectBloom = new BloomPass(1.25);
			const effectFilm = new FilmPass(0.35, 0.95, 2048, false);

			this.composer = new EffectComposer(this.renderer);

			this.composer.addPass(renderModel);
			this.composer.addPass(effectBloom);
			this.composer.addPass(effectFilm);
		},
		createLight() {
			this.light1 = new THREE.AmbientLight(0xffffff, 0);
			this.scene.add(this.light1);
			this.light2 = new THREE.DirectionalLight(0xB96008, 0);
			this.helper = new THREE.DirectionalLightHelper(this.light2, 5);
			// this.light2.add( this.helper );
			this.scene.add(this.light2);
			this.light2.position.set(0, 30, 0);
			this.sphereSize = 1;
			this.LColor = 0xFF470A;

			this.pointLight = new THREE.PointLight(0xFF470A, 30, 90);
			this.pointLight.position.set(30, 2, 0);
			this.pointLightHelper = new THREE.PointLightHelper(this.pointLight, this.sphereSize);
			// this.pointLight.add( this.pointLightHelper );

			this.pointLight2 = new THREE.PointLight(0xff4208, 10, 90);
			this.pointLight2.position.set(-30, 2, 0);
			this.pointLightHelper2 = new THREE.PointLightHelper(this.pointLight2, this.sphereSize);
			// this.pointLight2.add( this.pointLightHelper2 );

			this.pointLight3 = new THREE.PointLight(0xe12700, 20, 90);
			this.pointLight3.position.set(0, 2, 30);
			this.pointLightHelper3 = new THREE.PointLightHelper(this.pointLight3, this.sphereSize);
			// this.pointLight3.add( this.pointLightHelper3 );

			this.pointLight4 = new THREE.PointLight(0xf04130, 75, 90);
			this.pointLight4.position.set(0, -25, 30);
			this.pointLightHelper4 = new THREE.PointLightHelper(this.pointLight4, this.sphereSize);
			// this.pointLight4.add( this.pointLightHelper4 );

			this.pointLight5 = new THREE.PointLight(0xff0808, 60, 90);
			this.pointLight5.position.set(0, -25, -30);
			this.pointLightHelper5 = new THREE.PointLightHelper(this.pointLight5, this.sphereSize);
			// this.pointLight5.add( this.pointLightHelper5 );

			this.pointLight6 = new THREE.PointLight(0xf54208, 50, 90);
			this.pointLight6.position.set(0, 2, -30);
			this.pointLightHelper4 = new THREE.PointLightHelper(this.pointLight6, this.sphereSize);
			// this.pointLight6.add( this.pointLightHelper4 );

			this.pointLight7 = new THREE.PointLight(0xb91808, 10, 90);
			this.pointLight7.position.set(0, -2, 0);
			// this.pointLight7.intensity.set()
			this.pointLightHelper7 = new THREE.PointLightHelper(this.pointLight7, 20);
			// this.pointLight7.add( this.pointLightHelper7 );

			this.modelsgroup.add(this.pointLight7);

			// this.donutGroupPos.push(this.pointLight7);
			// 
			this.scene.add(this.pointLight);
			this.scene.add(this.pointLight2);
			this.scene.add(this.pointLight3);
			this.scene.add(this.pointLight4);
			this.scene.add(this.pointLight5);
			this.scene.add(this.pointLight6);
			this.scene.add(this.pointLight7);





			// class ColorGUIHelper {
			//   constructor(object, prop) {
			//     this.object = object;
			//     this.prop = prop;
			//   }
			//   get value() {
			//     return `#${this.object[this.prop].getHexString()}`;
			//   }
			//   set value(hexString) {
			//     this.object[this.prop].set(hexString);
			//   }
			// }
			// this.gui = new dat.GUI();
			// this.gui.addColor(new ColorGUIHelper(this.light2, 'color'), 'value').name('color');
			// this.gui.add(this.light2, 'intensity', 0, 20, 1);
			// this.gui.addColor(new ColorGUIHelper(this.pointLight, 'color'), 'value').name('color');
			// this.gui.add(this.pointLight, 'intensity', 0, 100, 1);
			// this.gui.addColor(new ColorGUIHelper(this.pointLight2, 'color'), 'value').name('color');
			// this.gui.add(this.pointLight2, 'intensity', 0, 100, 1);
			// this.gui.addColor(new ColorGUIHelper(this.pointLight3, 'color'), 'value').name('color');
			// this.gui.add(this.pointLight3, 'intensity', 0, 100, 1);
			// this.gui.addColor(new ColorGUIHelper(this.pointLight4, 'color'), 'value').name('color');
			// this.gui.add(this.pointLight4, 'intensity', 0, 100, 1);
			// this.gui.addColor(new ColorGUIHelper(this.pointLight5, 'color'), 'value').name('color');
			// this.gui.add(this.pointLight5, 'intensity', 0, 100, 1);
			// this.gui.addColor(new ColorGUIHelper(this.pointLight6, 'color'), 'value').name('color');
			// this.gui.add(this.pointLight6, 'intensity', 0, 100, 1);
			// this.gui.addColor(new ColorGUIHelper(this.pointLight7, 'color'), 'value').name('color');
			// this.gui.add(this.pointLight7, 'intensity', 0, 100, 1);
			// this.gui.addColor(new ColorGUIHelper(this.light1, 'color'), 'value').name('color');
			// this.gui.add(this.light1, 'intensity', 0, 200, 1);






		},
		createEnvMap() {
			this.rgbeLoader.load(
				"./resources/machine.hdr",
				texture => {
					this.envMap = this.pmremGenerator.fromEquirectangular(
						texture).
						texture;
					this.pmremGenerator.dispose();
					this.scene.environment = this.envMap;
					const roughnessMipmapper = new RoughnessMipmapper(this.renderer);
					roughnessMipmapper.dispose();
				},
				// xhr => {
				// console.log(
				// "loading hdr file:",
				// xhr.loaded / xhr.total * 100,
				// "% loaded");

				// },
				// error => {
				// console.log("error loading hdr file", error);
				// }
			);
		},
		createModel() {


			this.gltfLoader.load(
				"./resources/artworks/ani.glb",
				glb => {
					this.a_animado = glb.scene;
					this.a_animado.scale.set(0.01, 0.01, 0.01);
					this.a_animado.castShadow = true;
					this.a_animado.receiveShadow = true;


					var mul;
					var mat = this.lava;
					var material = new THREE.MeshPhysicalMaterial({
						color: 0xD83B09,
						envMap: this.envMap,
						refractionRatio: 0.985,
						reflectivity: 0.6,
						transparent: true,
						opacity: 0.6,
						roughness: 0.1,
						metalness: 0.3,
						// envMapIntensity: 5
						side: THREE.BackSide
					});
					this.a_animado.traverse(function (child) {
						child.castShadow = true;
						child.receiveShadow = true
						if (child.name === "flames") {

							mul = child;

							for (let i = 0; i < mul.children.length; i++) {
								mul.children[i].material.emissive = new THREE.Color(0x00ffff);
								mul.children[i].material.emissiveIntensity = 2
								mul.children[i].material = mat;

								//     // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
								//     // roughnessMipmapper.generateMipmaps( child.material );
								//   }
							}
						}
						if (child.name === "vidro") {
							let mol = child;


							for (let i = 0; i < mol.children.length; i++) {

								mol.children[i].material = material;

								//     // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
								//     // roughnessMipmapper.generateMipmaps( child.material );
								//   }
							}
						}
					});

					this.mixer = new THREE.AnimationMixer(this.a_animado);

					var action = this.mixer.clipAction(glb.animations[0]);
					action.LoopRepeat;
					action.play();


					this.modelsgroup.add(this.a_animado);


					this.scene.add(this.modelsgroup);

					// start rendering the scene
					this.animate();
					// scrolltrigger timelines
					// scrollTriggerAnims();

					this.createClones();
				},
				// xhr => {
				// console.log(
				// "loading external model:",
				// xhr.loaded / xhr.total * 100,
				// "% loaded");

				// },
				// error => {
				// console.log(
				// "An error happened while loading the gltf/glb model(s)",
				// error);

				// }
			);

			this.gltfLoader.load(
				"./resources/artworks/est.glb",
				glb => {
					this.a_estatico = glb.scene;
					this.a_estatico.scale.set(0.01, 0.01, 0.01);
					this.a_estatico.castShadow = true;
					this.a_estatico.receiveShadow = true;


					var mul;
					var mat = this.lava;
					var material = new THREE.MeshPhysicalMaterial({
						color: 0xD83B09,
						envMap: this.envMap,
						refractionRatio: 0.985,
						reflectivity: 0.6,
						transparent: true,
						opacity: 0.6,
						roughness: 0.1,
						metalness: 0.3,
						// envMapIntensity: 5
						side: THREE.BackSide
					});
					this.a_estatico.traverse(function (child) {


						child.castShadow = true;
						child.receiveShadow = true
						if (child.name === "flames") {


							mul = child;


							for (let i = 0; i < mul.children.length; i++) {
								mul.children[i].material.emissive = new THREE.Color(0x00ffff);
								mul.children[i].material.emissiveIntensity = 2
								mul.children[i].material = mat;
								mul.children[i].material.needsUpdate = true;

								//     // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
								//     // roughnessMipmapper.generateMipmaps( child.material );
								//   }
							}
						}
						if (child.name === "vidro") {
							let mol = child;


							for (let i = 0; i < mol.children.length; i++) {

								mol.children[i].material = material;

								//     // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
								//     // roughnessMipmapper.generateMipmaps( child.material );
								//   }
							}
						}
					});


					this.modelsgroup.add(this.a_estatico);

					this.scene.add(this.modelsgroup);

					// start rendering the scene
					this.animate();
					// scrolltrigger timelines
					// scrollTriggerAnims();

				},
				// xhr => {
				// 	console.log(
				// 	"loading external model:",
				// 	xhr.loaded / xhr.total * 100,
				// 	"% loaded");

				// },
				// error => {
				// 	console.log(
				// 	"An error happened while loading the gltf/glb model(s)",
				// 	error);

				// }
			);

		},

		// 	async loadBirds() {
		// 	const loader = this.gltfLoader;


		// 	const [liquiData, estatData, animaData] = await Promise.all([
		// 		loader.loadAsync("./resources/artworks/ll.glb"),
		// 		loader.loadAsync("./resources/artworks/est.glb"),
		// 		loader.loadAsync("./resources/artworks/ani.glb"),
		// 	]);



		// 	const liqui = this.setupModel(liquiData);
		// 	const estat = this.setupModel(estatData);
		// 	const anima = this.setupModel(animaData);
		// 	// console.log('Squaaawk!', liqui);
		// 	// console.log('Squaaawk!', estat);
		// 	// console.log('Squaaawk!', anima);

		// 	return {
		// 		liqui,
		// 		estat,
		// 		anima,
		// 	};
		// 	},
		// 	async init() {
		// 	const { liqui, estat, anima } = await this.loadBirds();

		// 				this.modelsgroup.add(liqui, estat, anima);
		// 				this.modelsgroup.scale.set(0.01, 0.01, 0.01);


		// 				this.scene.add(this.modelsgroup);
		// 	//   this.scene.add(liqui, estat, anima);

		// 						this.animate();




		// 					this.scrollTriggerAnims();

		// 				// this.createClones();
		// 	},

		// 	setupModel(data) {
		// 	const model = data.scene;
		// 				model.castShadow = true;
		// 				model.receiveShadow = true;
		// 	// model.scale.set(0.01, 0.01, 0.01);
		// 	// model.position.set(0,0,0);
		// 	// const clip = data.animations[0];
		// 	if (data.animations.length > 0) {
		// 		if (data.scene.children[0].name === 'animado') {
		// 		var animati = data.animations;
		// 		console.log(animati);
		// 		console.log(data.scene.children[0].name);
		// 		this.mixer = new THREE.AnimationMixer(model);
		// 		var animation = animati[0];
		// 		var action = this.mixer.clipAction(animation);
		// 		action.play();
		// 		}else{
		// 		var animati1 = data.animations;
		// 		console.log(animati1);
		// 		console.log(data.scene.children[0].name);
		// 		this.mixer1 = new THREE.AnimationMixer(model);
		// 		var animation1 = animati1[0];
		// 		var action1 = this.mixer1.clipAction(animation1);
		// 		action1.play();
		// 		}

		// 	}

		// 			var material = new THREE.MeshPhysicalMaterial( {
		// 			color: 0xD83B09,
		// 			envMap: this.envMap,
		// 			refractionRatio: 0.985,
		// 			reflectivity: 0.6,
		// 			transparent: true,
		// 			opacity: 0.6,
		// 			roughness: 0.1,
		// 			metalness: 0.3,
		// 			// envMapIntensity: 5
		// 			side: THREE.BackSide
		// 			} );
		// 			var mat = this.lava;
		// model.traverse(function (child) {
		// 	// if (child.isMesh) {
		// 		// handle child objects
		// 				child.castShadow = true;
		// 						child.receiveShadow = true
		// 						if ( child.name === "flames") {

		// 						var mul = child;

		// 						for (let i = 0; i < mul.children.length; i++) {
		// 							mul.children[i].material.emissive = new THREE.Color( 0x00ffff );
		// 							mul.children[i].material.emissiveIntensity = 2
		// 							mul.children[i].material = mat;

		// 						//     // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
		// 						//     // roughnessMipmapper.generateMipmaps( child.material );
		// 						//   }
		// 						}
		// 						}
		// 						if ( child.name === "vidro") {
		// 						let mol = child;


		// 						for (let i = 0; i < mol.children.length; i++) {

		// 							mol.children[i].material = material;

		// 						//     // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
		// 						//     // roughnessMipmapper.generateMipmaps( child.material );
		// 						  }
		// 						}
		// 	// }
		// });




		// 	return model;
		// 	},





		createModelLiquido() {
			this.gltfLoader.load(
				"./resources/artworks/ll.glb",
				glb => {
					this.liquido = glb.scene;
					this.liquido.scale.set(0.01, 0.01, 0.01);







					// alert("Found and Loaded model!");


					if (glb.animations.length > 0) {

						// alert("Model has animations " + glb.animations.length);

						var animationIndexToPlay = 0;
						// alert("Want to play animation " + glb.animations[animationIndexToPlay].name);
						this.mixer1;
						var animations = glb.animations;
						if (animations && animations.length) {
							this.mixer1 = new THREE.AnimationMixer(this.liquido);
							var animation = animations[animationIndexToPlay];
							var action = this.mixer1.clipAction(animation);
							action.play();
						}

						// alert("Playing");

					}
					else {
						alert("Model has NO animations");
					}

					glb.scene.traverse(function (child) {
						if (child.isMesh) {
							// handle child objects
						}
					});


					this.liquido.traverse(function (child) {


						child.castShadow = true;
						child.receiveShadow = true

					});








					this.modelsgroup.add(this.liquido);
					this.scene.add(this.modelsgroup);




					this.animate();




					this.scrollTriggerAnims();










				},
				// xhr => {
				// console.log(
				// "loading external model:",
				// xhr.loaded / xhr.total * 100,
				// "% loaded");

				// },
				// error => {
				// console.log(
				// "An error happened while loading the gltf/glb model(s)",
				// error);

				// }
			);

		},
		createClones() {

			this.createModelLiquido();
			// //   // group for all cloned donuts


		},
		loadAssets() {

			// this.loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
			// console.log(
			// `Started loading file : ${url}, loaded ${itemsLoaded} of ${itemsTotal} `);

			// };
			this.loadingManager.onLoad = () => {

				this.assetsHaveLoaded = true;
				this.loaderIn().pause();
				this.loaderOut();
				// console.log(this.loaderOut);
				// // pageIn(this.donut.scale);
			};
			this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
				const loaderProgress = document.getElementById("loader-progress");
				// console.log(
				// `Loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`);

				loaderProgress.textContent = "3D designed by Débora Silva and programmed by Reinaldo Rodrigues. \r\n";
				loaderProgress.textContent += "3D desenhado por Débora Silva e programado por Reinaldo Rodrigues. \r\n ";
				loaderProgress.textContent += `${itemsLoaded} / ${itemsTotal}`;

			};
			// this.loadingManager.onError = url => {
			// console.log("There was an error loading " + url);
			// };
		},


		animate() {
			requestAnimationFrame(this.animate.bind(this));
			// analyser.getFrequencyData();
			const delta = 1.25 * this.clock.getDelta();
			this.uniforms['time'].value += 9 * delta;
			// this.pointLight7.intensity += 5 * delta;
			var dur = gsap.utils.random(5000, 500,);
			gsap.set(this.pointLight7, { intensity: dur * delta, repeat: -1, yoyo: false });
			// console.log(this.pointLight7.intensity);
			if (this.mixer) this.mixer.update(delta);
			if (this.mixer1) this.mixer1.update(delta * 1.2);
			this.renderer.render(this.scene, this.camera);
			// update the picking ray with the camera and mouse position
			// this.raycaster.setFromCamera(this.mouse, this.camera);
			// // calculate objects intersecting the picking ray
			// this.intersects = this.raycaster.intersectObjects(this.modelsArray);

		},
		resize() {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
			this.camera.aspect = this.width / this.height;
			// this.camZ = (screen.width - this.width * 1) / 3;

			// this.camera.position.z = this.camZ < 400 ? 100 : this.camZ / 0.2;
			this.camera.updateProjectionMatrix();
			this.renderer.setPixelRatio(window.devicePixelRatio);
			this.renderer.setSize(this.width, this.height);
			this.setAltura();
			// console.log(this.width,this.height);
		},
		start() {

			// RAF.subscribe("MainSceneUpdate", this.update)
			window.addEventListener("resize", this.resize)
		},
		som() {
			// Minimal, defensive audio setup so missing DOM or data won't break the app
			try {
				const myAudio = new Audio(require('@/assets/1.mp3'));
				const startButton = document.getElementById('startButton') || document.querySelector('.start-button');

				const togglePlay = () => {
					if (myAudio.paused) {
						myAudio.play().catch(() => { });
					} else {
						myAudio.pause();
					}

					// recompute and apply safe heights (same intent as original code)
					const sec = document.querySelectorAll('section');
					const sectionsCount = sec && sec.length ? sec.length : 1;
					const test = parseInt(this.altura, 10) || (this.filmes && this.filmes.noentulhoLanding && Array.isArray(this.filmes.noentulhoLanding.page_data) ? this.filmes.noentulhoLanding.page_data.length : sectionsCount);
					const altu = window.innerHeight || document.documentElement.clientHeight || 0;
					const al = (altu * test) + 'px';
					const cnt = document.querySelector('.sect');
					if (cnt) gsap.set(cnt, { overflow: 'visible', width: '100%', minHeight: al });
					document.body.style.height = al;
				};

				if (startButton) startButton.addEventListener('click', togglePlay);
			} catch (e) {
				console.warn('MainScene: audio init failed', e);
			}
		},

		setAltura() {
			gsap.registerPlugin(ScrollTrigger);

			let cnt = document.querySelector(".sect");

			let sec = document.querySelectorAll('section');
			const sectionsCount = sec && sec.length ? sec.length : 1;
			const docc = window.innerHeight || document.documentElement.clientHeight || 0;
			// determine number of sections defensively
			const test = parseInt(this.altura, 10) || (this.filmes && this.filmes.noentulhoLanding && Array.isArray(this.filmes.noentulhoLanding.page_data) ? this.filmes.noentulhoLanding.page_data.length : sectionsCount);
			const altu = docc;
			const al = (altu * test) + 'px';
			console.log(al);
			if (cnt) {
				gsap.set(cnt, { overflow: "visible", width: "100%", minHeight: al });
			}

			// height = cnt.clientHeight;
			document.body.style.height = al;
		},

		scrollTriggerAnims() {


			gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

			let cnt = document.querySelector(".sect");

			// guard: abort if required DOM roots are missing
			if (!cnt) {
				console.warn('scrollTriggerAnims: missing .sect wrapper, aborting');
				return;
			}

			let frm = document.querySelector(".site") || document.body;
			// nav may be multiple anchors
			let nav = document.querySelectorAll('.news_button a');

			sec = gsap.utils.toArray('section');
			let test = parseInt(this.altura, 10) || sec.length || 1;
			let altu = window.innerHeight || document.documentElement.clientHeight || 0;
			let al = (altu * test) + 'px';
			let cem = '100vh';

			let sec = gsap.utils.toArray('section');

			let height;
			function setHeight() {
				height = cnt.clientHeight;
				document.body.style.height = height + "px";
			}
			ScrollTrigger.addEventListener("refreshInit", setHeight);



			// you must wrap your content <div> in another <div> that will serve as the viewport
			smoothScroll(cnt, frm);

			// this is the helper function that sets it all up. Pass in the content <div> and then the wrapping viewport <div> (can be the elements or selector text). It also sets the default "scroller" to the content so you don't have to do that on all your ScrollTriggers.
			function smoothScroll(content, viewport) {

				content = gsap.utils.toArray(content)[0];



				console.log(content,"hfgfg");

				gsap.set(viewport, { overflow: "hidden", position: "fixed", height: "100%", width: "100%", top: 0, left: 0, right: 0, bottom: 0 });
				gsap.set(content, { overflow: "visible", width: "100%", minHeight: al });

				// measure actual content height right away and use it as canonical height
				let measuredHeight = content.clientHeight || (altu * test);
				document.body.style.height = measuredHeight + 'px';

				let getProp = gsap.getProperty(content),
					setProp = gsap.quickSetter(content, "y", "px"),
					removeScroll = () => content.style.overflow = "visible",
					height;

				function onResize() {
					height = content.clientHeight || (altu * test);
					content.style.overflow = "visible";
					document.body.style.height = height + "px";
					// ensure ScrollTrigger recalculates using the updated sizes
					ScrollTrigger.refresh();
				}
				onResize();
				ScrollTrigger.addEventListener("refreshInit", onResize);
				ScrollTrigger.addEventListener("refresh", () => {
					removeScroll();
					requestAnimationFrame(removeScroll);
				})

				ScrollTrigger.defaults({ scroller: content });

				ScrollTrigger.prototype.update = p => p; // works around an issue in ScrollTrigger 3.6.1 and earlier (fixed in 3.6.2, so this line could be deleted if you're using 3.6.2 or later)


				// defensive nav/target mapping
				let linkElements = gsap.utils.toArray(nav) || [];
				let linkTargets = linkElements.map(el => {
					try {
						const selector = el && el.getAttribute ? el.getAttribute('href') : null;
						return selector ? document.querySelector(selector) : null;
					} catch (err) {
						return null;
					}
				});
				let linkPositions = [];

				let calculatePositions = () => {
					try {
						let offset = gsap.getProperty(content, "y") || 0;
						linkTargets.forEach((target, i) => {
							if (target && typeof target.getBoundingClientRect === 'function') {
								linkPositions[i] = target.getBoundingClientRect().top - offset;
							} else {
								linkPositions[i] = null;
							}
						});
					} catch (err) {
						// defensive: ignore and leave positions as nulls
					}
				};

				linkElements.forEach((element, i) => {
					element.addEventListener("click", e => {
						e.preventDefault();
						let offset = gsap.getProperty(content, "y") || 0;
						linkTargets.forEach((t, idx) => {
							if (t && typeof t.getBoundingClientRect === 'function') {
								linkPositions[idx] = t.getBoundingClientRect().top - offset;
							} else {
								linkPositions[idx] = null;
							}
						});

						if (linkPositions[i] != null) {
							let dur = Math.max(1, (offset - linkPositions[i] / document.documentElement.clientHeight));
							gsap.to(window, { scrollTo: linkPositions[i], ease: "power4", overwrite: true, duration: dur });
						}
					});
				});

				ScrollTrigger.addEventListener("refresh", calculatePositions);






				ScrollTrigger.scrollerProxy(content, {
					scrollTop(value) {
						return arguments.length ? setProp(-value) : -getProp("y");
					},
					getBoundingClientRect() {
						return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
					}
				});

				gsap.fromTo(content, { y: 0 }, {
					y: () => document.documentElement.clientHeight - height,
					ease: "none",
					onUpdate: ScrollTrigger.update,
					scrollTrigger: {
						scroller: window,
						invalidateOnRefresh: true,
						// snap: (1/7),
						start: 0,
						end: () => height - document.documentElement.clientHeight,
						scrub: 1,
						onUpdate: (self) => {
							if (
								self.progress < 0.95 &&
								self.direction === -1
							) {
								gsap.to(".scroll-indicator-container", {
									autoAlpha: 0,
									y: 40,
								});
							}
							if (self.progress > 0.90 && self.progress !== 1 && self.direction === 1) {
								gsap.to('.scroll-indicator-container', { autoAlpha: 1, y: 0, stagger: 0.04 });
							}

						},
						onRefresh: self => {
							// when the screen resizes, we just want the animation to immediately go to the appropriate spot rather than animating there, so basically kill the scrub. 
							gsap.killTweensOf(self.animation);
							self.animation.progress(self.progress);
						}
					}
				});
			}





			const scrollTween = gsap.to(".bar", { yPercent: 400, ease: "none", paused: true });

			function updateScrollBar() {
				scrollTween.progress(scrollY / (document.body.scrollHeight - innerHeight));
			}
			window.addEventListener("resize", updateScrollBar);
			window.addEventListener("scroll", updateScrollBar);

			//   const sketchcam = donutScene.camera;
			const fogo = this.pointLight7;

			const sketch = this.modelsgroup;
			//   const liq = donutScene.liquido;
			  console.log('ola', sketch);
			//   let sections = gsap.utils.toArray(".panel");
			//   const content = document.querySelector('.sect');
			//   const height = content.clientHeight;
			//                 let a = { a: 0 };
			//                 gsap.to(a, {
			//                     a: 1,
			//                     scrollTrigger: {
			//                         trigger: cnt,
			//                         markers: true,
			//                         start: "top top",
			//                         end: "bottom bottom",
			//                         // snap: 1 / (sec.length - 1),
			//                         onUpdate: (self)=>{
			//                             console.log(self.progress);
			//                         }
			//                     }
			//                 })

			// console.log(a.a);







			const car_anim_tl = gsap.timeline({
				scrollTrigger: {
					scroller: cnt,
					invalidateOnRefresh: true,
					scrub: true,
					start: "top top",
					end: "bottom bottom",


					onRefresh: self => {

						// when the screen resizes, we just want the animation to immediately go to the appropriate spot rather than animating there, so basically kill the scrub. 
						gsap.killTweensOf(self.animation);
						self.animation.progress(self.progress);
						console.log(self.progress);
					}
				}


			});
			sketch.attach(fogo);

			// console.log(sketch);

			var box = new THREE.Box3().setFromObject(sketch);

			var boxalt = (box.max.y - box.min.y);
			// console.log( box,  box.max.y-box.min.y, boxalt-3*(boxalt/(sec.length - 1)) );

			gsap.set(sketch.rotation, { y: 1.5 });

			sec.slice(1).forEach(() => {
				// console.log(image, i);
				car_anim_tl
					// .to(sketch.position, { y: '+=50', z: -1 }, "simultaneously")
					// .set(sketch.rotation, { y: 1.5 })
					.to(sketch, {
						// y: `-=${(boxalt/(sec.length - 1))}`, 
						onUpdate: function () {
							// if (i === 4) {
							//     sketch.rotation.y -= 5;
							// }
							var random = 1.25;
							sketch.position.y = (boxalt - 2 * (boxalt / (sec.length - 1))) * this.progress();
							sketch.position.z = -boxalt / (sec.length - 1) * random * this.progress();
							sketch.position.x = boxalt / (sec.length - 1) * random * this.progress();
							sketch.rotation.y -= -Math.tan(2 * 3.14) * 1.2;

							// console.log( this ,sketch.position.z, sketch.position.x, sketch.rotation.y ); 
						}
					},
						"simultaneously")
					;

				// tl.to(image, { scale: 1 }, '<');
			});

			// car_anim_tl

			// .to(sketch.position, { y: 12, z: -1 }, "simultaneously") 
			// .to(sketch.rotation, { y: -1 }, "simultaneously")

			// .to(sketch.position, { y: 13, z: 2 },"simultaneo") 
			// .to(sketch.rotation, { y: -2.75 }, "simultaneo")

			// .to(sketch.position, { y: 20, z: -2 }, "simultan") 
			// .to(sketch.rotation, { y: -6.5}, "simultan")

			// .to(sketch.position, { y: 32, z: -3  }, "simult") 
			// .to(sketch.rotation, { y: -7.45 }, "simult")

			// .to(sketch.position, { y: 47.5, z: -6 }, "simul")

			// .to(sketch.position, { y: 50 }, "simu") 
			// .to(sketch.rotation, { y: -11.25 }, "simu") 

			// .to(sketch.position, { z: -2, y: 49 }, "sim")

			// .to(sketch.position, { y: 8, z:-5 }, "si") 
			// .to(sketch.rotation, { x: -0.5, y:-13.5 }, "si") 
			// ;
			// const observerElements = document.querySelectorAll('section');

			// const observerOptions = {
			//   root: null,
			//   rootMargin: '0px 0px',
			//   threshold: 0
			// };

			// observerElements.forEach(el => {

			//   const box = sketch.position;
			//   el.tl = gsap.timeline({paused: true});

			//   el.tl
			//     .to(box, { y: 10, z: "-=10" })
			//     // .to(box, {x: 0, backgroundColor: '#000', rotation: "+=20", ease: 'power1.inOut'})

			//   el.observer = new IntersectionObserver(entry => {
			//     if (entry[0].intersectionRatio > 0) {
			//       gsap.ticker.add(el.progressTween)
			//     } else {    
			//       gsap.ticker.remove(el.progressTween)
			//     }
			//   }, observerOptions);

			//   el.progressTween = () => {
			//     // Get scroll distance to bottom of viewport.
			//     const scrollPosition = (window.scrollY + window.innerHeight);
			//     // Get element's position relative to bottom of viewport.
			//     const elPosition = (scrollPosition - el.offsetTop);
			//     // Set desired duration.
			//     const durationDistance = (window.innerHeight + el.offsetHeight);
			//     // Calculate tween progresss.
			//     const currentProgress = (elPosition / durationDistance);
			//     // Set progress of gsap timeline.     
			//     el.tl.progress(currentProgress);
			//   }

			//   el.observer.observe(el);
			// });


			// const threshold = 0.7; // trigger
			// const options = {
			//   root: null,
			//   rootMargin: '0px',
			//   threshold: threshold
			// };
			// const observer = new IntersectionObserver(animHandler, options);
			// const targets = document.querySelectorAll("section");
			// const ar = [].slice.call(targets); 
			// let animations = [];

			// console.log(ar);
			// let count = 0;

			// for (let target of ar) {
			//     // console.log(target);
			//   animations[count] = gsap.timeline({                scrollTrigger: {
			//                 // scroller: '.sect',
			//                 invalidateOnRefresh: true,
			//                 markers: true,
			//                 // scrub: true,
			//                 start: "center top",
			//                 // end: "bottom bottom",

			//                 }});  
			//   observer.observe(target);
			//   count++;
			// }

			// // timeline for each section


			//   for (let i = 0; i < ar.length; i++) {


			//         animations[i].to(sketch.position, { y: "+=12", z: "-=1" }, "simultaneously").to(sketch.rotation, { y: "-=1" }, "simultaneously"); 
			//         console.log(animations[i]);
			//   }


			// // animations[0] 

			// // animations[1].to(sketch.position, { y: 12, z: -1 }, "simultaneously").to(sketch.rotation, { y: -1 }, "simultaneously"); 

			// // animations[2].to(sketch.position, { y: 13, z: 2 },"simultaneo").to(sketch.rotation, { y: -2.75 }, "simultaneo");

			// // animations[3].to(sketch.position, { y: 20, z: -2 }, "simultan").to(sketch.rotation, { y: -6.5}, "simultan");

			// // animations[4].to(sketch.position, { y: 32, z: -3  }, "simult").to(sketch.rotation, { y: -7.45 }, "simult");

			// // animations[5].to(sketch.position, { y: 47.5, z: -6 }, "simul");

			// // animations[6].to(sketch.position, { y: 50 }, "simu").to(sketch.rotation, { y: -11.25 }, "simu");

			// // animations[7].to(sketch.position, { z: -2, y: 49 }, "sim");

			// // animations[8].to(sketch.position, { y: 8, z:-5 }, "si").to(sketch.rotation, { x: -0.5, y:-13.5 }, "si");
			// // observer handler
			// function animHandler(targets, observer) {
			//   for (var entry of targets) {

			//     let i = ar.indexOf(entry.target);
			// // console.log(i);
			//     if (entry.isIntersecting) {

			//       animations.forEach(tl => 
			//       tl.pause(0)

			//       );
			//       animations[i].play();

			//     } else {
			//         //return;
			//     //   animations[i].reverse();
			//     }
			//   }
			// }



		},

		loaderIn() {
			const tl = gsap.timeline({
				repeat: -1,
				repeatDelay: 0,
				repeatRefresh: true,
				// paused: true 
			});
			tl.
				to(
					"#gear4",
					{ rotation: "+=5", transformOrigin: "50% 50%", ease: "back.in" }, "out").
				to(
					"#gear3",
					{ rotation: "+=5", transformOrigin: "50% 50%", ease: "back.out" }, "out").

				to(
					"#gear2",
					{ rotation: "-=5", transformOrigin: "50% 50%", ease: "back.out" }, "out").

				to(
					"#gear1",
					{ rotation: "+=2", transformOrigin: "50% 50%", ease: "back.out" }, "out");

			return tl;
		},

		loaderOut() {
			const tl = gsap.timeline({});
			tl
				.to(
					"#gear4, #gear3, #gear2, #gear1 ",
					{
						autoAlpha: 0,
						y: 10,
						scale: 0,
						transformOrigin: "50% 50%",
						stagger: { start: "end", each: "0.1" },
						ease: "back.in"
					},

					"out")
				.to(
					"#loader-progress",
					{
						autoAlpha: 0,
						y: 10,
						scale: 0,
						transformOrigin: "50% 50%",
						stagger: { start: "end", each: "0.1" },
						ease: "back.in"
					},

					"out").

				to(
					".loader-curtains span",
					{
						y: gsap.utils.wrap(["-100%", "100%", "-100%", "100%"]),
						stagger: 0.1,
						ease: "power2.inOut",
						duration: 0.6
					},

					"out+=0.3").

				set(".loader", { autoAlpha: 0 });
			//   console.log(tl);
			return tl;
		},


		init() {

			this.setup();
			this.createLight();
			this.createEnvMap();
			this.loadAssets();
			this.createModel();
			this.resize();
			this.som();
			this.start();
			this.setAltura();
			// console.log(this.renderer.info);
		},


		// window:addEventListener("DOMContentLoaded", () => {
		//   loaderInTimeline.play();

		// }),
		// 	addEventListener("resize", () => {
		// 	this.resize();
		// })
	}
}
</script>

<style>
/* canvas {
	height: 100%;
	width: 100%;
} */
</style>
