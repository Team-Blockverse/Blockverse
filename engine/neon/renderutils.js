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
let models = []; // Models Array
let mvRenderUtils;

// RenderUtils Core
class RenderUtils {
  // Creation/Loading Tools
  static createMaterial(type, map, normalMap, aoMap) {
    switch (type) {
      case 'basic':
        materials.push(new THREE.MeshBasicMaterial( { map: map, normalMap: normalMap, aoMap: aoMap}));
        break;
        
      case 'lambert':
        materials.push(new THREE.MeshLambertMaterial( { map: map, normalMap: normalMap, aoMap: aoMap } ));
        break;
        
      case 'phong':
       materials.push(new THREE.MeshPhongMaterial( { map: map, normalMap: normalMap, aoMap: aoMap } ));
        break;

      case 'standard':
        materials.push(new THREE.MeshStandardMaterial( { map: map, normalMap: normalMap, aoMap: aoMap } ));
        break;

      case 'physical':
        materials.push(new THREE.MeshPhysicalMaterial( { map: map, normalMap: normalMap, aoMap: aoMap } ));
        break;

      default:
        console.error('Invalid Material Defined. (@ createMaterial)');
        break;
    }
  } // Dynamic Quality, here we come! (To-Do: Check what details are given to ensure that we don't cause log spam.)
  
  static loadTexture(path) {
    mvRenderUtils = loader.load(path);
    mvRenderUtils.wrapS = THREE.RepeatWrapping;
    mvRenderUtils.wrapT = THREE.RepeatWrapping;
    textures.push(mvRenderUtils);
    
    mvRenderUtils = null; // GC Check
  } // Who said repeat on/off was needed? Not me.

  static repeatTexture(texture, repeatX, repeatY) {
    texture.repeat.set(repeatX, repeatY);
  } // Makes things better (Allows us to make programming easier AND harder)
  
  static loadModel(path) {
    models.push(modelLoader.load(path));
  } // Loads a model

  static enableShadows(scene) {
    scene.traverse( function( child ) { 
      if ( child.isMesh ) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    }); // ThreeJS Power
  } // Enables Shadows on the whole scene (Super Helpful)
}

// Exports
export { RenderUtils, textures, materials, models }