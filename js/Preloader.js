MakoMermaidsGame.Preloader = function(game) {
    this.preloadBar = null;
    this.ready = false;
};

MakoMermaidsGame.Preloader.prototype = {
	
	preload: function () {
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preloadBar);
        
        this.load.spritesheet('ariel', 'assets/ariel2.png', 32, 48, 16);
        this.load.tilemap('map', 'assets/tilemaps/maps/tile_collision_test.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
        this.load.image('walls_1x2', 'assets/tilemaps/tiles/walls_1x2.png');
        this.load.image('tiles2', 'assets/tilemaps/tiles/tiles2.png');
        this.load.spritesheet('coin', 'assets/tilemaps/sprites/coin.png',32,32,6);
        this.load.audio('sfx', 'assets/audio/SoundEffects/fx_mixdown.ogg');
        this.load.bitmapFont('eightbitwonder', 'assets/fonts/eightbitwonder.png', 'assets/fonts/eightbitwonder.fnt');		
	},

	create: function () {
		this.preloadBar.cropEnabled = false;
	},

	update: function () {
        if(this.cache.isSoundDecoded('sfx') && this.ready == false) {
            this.ready = true;
            this.state.start('Game');
        }
	}
};