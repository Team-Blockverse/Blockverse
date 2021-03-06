// Basically, this is earth. (Base World)
// ==============================================
// Imports
import { CameraHelper, DirectionalLight, HemisphereLight, AmbientLight, FogExp2, PlaneBufferGeometry, Mesh, Vector3, BufferGeometry, BoxBufferGeometry, SphereBufferGeometry, WebGLCubeRenderTarget, CubeCamera, LinearMipmapLinearFilter } from '/engine/three/three.module.js'
import { mergeBufferGeometries } from '/engine/three/BufferGeometryUtils.js'
import { Water } from '/engine/materials/Water.js'
import { RenderUtils, textures, materials, models } from '/engine/neon/renderutils.js'

// Constants
const sunPos = new Vector3(0, 100, 50); // OG Sun Position
const halfPI = Math.PI / 2;

// Animation Loop
let animate = function() { }

// Primary Class
class BaseWorld {
  constructor(scene, renderer, camera, arealoader, controls) {
    // Setup Scene Parts
    scene.fog = new FogExp2(0x88DDEE, 0.005); // Our Fog
    
    // Setup Directional Light
    let directionalLight = new DirectionalLight( 0xffffff, 1.5 );
    directionalLight.castShadow = true;
    
    //Set up shadow properties for the Sun
    directionalLight.shadow.radius = 2;
    directionalLight.shadow.mapSize.width = 2048; 
    directionalLight.shadow.mapSize.height = 2048; 
    directionalLight.shadow.camera.near = 0.5; 
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    
    // Directional Light Helper
    // const helper = new CameraHelper( directionalLight.shadow.camera );
    //scene.add( helper );
    
    // Now Add it too the scene
    arealoader.addObject( directionalLight );

    // Ambient Light to fix graphics
    let amblight = new AmbientLight( 0xffffff, 0.65 ); // Ambience is key
    arealoader.addObject( amblight );

    // Hemisphere light kinda makes things look better
    const skylight = new HemisphereLight( 0x88DDEE, 0x88DDEE, 0.15 ); // The Big Light, in the sky.
    skylight.position.set(0, 0, 200);
    arealoader.addObject( skylight );
    
    // Setup Skybox
    let sunGeometry = new PlaneBufferGeometry(60, 60);
    let sun = new Mesh(sunGeometry, materials[2]);
    sun.rotation.x = halfPI;
    arealoader.addObject(sun);

    scene.background = textures[0]; // Now (draw her) loading the skybox
    
    // Grass Plane
    let geometry = new PlaneBufferGeometry(1000, 1000);
    materials[0].roughness = 0.9;
    materials[0].shininess = 0;
    materials[0].normalMap = undefined; // Temp Fix for Shadows
    let plane = new Mesh( geometry, materials[0] );
    arealoader.addObject( plane );

    // A Brick(TM)
    let wallGeo = new BoxBufferGeometry(3, 3, 3);
    let brickWall = new Mesh( wallGeo, materials[1] );
    brickWall.rotation.x = halfPI;
    brickWall.position.set(-2.5, 14, 1.5);
    arealoader.addObject( brickWall );

    // Test Gun
    let gun = models[0];
    gun.rotation.x = Math.PI;
    gun.rotation.z = halfPI;
    gun.position.set(0, 0, 1);
    arealoader.addObject( gun );
    
    // Camera Setup
    camera.position.z = 2;
    camera.rotation.x = halfPI;

    // Animation Loop Filler
    animate = function() {
      requestAnimationFrame( animate );
      directionalLight.target.updateMatrixWorld();
      directionalLight.target.position.copy(controls.sunPosition()); // This is kinda broken. (TO-DO: Replace with better Shadow Map Technology)
      controls.doObjectPositionTick(sun, sunPos.x, sunPos.y, sunPos.z); // Sun Texture moves!
      controls.doControlsTick();
      controls.doObjectPositionTick(directionalLight, sunPos.x, sunPos.y, sunPos.z); // Sun Light moves!
	    renderer.render( scene, camera ); 
      // Rendering so we can see things.
    }

    // Cleanup (Assets that are only used once)
    wallGeo, brickWall, geometry, plane, sunGeometry = null;

    // Finish Up
    RenderUtils.enableShadows(scene); // Shadows EZ
    sun.castShadow = false; // Fix Scene!
    animate(); // Looped and Ready
  }

  destroyWorld() {
    animate = function() { animate = null; } // Reset. (Can't null at first or else it would call an error.)
  } // Part of Scene Changing Process
}

// Exports
export { BaseWorld }