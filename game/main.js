// Strict Mode
"use strict";

// ThreeJS
import { Scene, PerspectiveCamera, WebGLRenderer, sRGBEncoding, ACESFilmicToneMapping, PCFSoftShadowMap, PCFShadowMap, BasicShadowMap, MeshBasicMaterial, DoubleSide} from '../engine/three/three.module.js'

// NEON Game Engine Tools
import { RenderUtils, textures, materials, models } from '../engine/neon/renderutils.js'
import { createSkybox } from '../engine/neon/skybox.js'
import { Debugger } from '../engine/core/debug.js'
import { Console } from '../engine/core/console.js'
import { AreaLoader } from '../engine/neon/arealoader.js'
import { Controls } from '../engine/neon/controlutils.js'
import { BaseWorld } from './areas/baseworld.js'

// Constants/Variables
const halfPI = Math.PI / 2; // What kind of person would change this?
let defaultMaterial = 'standard';

// ThreeJS Scene Setup
const primaryCanvas = document.getElementById("primary");
const offscreenCanvas = document.getElementById("offscreen");
const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// WebGL Renderer Setup
const renderer = new WebGLRenderer({ canvas: primaryCanvas });
renderer.debug.checkShaderErrors = false; // Speed Gain
renderer.outputEncoding = sRGBEncoding; // This fixes a gradient issue. WTF?
renderer.toneMapping = ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;
renderer.gamma = 2.2;
renderer.physicallyCorrectLights = true; // Keep this enabled or else things will quickly break.
renderer.shadowMap.enabled = true; 
renderer.shadowMap.type = PCFSoftShadowMap; // VSM Shadows break PBR. WTF?
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Setup NEON Engine
const controls = new Controls(camera);
const areaLoader = new AreaLoader(camera, scene, renderer); // Provide Objects
console = Console; // Overriding built-ins is fun.

// Skybox (0 - 2)
RenderUtils.loadTexture(createSkybox(offscreenCanvas), 1); // Skybox won't load unless I do this weird thing.
RenderUtils.loadTexture('../assets/textures/skybox/sun.png', 1);
RenderUtils.loadTexture('../assets/textures/skybox/clouds1.png', 1); // "And the sky is gray" (Currently Unused Asset)

// Grass (3 - 5)
RenderUtils.loadTexture('../assets/textures/grass/base.png', 100);
RenderUtils.loadTexture('../assets/textures/grass/normal.png', 100);
RenderUtils.loadTexture('../assets/textures/grass/ao.png', 100);

// Bricks (6 - 8)
RenderUtils.loadTexture('../assets/textures/bricks/base.png', 1);
RenderUtils.loadTexture('../assets/textures/bricks/normal.png', 1);
RenderUtils.loadTexture('../assets/textures/bricks/ao.png', 1);

// Water (9)
RenderUtils.loadTexture('../assets/textures/water/normal.jpg', 1);

// Our Materials
RenderUtils.createMaterial(defaultMaterial, textures[3], textures[4], textures[5]); // Grass
RenderUtils.createMaterial(defaultMaterial, textures[6], textures[7], textures[8]); // Brick
materials.push(new MeshBasicMaterial({ transparent: true, map: textures[1], side: DoubleSide, fog: false})); // The Literal Sun
materials.push({ textureWidth: 512, textureHeight: 512, waterNormals: textures[9], sunColor: 0xffffff, waterColor: 0x001e0f, distortionScale: 3.7}); // Water Properties

// Load Base World
const world = new BaseWorld(scene, renderer, camera, areaLoader, controls); // Base World (Yeet)

// Debugger (Very Cool!)
const debug = new Debugger(renderer);

setInterval(debug.update, 1000); // Load Debug Tool