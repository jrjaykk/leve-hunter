const levels = [

    {
        id: 1,
        name: "The Beginning",

        playerStart: {
            x: 80,
            y: 400
        },

        platforms: [
            {
                x: 0,
                y: 490,
                width: 300,
                height: 50
            },

            {
                x: 350,
                y: 420,
                width: 150,
                height: 20
            },

            {
                x: 550,
                y: 350,
                width: 150,
                height: 20
            },

            {
                x: 750,
                y: 280,
                width: 120,
                height: 20
            },

            {
                x: 700,
                y: 490,
                width: 260,
                height: 50
            }
        ],

        finish: {
    x: 850,
    y: 350,
    width: 50,
    height: 140
},

traps: [
    {
        type: "fallingFloor",

        x: 300,
        y: 490,

        width: 50,
        height: 50,

        triggered: false
    }
]
        ];
