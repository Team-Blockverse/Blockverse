// This script is meant to be how new materials are added to the game.
// ===========================================
// Import the RenderUtils Class
import { RenderUtils, textures, materials, models } from '/engine/neon/renderutils.js'

// Import ThreeJS requirements
import { DoubleSide, MeshBasicMaterial } from '/engine/three/three.module.js'

// Import Engine Tools
import { createSkybox } from '/engine/neon/skybox.js'
import { defaultMaterial } from '/engine/core/settings.js'

// ===========================================
// Offscreen Canvas so we can create a skybox
const offscreenCanvas = document.getElementById("offscreen");

// Loads all Content (Call this)
export function loadContent() {
  // Textures
  // ===========================================
  // Skybox (0 - 2)
  RenderUtils.loadTexture(createSkybox(offscreenCanvas)); // Skybox won't load unless I do this weird thing.
  RenderUtils.loadTexture('../assets/textures/skybox/sun.png');
  RenderUtils.loadTexture('../assets/textures/skybox/clouds1.png'); // "And the sky is gray" (Currently Unused Asset)

  // Grass (3 - 5)
  RenderUtils.loadTexture('../assets/textures/grass/base.png');
  RenderUtils.repeatTexture(textures[3], 100, 100);
  RenderUtils.loadTexture('../assets/textures/grass/normal.png');
  RenderUtils.repeatTexture(textures[4], 100, 100);
  RenderUtils.loadTexture('../assets/textures/grass/ao.png');
  RenderUtils.repeatTexture(textures[5], 100, 100);

  // Bricks (6 - 8)
  RenderUtils.loadTexture('../assets/textures/bricks/base.png');
  RenderUtils.loadTexture('../assets/textures/bricks/normal.png');
  RenderUtils.loadTexture('../assets/textures/bricks/ao.png');

  // Water (9)
  RenderUtils.loadTexture('../assets/textures/water/normal.jpg');
  // ===========================================
  // Materials
  // ===========================================
  RenderUtils.createMaterial(defaultMaterial, textures[3], textures[4], textures[5]); // Grass
  RenderUtils.createMaterial(defaultMaterial, textures[6], textures[7], textures[8]); // Brick
  materials.push(new MeshBasicMaterial({ transparent: true, map: textures[1], side: DoubleSide, fog: false})); // The Literal Sun (TO-DO: Port to standard methods given via MY ENGINE.)
  materials.push({ textureWidth: 512, textureHeight: 512, waterNormals: textures[9], sunColor: 0xffffff, waterColor: 0x001e0f, distortionScale: 3.7}); // Water Properties
  // ============================================
  // Models
  // ============================================
  RenderUtils.loadOBJ('/assets/models/pistol/pistol.obj');
} // Sync Way to load all game content