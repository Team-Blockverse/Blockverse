// Class
class AreaLoader {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.objects = []; // Objects added by our methods
  }

  addObject(object) {
    this.objects.push(object);
    this.scene.add(this.objects[this.objects.length - 1]);
  } // Adds Object to Scene + Loaded Objects

  destroyScene() {
    const ln = this.objects.length;
    for (let i = 0; i < ln; i++) {
      this.scene.remove(this.objects[i]); // This works
      this.objects[i] = null;
    }
    
    // Clear Important Things used by Renderer
    this.scene.fog = undefined;
    this.scene.background = undefined;
  } // Delete Scene (Fix Later)
} // Dynamic Areas, here we come!

// Exports
export { AreaLoader }