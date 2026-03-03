// GameScene.js

class GameScene {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.dragons = [];
        this.projectiles = [];
        this.score = 0;
        this.isGameOver = false;
        this.winCondition = 10; // Number of dragons to defeat to win
        this.initialize();
    }

    initialize() {
        // Initialize the game objects
        this.spawnDragons(5); // Start with 5 dragons
        this.startGameLoop();
    }

    spawnDragons(num) {
        for (let i = 0; i < num; i++) {
            this.dragons.push(new Dragon(Math.random() * this.canvas.width, Math.random() * this.canvas.height));
        }
    }

    startGameLoop() {
        const loop = () => {
            if (!this.isGameOver) {
                this.update();
                this.draw();
                requestAnimationFrame(loop);
            }
        };
        requestAnimationFrame(loop);
    }

    update() {
        this.updateProjectiles();
        this.checkCollisions();
        this.checkWinCondition();
    }

    updateProjectiles() {
        for (let projectile of this.projectiles) {
            projectile.update();
        }
        this.projectiles = this.projectiles.filter(projectile => !projectile.isOutOfBounds());
    }

    checkCollisions() {
        for (let dragon of this.dragons) {
            for (let projectile of this.projectiles) {
                if (this.detectCollision(dragon, projectile)) {
                    this.score++;
                    dragon.markForRemoval();
                    projectile.markForRemoval();
                }
            }
        }
        this.dragons = this.dragons.filter(dragon => !dragon.isMarkedForRemoval());
    }

    detectCollision(dragon, projectile) {
        // Simple bounding box collision detection
        return (
            projectile.x < dragon.x + dragon.width &&
            projectile.x + projectile.width > dragon.x &&
            projectile.y < dragon.y + dragon.height &&
            projectile.y + projectile.height > dragon.y
        );
    }

    checkWinCondition() {
        if (this.score >= this.winCondition) {
            this.isGameOver = true;
            alert("You Win! Score: " + this.score);
        }
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let dragon of this.dragons) {
            dragon.draw(this.context);
        }
        for (let projectile of this.projectiles) {
            projectile.draw(this.context);
        }
        this.context.font = "20px Arial";
        this.context.fillText("Score: " + this.score, 10, 20);
    }

    fireProjectile(x, y) {
        if (!this.isGameOver) {
            this.projectiles.push(new Projectile(x, y));
        }
    }
}

// Example Dragon Class
class Dragon {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.markedForRemoval = false;
    }

    draw(context) {
        context.fillStyle = 'green';
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    markForRemoval() {
        this.markedForRemoval = true;
    }

    isMarkedForRemoval() {
        return this.markedForRemoval;
    }
}

// Example Projectile Class
class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 5;
        this.speed = 5;
    }

    update() {
        this.y -= this.speed; // Move upwards
    }

    draw(context) {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    isOutOfBounds() {
        return this.y < 0;
    }

    markForRemoval() {
        // Mark for removal logic
    }
}

// Usage
const gameScene = new GameScene("gameCanvas");
document.getElementById("fireButton").addEventListener("click", () => {
    const x = Math.random() * gameScene.canvas.width; // example: get the target position
    const y = gameScene.canvas.height; // Starting position for the projectile
    gameScene.fireProjectile(x, y);
});