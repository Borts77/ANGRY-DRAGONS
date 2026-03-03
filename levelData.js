export const LEVELS = [
  {
    level: 1,
    dragons: [
      { type: 'green', position: { x: 0, y: 0 }, hp: 50, speed: 1, ammo: 5 },
      { type: 'red', position: { x: 100, y: 0 }, hp: 60, speed: 1.2, ammo: 4 }
    ],
    description: 'Beginner level with basic dragons',
  },
  {
    level: 2,
    dragons: [
      { type: 'green', position: { x: 0, y: 0 }, hp: 60, speed: 1, ammo: 6 },
      { type: 'red', position: { x: 100, y: 0 }, hp: 70, speed: 1.3, ammo: 5 },
      { type: 'blue', position: { x: 200, y: 0 }, hp: 50, speed: 1.1, ammo: 3 }
    ],
    description: 'A mix of green and red dragons with minor difficulty increase',
  },
  {
    level: 3,
    dragons: [
      { type: 'green', position: { x: 0, y: 0 }, hp: 70, speed: 1.1, ammo: 7 },
      { type: 'red', position: { x: 100, y: 0 }, hp: 80, speed: 1.4, ammo: 6 },
      { type: 'blue', position: { x: 200, y: 0 }, hp: 60, speed: 1.2, ammo: 4 },
      { type: 'black', position: { x: 300, y: 0 }, hp: 90, speed: 1.5, ammo: 3 }
    ],
    description: 'Introduction of black dragons, increasing challenge',
  },
  {
    level: 4,
    dragons: [
      { type: 'green', position: { x: 0, y: 0 }, hp: 80, speed: 1.2, ammo: 8 },
      { type: 'red', position: { x: 100, y: 0 }, hp: 90, speed: 1.5, ammo: 7 },
      { type: 'blue', position: { x: 200, y: 0 }, hp: 70, speed: 1.3, ammo: 5 },
      { type: 'black', position: { x: 300, y: 0 }, hp: 100, speed: 1.6, ammo: 4 },
      { type: 'purple', position: { x: 400, y: 0 }, hp: 80, speed: 1.4, ammo: 3 }
    ],
    description: 'Challenges with multiple dragon types and higher HP',
  },
  {
    level: 5,
    dragons: [
      { type: 'green', position: { x: 0, y: 0 }, hp: 90, speed: 1.3, ammo: 9 },
      { type: 'red', position: { x: 100, y: 0 }, hp: 100, speed: 1.6, ammo: 8 },
      { type: 'blue', position: { x: 200, y: 0 }, hp: 80, speed: 1.4, ammo: 6 },
      { type: 'black', position: { x: 300, y: 0 }, hp: 110, speed: 1.7, ammo: 5 },
      { type: 'purple', position: { x: 400, y: 0 }, hp: 90, speed: 1.5, ammo: 4 },
      { type: 'gold', position: { x: 500, y: 0 }, hp: 120, speed: 1.8, ammo: 3 }
    ],
    description: 'Level 5 introduces gold dragons and significant increases in difficulty',
  },
  {
    level: 6,
    dragons: [
      { type: 'green', position: { x: 0, y: 0 }, hp: 100, speed: 1.4, ammo: 10 },
      { type: 'red', position: { x: 100, y: 0 }, hp: 110, speed: 1.7, ammo: 9 },
      { type: 'blue', position: { x: 200, y: 0 }, hp: 90, speed: 1.5, ammo: 7 },
      { type: 'black', position: { x: 300, y: 0 }, hp: 120, speed: 1.8, ammo: 5 },
      { type: 'purple', position: { x: 400, y: 0 }, hp: 100, speed: 1.6, ammo: 4 },
      { type: 'gold', position: { x: 500, y: 0 }, hp: 130, speed: 1.9, ammo: 3 },
      { type: 'orange', position: { x: 600, y: 0 }, hp: 110, speed: 1.7, ammo: 2 }
    ],
    description: 'Mixed levels of dragons with higher speed and ammo usage',
  },
  {
    level: 7,
    dragons: [
      { type: 'green', position: { x: 0, y: 0 }, hp: 110, speed: 1.5, ammo: 11 },
      { type: 'red', position: { x: 100, y: 0 }, hp: 120, speed: 1.8, ammo: 10 },
      { type: 'blue', position: { x: 200, y: 0 }, hp: 100, speed: 1.6, ammo: 8 },
      { type: 'black', position: { x: 300, y: 0 }, hp: 130, speed: 1.9, ammo: 6 },
      { type: 'purple', position: { x: 400, y: 0 }, hp: 110, speed: 1.8, ammo: 5 },
      { type: 'gold', position: { x: 500, y: 0 }, hp: 140, speed: 2, ammo: 4 },
      { type: 'orange', position: { x: 600, y: 0 }, hp: 120, speed: 1.8, ammo: 3 },
      { type: 'white', position: { x: 700, y: 0 }, hp: 130, speed: 1.9, ammo: 2 }
    ],
    description: 'A diverse mix of dragons requiring strategy to defeat',
  },
  {
    level: 8,
    dragons: [
      { type: 'green', position: { x: 0, y: 0 }, hp: 120, speed: 1.6, ammo: 12 },
      { type: 'red', position: { x: 100, y: 0 }, hp: 130, speed: 1.9, ammo: 11 },
      { type: 'blue', position: { x: 200, y: 0 }, hp: 110, speed: 1.7, ammo: 9 },
      { type: 'black', position: { x: 300, y: 0 }, hp: 140, speed: 2, ammo: 7 },
      { type: 'purple', position: { x: 400, y: 0 }, hp: 120, speed: 1.9, ammo: 6 },
      { type: 'gold', position: { x: 500, y: 0 }, hp: 150, speed: 2.2, ammo: 5 },
      { type: 'orange', position: { x: 600, y: 0 }, hp: 130, speed: 2, ammo: 4 },
      { type: 'white', position: { x: 700, y: 0 }, hp: 140, speed: 2.1, ammo: 3 },
      { type: 'silver', position: { x: 800, y: 0 }, hp: 110, speed: 1.8, ammo: 2 }
    ],
    description: 'High-stakes encounter with increased difficulty in dragon types and stats',
  },
  {
    level: 9,
    dragons: [
      { type: 'green', position: { x: 0, y: 0 }, hp: 130, speed: 1.7, ammo: 13 },
      { type: 'red', position: { x: 100, y: 0 }, hp: 140, speed: 2.1, ammo: 12 },
      { type: 'blue', position: { x: 200, y: 0 }, hp: 120, speed: 1.9, ammo: 10 },
      { type: 'black', position: { x: 300, y: 0 }, hp: 150, speed: 2.3, ammo: 8 },
      { type: 'purple', position: { x: 400, y: 0 }, hp: 130, speed: 2.1, ammo: 7 },
      { type: 'gold', position: { x: 500, y: 0 }, hp: 160, speed: 2.5, ammo: 6 },
      { type: 'orange', position: { x: 600, y: 0 }, hp: 140, speed: 2.3, ammo: 5 },
      { type: 'white', position: { x: 700, y: 0 }, hp: 150, speed: 2.4, ammo: 4 },
      { type: 'silver', position: { x: 800, y: 0 }, hp: 130, speed: 2.2, ammo: 3 }
    ],
    description: 'Near-max level with extreme challenge in diversity and strengths',
  },
  {
    level: 10,
    dragons: [
      { type: 'green', position: { x: 0, y: 0 }, hp: 140, speed: 1.8, ammo: 14 },
      { type: 'red', position: { x: 100, y: 0 }, hp: 150, speed: 2.2, ammo: 13 },
      { type: 'blue', position: { x: 200, y: 0 }, hp: 130, speed: 2.1, ammo: 11 },
      { type: 'black', position: { x: 300, y: 0 }, hp: 160, speed: 2.5, ammo: 9 },
      { type: 'purple', position: { x: 400, y: 0 }, hp: 140, speed: 2.3, ammo: 8 },
      { type: 'gold', position: { x: 500, y: 0 }, hp: 170, speed: 2.7, ammo: 7 },
      { type: 'orange', position: { x: 600, y: 0 }, hp: 150, speed: 2.5, ammo: 6 },
      { type: 'white', position: { x: 700, y: 0 }, hp: 160, speed: 2.6, ammo: 5 },
      { type: 'silver', position: { x: 800, y: 0 }, hp: 140, speed: 2.4, ammo: 4 },
      { type: 'void', position: { x: 900, y: 0 }, hp: 200, speed: 3, ammo: 2 }
    ],
    description: 'Ultimate level with maximum challenges and diversity in dragon types',
  },
];