// A Very Basic Object to act as a optional middle man (WIP)
// Shared
let sCamera, sScene, sRenderer, sLoader, sControls

// Class
class NeonShared {
  constructor(camera, scene, renderer, arealoader, controls) {
    sCamera = camera;
    sScene = scene;
    sRenderer = renderer;
    sLoader = arealoader;
    sControls = controls;
  }
}

// Exports
export { NeonShared as Neon, sCamera, sScene, sRenderer, sLoader, sControls }