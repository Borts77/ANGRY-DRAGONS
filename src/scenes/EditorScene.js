'use strict';

import Phaser from 'phaser';

class EditorScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EditorScene' });
    }

    preload() {
        // Load dragon sprite and any other required assets
        this.load.image('dragon', 'path/to/dragon.png'); // Change the path as needed
    }

    create() {
        this.dragons = [];
        
        // Create a graphics object for visual feedback
        this.graphics = this.add.graphics();
        
        // Input handling
        this.input.on('pointerdown', this.placeDragon, this);

        // Create a simple UI for dragon properties
        this.hpInput = this.add.inputField(50, 50, {
            placeholder: 'HP',
            width: 100,
            height: 30,
            fontSize: '18px',
        });

        this.speedInput = this.add.inputField(50, 100, {
            placeholder: 'Speed',
            width: 100,
            height: 30,
            fontSize: '18px',
        });

        this.saveButton = this.add.text(50, 150, 'Save Level', { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', this.saveLevel, this);
    }

    placeDragon(pointer) {
        const hp = this.hpInput.value || 100; // Default HP
        const speed = this.speedInput.value || 1; // Default Speed
        
        const dragon = this.physics.add.image(pointer.x, pointer.y, 'dragon');
        dragon.hp = hp;
        dragon.speed = speed;

        this.dragons.push(dragon);

        this.graphics.clear();
        this.graphics.fillStyle(0x00ff00, 0.5);
        this.graphics.fillCircle(pointer.x, pointer.y, 40); // Feedback for placement
    }

    saveLevel() {
        const levelData = this.dragons.map(dragon => ({
            x: dragon.x,
            y: dragon.y,
            hp: dragon.hp,
            speed: dragon.speed
        }));

        // Here you would save 'levelData' to your preferred storage solution (e.g., API, local storage).
        console.log('Level saved:', levelData);
        alert('Level saved successfully!');
    }

    update() {
        // Optional: You can implement logic to move or interact with dragons here if needed
    }
}

export default EditorScene;
