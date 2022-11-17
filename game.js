var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Game variables
//var current_time = this.time.time;
//var latest_spawn = current_time;

// Initialise
var player;
var platforms;
var notes;

// Create game object
var game = new Phaser.Game(config);

function preload () {
    this.load.image('clouds', './images/clouds.png');
    this.load.image('wallLong', './images/wall-long.png');
    this.load.image('note', './images/note.png');
    this.load.spritesheet('player', './images/player.png', { frameWidth:64, frameHeight:64});
}

function create () {
    // Sky and platforms
    this.add.image(400,300, 'clouds');
    
    // Create group and add items to it
    platforms = this.physics.add.staticGroup();
    platforms.create(0,450, 'wallLong');
    platforms.create(400,600, 'wallLong');
    platforms.create(800,200, 'wallLong');
    
    // Player
    player = this.physics.add.sprite(600,450, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
    // Player animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 1 } ],
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 2, end: 2 }),
        frameRate: 10,
        repeat: -1
    });

    // Player Controls
    cursors = this.input.keyboard.createCursorKeys();

    // Notes group
    notes = this.physics.add.group();
    notes.create(600, 0, 'note');

    // Colliders
    this.physics.add.collider(player, platforms);
    this.physics.add.overlap(player, notes, noteHit, null, this); // Player and note can collide

}

function update () {
    // Control speeds
    if (cursors.left.isDown)  {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)  {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }  else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}


function noteHit (player, note)
{
    note.disableBody(true, true);
}


