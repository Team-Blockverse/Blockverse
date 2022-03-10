// This tool returns a simple skybox texture to load for the game

const skyboxGradient = [[31, 187, 205], [41, 207, 225], [31, 187, 205]];
const s = skyboxGradient;
let ctx; // Context is shared!

export function createSkybox(canvas) {
  ctx = canvas.getContext("2d");
  
  // Our Gradient
  let grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grd.addColorStop(0.2, `rgb(${s[0][0]}, ${s[0][1]}, ${s[0][2]}`);
  grd.addColorStop(0.5, `rgb(${s[1][0]}, ${s[1][1]}, ${s[1][2]}`);
  grd.addColorStop(0.8, `rgb(${s[2][0]}, ${s[2][1]}, ${s[2][2]}`);
  
  // Apply Gradient
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height); 

  return canvas.toDataURL('image/jpeg', 1.0);
}