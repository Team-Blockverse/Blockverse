// Default Settings
let defaultMaterial = 'standard';
let antialiasing = true; // Helpful to not do post processing with internal Anti-Aliasing (Or so the ThreeJS Manual/Docs say)
let upscaleAmount = 2; // Max is 2

// Settings Tool to Bypass Module Issues
function changeSetting(setting, mode) {
  switch(setting) {
    case "defaultMaterial":
      defaultMaterial = mode;
      break;

    case "antialiasing":
      antialiasing = mode;
      break;

    case "upscaleResolution":
      upscaleAmount = mode;
      break;
      
    default:
      console.error('Setting Not Specified! (@changeSetting)')
  }
}

// Export Settings & Tool
export { defaultMaterial, antialiasing, upscaleAmount }