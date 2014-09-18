var MakoMermaidsGame = MakoMermaidsGame || {};

var width = window.innerWidth;
var height = window.innerHeight; 
    
if(height > 576) 
    {
    height = 576; 
    } 

MakoMermaidsGame.game = new Phaser.Game(width, height, Phaser.AUTO, 'game');  

MakoMermaidsGame.game.state.add('Boot', MakoMermaidsGame.Boot);
MakoMermaidsGame.game.state.add('Preloader', MakoMermaidsGame.Preloader);
MakoMermaidsGame.game.state.add('Game', MakoMermaidsGame.Game);
MakoMermaidsGame.game.state.add('MainMenu', MakoMermaidsGame.MainMenu);

MakoMermaidsGame.game.state.start('Boot');