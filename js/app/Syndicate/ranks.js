define(function () {
    return [
        {
            level: 0,
            name: 'Private'
        },
        {
            level: 15,
            name: 'Lieutenant',
            bonuses: {
                'nightvision': 4,
                'param-sharpshooting': 2,
                'param-endurance': 2,
                'bonus-sapper': 1
            }
        },
        {
            level: 18,
            name: 'Captain',
            bonuses: {
                'nightvision': 4,
                'camouflage': 6,
                'param-sharpshooting': 4,
                'hp': 12,
                'bonus-sapper': 2,
                'bonus-stability': 1
            }
        },
        {
            level: 24,
            name: 'Major',
            bonuses: {
                'nightvision': 8,
                'camouflage': 6,
                'param-sharpshooting': 4,
                'param-endurance': 4,
                'hp': 12,
                'bonus-sapper': 3,
                'bonus-exp': 1
            }
        },
        {
            level: 30,
            name: 'Colonel',
            bonuses: {
                'nightvision': 9,
                'camouflage': 9,
                'param-sharpshooting': 6,
                'param-endurance': 6,
                'hp': 24,
                'bonus-sapper': 4,
                'bonus-secondStep': 1
            }
        },
        {
            level: 34,
            name: 'Brigadier',
            bonuses: {
                'nightvision': 10,
                'camouflage': 9,
                'param-sharpshooting': 6,
                'param-endurance': 6,
                'hp': 24,
                'bonus-sapper': 5,
                'bonus-secondStep': 1,
                'bonus-rage': 1,
                'bonus-dieHard': 1
            }
        },
        {
            level: 37,
            name: 'Major General',
            bonuses: {
                'nightvision': 11,
                'camouflage': 11,
                'param-sharpshooting': 7,
                'param-endurance': 7,
                'hp': 42,
                'bonus-sapper': 5,
                'bonus-secondStep': 2,
                'bonus-rage': 2,
                'bonus-dieHard': 1,
                'bonus-sniper': 1,
                'bonus-mcCloud': 1
            }
        },
        {
            level: 40,
            name: 'Lieutenant General',
            bonuses: {
                'nightvision': 11,
                'camouflage': 12,
                'param-sharpshooting': 8,
                'param-endurance': 7,
                'hp': 48,
                'bonus-sapper': 5,
                'bonus-secondStep': 1,
                'bonus-rage': 2,
                'bonus-dieHard': 2,
                'bonus-sniper': 2,
                'bonus-mcCloud': 1
            }
        },
        {
            level: 42,
            name: 'Colonel General',
            bonuses: {
                'nightvision': 12,
                'camouflage': 13,
                'param-sharpshooting': 9,
                'param-endurance': 8,
                'hp': 48,
                'bonus-sapper': 5,
                'bonus-secondStep': 1,
                'bonus-rage': 2,
                'bonus-dieHard': 3,
                'bonus-sniper': 3,
                'bonus-mcCloud': 1
            }
        },
        {
            level: 45,
            name: 'Syndicate General',
            bonuses: {
                'nightvision': 14,
                'camouflage': 14,
                'param-sharpshooting': 10,
                'param-endurance': 10,
                'hp': 60,
                'bonus-sapper': 5,
                'bonus-secondStep': 2,
                'bonus-rage': 2,
                'bonus-dieHard': 4,
                'bonus-sniper': 4
            }
        }
    ];
});