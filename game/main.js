// Strict Mode
"use strict";

// ThreeJS
import * as THREE from '../engine/three/three.module.js'

// NEON Game Engine Tools
import { RenderUtils, textures, materials, models } from '../engine/neon/renderutils.js'
import { AreaLoader } from '../engine/neon/arealoader.js'
import { Controls } from '../engine/neon/controlutils.js'
import { BaseWorld } from './areas/baseworld.js'
import { createSkybox } from '../engine/neon/skybox.js'

// Constants/Variables
const halfPI = Math.PI / 2; // What kind of person would change this?
const debugMode = false; // Is Debug Mode Enabled

// ThreeJS Scene Setup
const primaryCanvas = document.getElementById("primary");
const offscreenCanvas = document.getElementById("offscreen");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// WebGL Renderer Setup
const renderer = new THREE.WebGLRenderer({ canvas: primaryCanvas });
renderer.outputEncoding = THREE.sRGBEncoding; // This fixes a gradient issue. WTF?
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;
renderer.gamma = 2.2;
renderer.physicallyCorrectLights = true; // Keep this enabled or else things will quickly break.
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Setup NEON Engine
const controls = new Controls(camera);
const areaLoader = new AreaLoader(camera, scene, renderer); // Provide Objects

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

// Our Materials
RenderUtils.createMaterial('phong', textures[3], textures[4], textures[5]); // Grass
RenderUtils.createMaterial('phong', textures[6], textures[7], textures[8]); // Brick
materials.push(new THREE.MeshBasicMaterial({ transparent: true, map: textures[1], side: THREE.DoubleSide, fog: false})); // The Literal Sun

// Load Base World
const world = new BaseWorld(scene, renderer, camera, areaLoader, controls); // Base World (Yeet)