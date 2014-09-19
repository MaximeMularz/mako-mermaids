//var MakoMermaidsGame = MakoMermaidsGame || {};

var MakoMermaidsGame = {

  /* Your game can check BasicGame.orientated in internal loops to know if it should pause or not */
    orientated: false

};

MakoMermaidsGame.Boot = function(game) {};

MakoMermaidsGame.Boot.prototype = {
    preload: function() {
        this.load.image('preloaderBar', 'assets/loader_bar.png');
    },
    
    create: function() {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setScreenSize(true);
            this.scale.refresh();
        }
        else
        {
            // Stretch to fill
    this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
            this.scale.startFullScreen(false);
            this.scale.refresh();
        }
        
        this.state.start('Preloader');
    },
    
    gameResized: function (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
        //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.

    },
    
     enterIncorrectOrientation: function () {

        MakoMermaidsGame.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        MakoMermaidsGame.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    }
}