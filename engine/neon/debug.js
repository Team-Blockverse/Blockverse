// Variables/Constants
const mem = performance.memory; // Dev Helper
const menu = document.getElementById('neondebug');
const menuData = `
<span id='memused'></span>
`; // What to write into menu
let memEnabled; // Yeet

// Debug Class
class Debugger {
  constructor(renderer) {
    this.render = renderer;
    if ( typeof mem !== 'undefined' ) {
      memEnabled = true;
    } else {
      memEnabled = false;
    }

    // Setup Debug Menu
    menu.style.display = 'block';
    menu.innerHTML = menuData;

    // Setup DOM Stuff
    this.memused = document.getElementById('memused');
  } // Setup Debugger

  update() {
    if(memEnabled) {
    this.memused.innerHTML = `Mem Used: ${Math.round(mem.usedJSHeapSize / 1000000)}MB`;
    } else {
      this.memused.innerHTML = `Mem Used: ???MB`;
    }
  } // Update Info on display
}

// Export the Debugger
export { Debugger }