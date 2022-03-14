// The Console for the engine (Drop in replacement for console object)
// ================================================
// Variables
const chatObjects = []; // Only allow max of 5

// Console Class
class Console {  
  // Public Methods
  static log(content) {
    let obj = document.createElement('div');
    obj.classList.add('consolemsg');
    obj.innerHTML = content;
    chatObjects.unshift(obj);
    document.body.appendChild(obj);
    obj = null; // <-- Ensure GC Works
  } // Drop in for console.log

  static warn(content) {
    console.log(content);
  } // Place Holder

  static error(content) {
    console.log(content);
  } // Place Holder
}

// Exports
export { Console }