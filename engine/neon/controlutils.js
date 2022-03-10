// Internal Imports
import { Vector3 } from '../three/three.module.js'

// Internal Things
const prejoin = document.getElementById( 'loadcontrols' );
const position = new Vector3(0, 0, 6); // Player Position
const lerpSmoothing = 0.15; // Smoothing amount used in lerp functions
let gcamera; // Camera
let left, right, front, backward = false; // Base 4 Directions
let running = false; // Running Away!
let currSpeed; // Current Speed Being Used

// Classes
class Controls {
  constructor(camera) {
    gcamera = camera; // Save it!
    
    prejoin.onclick = function() {
      prejoin.style.display = 'none';
    } // Poiner Lock

    // Events for Keyboard
    document.addEventListener('keydown', Controls.#onKeyDown);
    document.addEventListener('keyup', Controls.#onKeyUp);
  }

  doControlsTick() {
    if(running) {
      currSpeed = 0.2;
    } else {
      currSpeed = 0.1;
    } // Initial Speed Check
    
    if (front) {
      position.y += currSpeed;
    }

    if (backward) {
      position.y -= currSpeed;
    }

    if (left) {
      position.x -= currSpeed;
    }   

    if (right) {
      position.x += currSpeed;
    }  

    gcamera.position.lerp(position, lerpSmoothing); // Seal the deal!
  } // Controls Tick (To-Do: Use timing to make sure speed is consistant across devices)

  doObjectPositionTick(object, ox, oy, oz) {
    object.position.set(ox + position.x, oy + position.y, oz + position.z); // We don't save variables lol
  } // Makes an objects position lerp with the camera (To-Do: Find the sun)
  
  // Internal Key Managers
  static #onKeyDown(evt) {
    evt = evt || window.event;
    let charCode = evt.keyCode || evt.which;
    if (evt.shiftKey) {
      running = true;
    } else {
      let key = String.fromCharCode(charCode);
      switch(key) {
        case "W":
          front = true;
          break;        
        
        case "A":
          left = true;
          break;

        case "S":
          backward = true;
          break;
          
        case "D":
          right = true;
          break;  
      
        /*default:
          console.log(key); // Debug Tool
          break;*/
      }
    }   
  } // Key Down

  static #onKeyUp(evt) {
    evt = evt || window.event;
    let charCode = evt.keyCode || evt.which;
    if (evt.shiftKey) {
      running = false; // To-Do: Fix Running
    } else {
      let key = String.fromCharCode(charCode);
      switch(key) {
        case "W":
          front = false;
          break;        
        
        case "A":
          left = false;
          break;

        case "S":
          backward = false;
          break;
          
        case "D":
          right = false;
          break;  
      }
    }   
  }
}

// Exports
export { Controls }