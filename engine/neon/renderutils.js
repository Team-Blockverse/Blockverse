// Imports
import * as THREE from '../three/three.module.js' // To-Do: Not include everything
import { GLTFLoader } from '../three/GLTFLoader.js'
import { TGALoader } from '../three/TGALoader.js'

// ThreeJS Stuff
const loader = new THREE.TextureLoader(); // Texture Loader
const tgaLoader = new TGALoader(); // Alternative Texture Loader
const modelLoader = new GLTFLoader(); // Load Models!

// Neon Variables
let textures = []; // Texture Array
let materials = []; // Material Array
let models = [];
let mvRenderUtils;

// RenderUtils Core
class RenderUtils {
  // Creation/Loading Tools
  static createMaterial(type, map, normalMap, aoMap) {
    if (type === 'phong') {
      materials.push(new THREE.MeshPhongMaterial( { map: map, normalMap: normalMap, aoMap: aoMap } ));
    } else if (type === 'lambert') {
      materials.push(new THREE.MeshLambertMaterial( { map: map, normalMap: normalMap, aoMap: aoMap } ));
    } else if (type === 'standard') {
      materials.push(new THREE.MeshStandardMaterial( { map: map, normalMap: normalMap, aoMap: aoMap } ));
    } else if (type === 'physical') {
      materials.push(new THREE.MeshPhysicalMaterial( { map: map, normalMap: normalMap, aoMap: aoMap } ));
    } else {
      throw "Invalid Material Defined. (RenderUtils @ createMaterial)";
    }
  } // Dynamic Quality, here we come! (To-Do: Check what details are given to ensure that we don't cause log spam.)
  
  static loadTexture(path, repeatNum) {
    mvRenderUtils = loader.load(path);
    mvRenderUtils.wrapS = THREE.RepeatWrapping;
    mvRenderUtils.wrapT = THREE.RepeatWrapping;
    mvRenderUtils.repeat.set(repeatNum, repeatNum);
    textures.push(mvRenderUtils);
    
    mvRenderUtils = null; // GC Check
  } // Who said repeat on/off was needed? Not me.

  static loadModel(path) {
    models.push(modelLoader.load(path));
  } // Loads a model
}

// Exports
export { RenderUtils, textures, materials, models }