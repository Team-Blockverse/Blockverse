// ThreeJS
import * as THREE from '/engine/three/three.module.js' // To-Do: Not include everything

// ThreeJS Loaders
import { GLTFLoader } from '/engine/three/loaders/GLTFLoader.js'
import { OBJLoader } from '/engine/three/loaders/OBJLoader.js'
import { MTLLoader } from '/engine/three/loaders/MTLLoader.js'
import { TGALoader } from '/engine/three/loaders/TGALoader.js'

// ThreeJS Stuff
const loader = new THREE.TextureLoader(); // Texture Loader
const tgaLoader = new TGALoader(); // Alternative Texture Loader
const modelLoader = new GLTFLoader(); // Load Models!
const objLoader = new OBJLoader(); // Also load models!
const mtlLoader = new MTLLoader(); // Load MTL Files!

// Neon Variables
let textures = []; // Texture Array
let materials = []; // Material Array
let models = []; // Models Array
let mvRenderUtils; // Movables

// Special XML Request
let rq = new XMLHttpRequest(); // TO-DO: Replace Depreceated Feature with sync fetch API (Sync is needed so loading works)

// RenderUtils Core
class RenderUtils {
  // Model Helper
  static #pushModel( path, object ) {
    let pth = `${path.substring(0, path.length-3)}mtl`; // File Extension Changer 2000
    rq.open("GET", pth, false);
    rq.overrideMimeType('data/text'); // Fix For Firefox
    rq.send(null); 
    if (rq.status === 200) {
      mvRenderUtils = mtlLoader.parse(rq.responseText);
      objLoader.setPath('/'); // We use root for mtl
      objLoader.setMaterials( mvRenderUtils );
      models.push(objLoader.parse(object));
    }  
  } // Work around for Models
  
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
  
  static loadOBJ(path) {
    rq.open('GET', path, false);
    rq.send(null);
    if (rq.status === 200) {
      RenderUtils.#pushModel(path, rq.responseText);
    }

    rq = null; // Finish it!
  } // Load OBJ File

  static loadGLTF(path) {
    let rq = new XMLHttpRequest(); // TO-DO: Replace Depreceated Feature with sync fetch API (Sync is needed so loading works)
    rq.open('GET', path, false);
    rq.send(null);
    if (rq.status === 200) {
      RenderUtils.#pushModel(rq.responseText, path);
    }

    rq = null; // Finish it!    
  } // Load GLTF File
  
  static enableShadows(scene) {
    scene.traverse( function( child ) { 
      if ( child.isMesh ) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    }); // ThreeJS Power
  } // Enables Shadows on the whole scene (Super Helpful)
}

// ThreeJS Version Check
if (THREE.REVISION !== '139dev') {
  throw 'Invalid ThreeJS Version is being used! Please consider using the included version of ThreeJS or sumbit an issue on the GitHub repo.';
}

// Exports
export { RenderUtils, textures, materials, models }