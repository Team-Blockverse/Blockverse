// Strict Mode
"use strict";

// ThreeJS
import { Scene, PerspectiveCamera, WebGLRenderer, sRGBEncoding, ACESFilmicToneMapping, PCFSoftShadowMap, PCFShadowMap, BasicShadowMap, MeshBasicMaterial, DoubleSide} from '../engine/three/three.module.js'

// NEON Game Engine Tools
import { RenderUtils, textures, materials, models } from '../engine/neon/renderutils.js'
import { AreaLoader } from '../engine/neon/arealoader.js'
import { Controls } from '../engine/neon/controlutils.js'
import { BaseWorld } from './areas/baseworld.js'

// Core Engine Tools (For Blockverse!)
import { Debugger } from '../engine/core/debug.js'
import { Console } from '../engine/core/console.js'

// Game Internals
import { loadContent } from './content.js'
import { antialiasing, upscaleAmount } from '../engine/core/settings.js'

// Constants/Variables
const halfPI = Math.PI / 2; // What kind of person would change this?

// ThreeJS Scene Setup
const primaryCanvas = document.getElementById("primary");
const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// WebGL Renderer Setup
const renderer = new WebGLRenderer({
  canvas: primaryCanvas, 
  antialias: antialiasing,
});
renderer.debug.checkShaderErrors = false; // Speed Gain
renderer.outputEncoding = sRGBEncoding; // This fixes a gradient issue. WTF?
renderer.toneMapping = ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;
renderer.gamma = 2.2;
renderer.physicallyCorrectLights = true; // Keep this enabled or else things will quickly break.
renderer.shadowMap.enabled = true; 
renderer.shadowMap.type = PCFSoftShadowMap; // VSM Shadows break PBR. WTF?
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio * upscaleAmount );
document.body.appendChild( renderer.domElement );

// Setup NEON Engine
const controls = new Controls(camera);
const areaLoader = new AreaLoader(camera, scene, renderer); // Provide Objects
console = Console; // Overriding built-ins is fun.

// Load all game Content
loadContent();

// Load Base World
const world = new BaseWorld(scene, renderer, camera, areaLoader, controls); // Base World (Yeet)

// Debugger (Very Cool!)
const debug = new Debugger(renderer);

setInterval(debug.update, 1000); // Load Debug Tool