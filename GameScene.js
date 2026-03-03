// GameScene.js
import { updatePhysics, checkCollision } from './physics.js';
import { updateHUD, displayWinMessage, displayLoseMessage } from './hud.js';
import levelData from './levelData.js';
import { DRAGON_HEALTH, WIN_SCORE, LOSE_SCORE } from './constants.js';

class GameScene {
    constructor() {
        this.dragons = [];
        this.projectiles = [];
        this.score = 0;
        this.isGameOver = false;
        this.initializeDragons();
        this.startGameLoop();
    }

    initializeDragons() {
        for (let i = 0; i < levelData.initialDragonCount; i++) {
            this.dragons.push({
                health: DRAGON_HEALTH,
                position: { x: Math.random() * 800, y: Math.random() * 600 },
                // You can add more dragon properties here if needed
            });
        }
    }

    startGameLoop() {
        const gameLoop = () => {
            if (this.isGameOver) return;
            this.update();
            this.renderHUD();
            requestAnimationFrame(gameLoop);
        };
        gameLoop();
    }

    update() {
        this.updateProjectiles();
        this.checkCollisions();
        this.checkWinLoseConditions();
    }

    updateProjectiles() {
        updatePhysics(this.projectiles);
        // Clean up projectiles that are off-screen or no longer needed
        this.projectiles = this.projectiles.filter(p => p.position.y > 0);
    }

    checkCollisions() {
        this.projectiles.forEach((projectile) => {
            this.dragons.forEach((dragon) => {
                if (checkCollision(projectile, dragon)) {
                    dragon.health -= projectile.damage; // Assume projectiles have damage property
                    if (dragon.health <= 0) {
                        this.score += WIN_SCORE;
                        this.dragons.splice(this.dragons.indexOf(dragon), 1); // Remove defeated dragon
                    }
                }
            });
        });
    }

    checkWinLoseConditions() {
        if (this.dragons.length === 0) {
            this.isGameOver = true;
            displayWinMessage(this.score);
        } else if (this.score < LOSE_SCORE) {
            this.isGameOver = true;
            displayLoseMessage(this.score);
        }
    }

    renderHUD() {
        updateHUD(this.score, this.dragons.length);
    }

    shootProjectile(position) {
        const projectile = {
            position: position,
            damage: 1, // Example damage, can be adjusted
            move: () => {
                this.position.y -= 5; // Example projectile speed
            },
        };
        this.projectiles.push(projectile);
    }
}

export default GameScene;
