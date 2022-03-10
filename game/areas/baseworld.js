// Basically, this is earth. (Base World)
// ==============================================
// Imports
import { DirectionalLight, AmbientLight, FogExp2, PlaneGeometry, BoxGeometry, Mesh, Vector3 } from '../../engine/three/three.module.js'
import { textures, materials, models } from '../../engine/neon/renderutils.js'

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
    
    // Setup Lights
    let directionalLight = new DirectionalLight( 0xffffff, 1 );
    arealoader.addObject( directionalLight );

    let amblight = new AmbientLight( 0xffffff, 0.75 ); // Ambience is key
    arealoader.addObject( amblight );

    // Setup Skybox
    let sunGeometry = new PlaneGeometry(60, 60);
    let sun = new Mesh(sunGeometry, materials[2]);
    sun.rotation.x = halfPI;
    arealoader.addObject(sun);

    scene.background = textures[0]; // Now (draw her) loading the skybox

    // Grass Plane
    let geometry = new PlaneGeometry(1000, 1000);
    materials[0].shininess = 0;
    materials[0].reflectivity = 0;
    let plane = new Mesh( geometry, materials[0] );
    arealoader.addObject( plane );

    // A Brick(TM)
    let wallGeo = new BoxGeometry(5, 5, 5);
    let brickWall = new Mesh( wallGeo, materials[1] );
    brickWall.rotation.x = halfPI;
    brickWall.position.set(-2.5, 14, 2.5);
    arealoader.addObject( brickWall );

    // Camera Setup
    camera.position.z = 6;
    camera.rotation.x = halfPI;

    // Animation Loop Filler
    animate = function() {
      requestAnimationFrame( animate );
      controls.doObjectPositionTick(sun, sunPos.x, sunPos.y, sunPos.z); // Sun Texture moves!
      controls.doControlsTick();
      controls.doObjectPositionTick(directionalLight, sunPos.x, sunPos.y, sunPos.z); // Sun Light moves!
	    renderer.render( scene, camera ); 
      // Rendering so we can see things.
    }

    // Cleanup (Assets that are only used once)
    wallGeo, brickWall, geometry, plane, sunGeometry = null;

    // Finish Up
    animate(); // Looped and Ready
  }

  destroyWorld() {
    animate = function() { } // Reset. (Can't null or else it would call an error.)
  } // Part of Scene Changing Process
}

// Exports
export { BaseWorld }