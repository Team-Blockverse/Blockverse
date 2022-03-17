// Blockverse Engine 
// (C) 2022 Team Blockverse, Licensed under the AGPLv3 License
// ===================================================
// Strict Mode
"use strict";

// ThreeJS
import { Scene, PerspectiveCamera, WebGLRenderer, sRGBEncoding, ACESFilmicToneMapping, PCFSoftShadowMap, PCFShadowMap, BasicShadowMap, MeshBasicMaterial, DoubleSide} from '/engine/three/three.module.js'

// Game Engine Components
import { RenderUtils, textures, materials, models } from '/engine/neon/renderutils.js'
import { AreaLoader } from '/engine/neon/arealoader.js'
import { Controls } from '/engine/neon/controlutils.js'
import { antialiasing, upscaleAmount } from '/engine/core/settings.js'

// Core Engine Tools (For Blockverse!)
import { Debugger } from '/engine/core/debug.js'
import { Console } from '/engine/core/console.js'

// Game Parts (TO-DO: Seperate)
import { loadContent } from '/game/content.js'
import { BaseWorld } from '/game/areas/baseworld.js'

// Constants
const halfPI = Math.PI / 2; // What kind of person would change this?
const threads = navigator.hardwareConcurrency; // For use with WebWorkers.
const primaryCanvas = document.getElementById("primary");
const loading = document.getElementById("pleasewait");

// ThreeJS Scene Setup
const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// WebGL Renderer Setup
const renderer = new WebGLRenderer({
  canvas: primaryCanvas, 
  antialias: antialiasing,
  powerPreference: "high-performance",
  
});
renderer.debug.checkShaderErrors = false; // Speed Gain
renderer.outputEncoding = sRGBEncoding; // This fixes a gradient issue. WTF?
renderer.toneMapping = ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;
renderer.gamma = 2.2;
renderer.physicallyCorrectLights = true; // Keep this enabled or else things will quickly break.
renderer.shadowMap.enabled = true; 
renderer.shadowMap.type = PCFSoftShadowMap; // VSM Shadows break PBR. lol
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio * upscaleAmount );
document.body.appendChild( renderer.domElement );

// Setup NEON Engine
const controls = new Controls(camera);
const areaLoader = new AreaLoader(camera, scene, renderer); // Provide Object Helpers
//console = Console; // Overriding built-ins is fun.

// Load all game Content
loadContent();

// Load Base World
const world = new BaseWorld(scene, renderer, camera, areaLoader, controls); // Base World (Yeet)

// We are Loaded Now!
loading.innerHTML = 'Ready! Click to Begin!'; // This only works because loadContent is not async (As it should probably be!)

// Debugger (Very Cool!)
const debug = new Debugger(renderer);
setInterval(debug.update, 1000); // Load Debug Tool

// Add Resizing (About Time!)
function onResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener('resize', onResize);