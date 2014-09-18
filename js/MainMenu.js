MakoMermaidsGame.MainMenu = function(game) {
    this.startBG;
    this.startPrompt;
}

MakoMermaidsGame.MainMenu.prototype = {
	
	create: function () {
       
        
		startBG = this.add.image(0, 0, 'tiles2');
		startBG.inputEnabled = true;
		startBG.events.onInputDown.addOnce(this.startGame, this);
		
		startPrompt = this.add.bitmapText(this.world.centerX, this.world.centerY, 'eightbitwonder', 'Touch Start!', 24);
	},

	startGame: function (pointer) {
        
		this.state.start('Game');
	}
};