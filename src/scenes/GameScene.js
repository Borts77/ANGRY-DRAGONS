// GameScene.js

class GameScene {
    constructor() {
        this.dragons = [];
        this.projectiles = [];
        this.isGameOver = false;
        this.score = 0;
        this.init();
    }

    init() {
        // Initialize the game scene
        this.createDragons();
        this.startGameLoop();
    }

    createDragons() {
        // Create dragons and add them to the dragons array
        for (let i = 0; i < 5; i++) {
            this.dragons.push(new Dragon(i * 100, 0)); // Spawning dragons at different positions
        }
    }

    startGameLoop() {
        const loop = () => {
            if (!this.isGameOver) {
                this.update();
                this.render();
                requestAnimationFrame(loop);
            }
        };

        requestAnimationFrame(loop);
    }

    update() {
        this.updateDragons();
        this.updateProjectiles();
        this.checkCollisions();
    }

    updateDragons() {
        // Update dragon positions and AI logic
        this.dragons.forEach(dragon => {
            dragon.update();
            // Add AI Logic here
        });
    }

    updateProjectiles() {
        // Update projectile positions
        this.projectiles.forEach((projectile, index) => {
            projectile.update();
            if (projectile.isOutOfBounds()) {
                this.projectiles.splice(index, 1); // Remove off-screen projectiles
            }
        });
    }

    checkCollisions() {
        // Check for collisions between projectiles and dragons
        this.dragons.forEach((dragon, dIndex) => {
            this.projectiles.forEach((projectile, pIndex) => {
                if (this.isCollision(dragon, projectile)) {
                    this.dragons.splice(dIndex, 1); // Remove the dragon
                    this.projectiles.splice(pIndex, 1); // Remove the projectile
                    this.score += 10; // Increase score
                    if (this.dragons.length === 0) {
                        this.win();
                    }
                }
            });
        });
    }

    isCollision(dragon, projectile) {
        // Simple AABB collision detection
        return (dragon.x < projectile.x + projectile.width &&
                dragon.x + dragon.width > projectile.x &&
                dragon.y < projectile.y + projectile.height &&
                dragon.y + dragon.height > projectile.y);
    }

    win() {
        // Handle win condition
        this.isGameOver = true;
        console.log('You win!');
    }

    lose() {
        // Handle lose condition
        this.isGameOver = true;
        console.log('Game Over!');
    }

    render() {
        // Render game elements (dragons, projectiles, etc.)
        // This would include drawing on a canvas or similar
    }

    // Additional methods for handling input, spawning projectiles, etc.
}

class Dragon {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50; // Example width
        this.height = 50; // Example height
    }

    update() {
        // Update dragon's position and behavior
        // AI Logic here
    }
}

class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 5; // Example width
        this.height = 5; // Example height
    }

    update() {
        this.y -= 5; // Move the projectile upwards
    }

    isOutOfBounds() {
        return this.y < 0;
    }
}

// To start the game
const gameScene = new GameScene();