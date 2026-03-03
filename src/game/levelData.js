const LEVELS = [
    {
        level: 1,
        difficulty: 'easy',
        enemies: ['goblin'],
        layout: [[0, 1, 0], [0, 0, 0], [1, 0, 0]],
        rewards: { coins: 10, items: ['healing potion'] }
    },
    {
        level: 2,
        difficulty: 'easy',
        enemies: ['goblin', 'wolf'],
        layout: [[1, 0, 1], [0, 1, 0], [0, 0, 1]],
        rewards: { coins: 20, items: ['sword'] }
    },
    {
        level: 3,
        difficulty: 'medium',
        enemies: ['wolf', 'troll'],
        layout: [[0, 1, 1], [1, 0, 0], [0, 1, 1]],
        rewards: { coins: 30, items: ['shield'] }
    },
    {
        level: 4,
        difficulty: 'medium',
        enemies: ['troll', 'goblin'],
        layout: [[1, 0, 1], [0, 0, 0], [1, 1, 0]],
        rewards: { coins: 40, items: ['armor'] }
    },
    {
        level: 5,
        difficulty: 'medium',
        enemies: ['goblin', 'dragon'],
        layout: [[0, 1, 0], [1, 0, 1], [0, 1, 0]],
        rewards: { coins: 50, items: ['magic potion'] }
    },
    {
        level: 6,
        difficulty: 'hard',
        enemies: ['dragon', 'wolf'],
        layout: [[1, 1, 0], [0, 1, 1], [1, 0, 0]],
        rewards: { coins: 60, items: ['legendary sword'] }
    },
    {
        level: 7,
        difficulty: 'hard',
        enemies: ['troll', 'dragon'],
        layout: [[1, 0, 1], [1, 1, 0], [0, 1, 1]],
        rewards: { coins: 70, items: ['potion of invisibility'] }
    },
    {
        level: 8,
        difficulty: 'hard',
        enemies: ['goblin', 'wolf', 'troll'],
        layout: [[0, 0, 1], [1, 1, 1], [0, 1, 0]],
        rewards: { coins: 80, items: ['golden armor'] }
    },
    {
        level: 9,
        difficulty: 'very hard',
        enemies: ['dragon', 'troll', 'wolf'],
        layout: [[1, 1, 1], [0, 1, 0], [1, 1, 1]],
        rewards: { coins: 90, items: ['ultimate weapon'] }
    },
    {
        level: 10,
        difficulty: 'very hard',
        enemies: ['goblin', 'dragon', 'troll'],
        layout: [[0, 1, 0], [1, 0, 1], [1, 1, 0]],
        rewards: { coins: 100, items: ['treasure chest'] }
    }
];

export default LEVELS;