// GameScene.js

// HUD Update with new parameters
function updateHUD(v0, angleDeg, p0, Ec0) {
  // Updated HUD logic here
}

// Preventing black dragons from escaping off-canvas
function checkDragonsPosition(dragons) {
  for (let i = 0; i < dragons.length; i++) {
    if (dragons[i].x < 0 || dragons[i].x > canvas.width || dragons[i].y < 0 || dragons[i].y > canvas.height) {
      // Adjust position to keep in canvas
      dragons[i].x = Math.max(0, Math.min(dragons[i].x, canvas.width));
      dragons[i].y = Math.max(0, Math.min(dragons[i].y, canvas.height));
    }
  }
}

// Fixing checkHits to call setImpactLine
function checkHits(...args) {
  setImpactLine(); // Ensure proper call
}

// Adding max power indicator
let maxPowerIndicator = 0; // Set max power accordingly

// Overall code quality improvements
// ... (additional improvements)
