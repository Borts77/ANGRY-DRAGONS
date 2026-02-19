const levelData = [
    {
        name: 'Beginner Level',
        castleHP: 100,
        ammo: [
            { id: 'arrow', count: 20, mass: 1, scale: 1 },
            { id: 'fireball', count: 5, mass: 3, scale: 1.5 }
        ],
        dragons: [
            { type: 'Dragon1', hp: 50, speed: 1, x: 100, y: 200, scale: 1, isBoss: false }
        ]
    },
    {
        name: 'Intermediate Level',
        castleHP: 150,
        ammo: [
            { id: 'arrow', count: 25, mass: 1, scale: 1 },
            { id: 'fireball', count: 8, mass: 3, scale: 1.5 }
        ],
        dragons: [
            { type: 'Dragon1', hp: 70, speed: 1.2, x: 150, y: 250, scale: 1, isBoss: false },
            { type: 'Dragon2', hp: 80, speed: 1.1, x: 300, y: 200, scale: 1.2, isBoss: false }
        ]
    },
    {
        name: 'Advanced Level',
        castleHP: 200,
        ammo: [
            { id: 'arrow', count: 30, mass: 1, scale: 1 },
            { id: 'fireball', count: 10, mass: 3, scale: 1.5 }
        ],
        dragons: [
            { type: 'Dragon2', hp: 100, speed: 1.3, x: 200, y: 300, scale: 1.2, isBoss: false },
            { type: 'Dragon3', hp: 150, speed: 1.5, x: 400, y: 250, scale: 1.3, isBoss: false }
        ]
    },
    {
        name: 'Challenging Level',
        castleHP: 250,
        ammo: [
            { id: 'arrow', count: 35, mass: 1, scale: 1 },
            { id: 'fireball', count: 12, mass: 3, scale: 1.5 }
        ],
        dragons: [
            { type: 'Dragon2', hp: 120, speed: 1.4, x: 300, y: 350, scale: 1.2, isBoss: false },
            { type: 'Dragon3', hp: 180, speed: 1.6, x: 500, y: 300, scale: 1.3, isBoss: false },
            { type: 'BossDragon', hp: 300, speed: 1.0, x: 700, y: 400, scale: 1.5, isBoss: true }
        ]
    },
    {
        name: 'Expert Level',
        castleHP: 300,
        ammo: [
            { id: 'arrow', count: 40, mass: 1, scale: 1 },
            { id: 'fireball', count: 15, mass: 3, scale: 1.5 }
        ],
        dragons: [
            { type: 'Dragon3', hp: 200, speed: 1.5, x: 400, y: 400, scale: 1.3, isBoss: false },
            { type: 'BossDragon', hp: 350, speed: 1.0, x: 800, y: 450, scale: 1.5, isBoss: true }
        ]
    },
    {
        name: 'Master Level',
        castleHP: 350,
        ammo: [
            { id: 'arrow', count: 50, mass: 1, scale: 1 },
            { id: 'fireball', count: 20, mass: 3, scale: 1.5 }
        ],
        dragons: [
            { type: 'Dragon3', hp: 250, speed: 1.6, x: 500, y: 500, scale: 1.4, isBoss: false },
            { type: 'BossDragon', hp: 400, speed: 1.0, x: 900, y: 500, scale: 1.6, isBoss: true }
        ]
    },
    {
        name: 'Legendary Level',
        castleHP: 400,
        ammo: [
            { id: 'arrow', count: 60, mass: 1, scale: 1 },
            { id: 'fireball', count: 25, mass: 3, scale: 1.5 }
        ],
        dragons: [
            { type: 'Dragon3', hp: 300, speed: 1.7, x: 600, y: 600, scale: 1.5, isBoss: false },
            { type: 'BossDragon', hp: 450, speed: 1.0, x: 1000, y: 550, scale: 1.7, isBoss: true }
        ]
    },
    {
        name: 'Ultimate Level',
        castleHP: 500,
        ammo: [
            { id: 'arrow', count: 70, mass: 1, scale: 1 },
            { id: 'fireball', count: 30, mass: 3, scale: 1.5 }
        ],
        dragons: [
            { type: 'BossDragon', hp: 500, speed: 1.0, x: 1200, y: 600, scale: 1.8, isBoss: true }
        ]
    }
];

export default levelData;